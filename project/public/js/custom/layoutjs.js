const postUl = document.querySelector('#postUl');
const img = document.querySelectorAll('.photoList img');
const photoSlide = document.querySelector('#photoSlide');

//btns
const prevBtn = document.querySelector('#prevBtn');
prevBtn.addEventListener('click',goToPrev);

const nextBtn = document.querySelector('#nextBtn');
nextBtn.addEventListener('click',goToNext);

const imgCloseBtn = document.querySelector('#imgCloseBtn');
imgCloseBtn.addEventListener('mouseover',getCursor);

const okBtn = document.querySelector('#ok');

// modal
const imgModal = document.querySelector('.modal');
const err_modal = document.querySelector('#err_modal');
const err_close = document.querySelector("#err_close");

// params
let photoCnt; //메인 페이지에 로드될 사진개수 최대 5개
let index = 0; //이미지 슬라이드 용도
let currentImgNum; //모달에 로드된 이미지 id값
let dbImg; //db에저장된 이미지 집합
let dbCnt; //db에저장된 이미지 개수

function init(){
    //추후에 삭제 예정
    resetList();
    axios.post('/layout/postListInit').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
            }
        }
    });
    axios.post('/layout/photoListInit').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                showImg(res.data["data"]);
            }
        }
    });
}   

function addList(item = []){
    item.forEach(function (data) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.style.float = 'right';
        span.innerText = '자세히 보기';

        li.innerText = data.TITLE;
        li.appendChild(span);
        postUl.appendChild(li);

        //모달, 페이지 상의 후에 span 태그에 작업 마무리 하기

    });
}
//프론트용 데이터 삭제 용도 함수
function resetList(){
    let resetPostUl = document.querySelector('#postUl');
     //이전 데이터 삭제
     while(resetPostUl.hasChildNodes()){
        resetPostUl.removeChild(resetPostUl.firstChild);
    }
}

//li에 초기 사진 저장
function showImg(item = []){
    photoCnt = item.length;
    for(i=0;i<photoCnt;i++){
        img[i].src = item[i].path + item[i].file_name;
        img[i].addEventListener('mouseover',getCursor);
        img[i].addEventListener('click',getImgModal);
        img[i].setAttribute('imgId',i);
    }
}

function getImgModal(){
    //console.log(this);
    let modalImg = document.querySelector('#modalImg');
    modalImg.src = this.getAttribute('src');
    currentImgNum = Number(this.getAttribute('imgId'));
    modalImg.setAttribute('imgid',currentImgNum);

    axios.post('/layout/getImges').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){
                dbImg = (res.data["data"]);
                dbCnt = dbImg.length;
            }
        }
    });
    imgModal.style.display = 'block';
}

function goToPrev(){
    let modalImg = document.querySelector('#modalImg');
    currentImgNum = Number(modalImg.getAttribute('imgid'));

    if(currentImgNum == 0){
        err_modal.style.display = 'block';
    }
    else{
        modalImg.src = dbImg[currentImgNum - 1].path + dbImg[currentImgNum - 1].file_name;
        modalImg.setAttribute('imgid',currentImgNum - 1);
    }
}

function goToNext(){
    let modalImg = document.querySelector('#modalImg');
    currentImgNum = Number(modalImg.getAttribute('imgid'));
    
    if(currentImgNum == dbCnt - 1){
        err_modal.style.display = 'block';
    }
    else{
        modalImg.src = dbImg[currentImgNum + 1].path + dbImg[currentImgNum + 1].file_name;
        modalImg.setAttribute('imgid',currentImgNum + 1);
    }
}

// 사진 슬라이드
setInterval(() => {
    photoSlide.style.transition = 0.8 + "s";
    photoSlide.style.transform = "translate3d(-" + (420 * (index + 1)) + "px, 0px, 0px)";
    index++;
    if(index==photoCnt-1){
        index = -1;
    }
}, 4000);

// modal 종료 함수
imgCloseBtn.onclick = function(){
    imgModal.style.display = 'none';
}

function getCursor(){
    this.style.cursor = 'pointer';
}

err_close.onclick = function(){
    err_modal.style.display = 'none';
}
okBtn.onclick = function(){
    err_modal.style.display = 'none';
}

init();