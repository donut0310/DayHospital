var postUl = document.querySelector('#postUl');
var mobileUl = document.querySelector('#mobile_post_list');
var img = document.querySelectorAll('.photoList img');
var photoSlide = document.querySelector('#photoSlide');

//btns
var prevBtn = document.querySelector('.prevBtn');
prevBtn.addEventListener('click',goToPrev);

var nextBtn = document.querySelector('.nextBtn');
nextBtn.addEventListener('click',goToNext);

var post_modal_closeBtn = document.querySelector('#post_modal_closeBtn');
post_modal_closeBtn.addEventListener('mouseover',getCursor);

var img_modal_closeBtn = document.querySelector('#img_modal_closeBtn');
img_modal_closeBtn.addEventListener('mouseover',getCursor);

var moreBtn = document.querySelector('.moreBtn');
moreBtn.addEventListener('mouseover',getCursor);

var plusBtn = document.querySelectorAll('.plusBtn');
plusBtn[0].addEventListener('mouseover',getCursor);
plusBtn[1].addEventListener('mouseover',getCursor);

// modal
var imgModal = document.querySelector('#modal-in-photo');
var postModal = document.querySelector('#modal-in-text');
//var centerGuideModal = document.querySelector('#modal4');
var err_modal = document.querySelector('#err_modal');
var err_close = document.querySelector("#err_close");
err_close.addEventListener('mouseover',getCursor);


// params
var photoCnt; //메인 페이지에 로드될 사진개수 최대 5개
var index = 0; //이미지 슬라이드 용도
var currentImgNum; //모달에 로드된 이미지 id값
var dbImg; //db에저장된 이미지 집합
var dbCnt; //db에저장된 이미지 개수

function init(){
    //추후에 삭제 예정
    resetList();
    axios.get('/layout/postListInit').then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
                addListMobile(res.data["data"]);
            }
        }
    });
    axios.get('/layout/photoListInit').then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                showImg(res.data["data"]);
            }
        }
    });
}   

function addList(item = []){
    item = item.slice(0,4);
    item.forEach(function (data) {
        var li = document.createElement('li');
        var span = document.createElement('span');
        var a = document.createElement('a');

        span.style.float = 'right';
        span.addEventListener('mouseover',getCursor);
        
        a.innerText = '자세히 보기';
        
        a.href = 'pmpc_board?' + data.ID;

        span.appendChild(a);
        li.innerText = data.TITLE;
        li.appendChild(span);
        postUl.appendChild(li);

    });
}

function addListMobile(item = []){
    item.forEach(function (data) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = 'pmpc_board?' + data.ID;

        li.innerText = data.TITLE;
        li.appendChild(a);
        mobileUl.appendChild(li);

    });
}
//프론트용 데이터 삭제 용도 함수
function resetList(){
    var resetPostUl = document.querySelector('#postUl');
    var resetMobileUl = document.querySelector('#mobile_post_list');
     //이전 데이터 삭제
     while(resetPostUl.hasChildNodes()){
        resetPostUl.removeChild(resetPostUl.firstChild);
    }
    while(resetMobileUl.hasChildNodes()){
        resetMobileUl.removeChild(resetMobileUl.firstChild);
    }
}

//li에 초기 사진 저장
function showImg(item = []){
    photoCnt = item.length;
    for(i=0;i<photoCnt;i++){
        img[i].src = '../../../assets/uploads/'+ item[i].FILE_NAME.slice(0,32);
        img[i].addEventListener('mouseover',getCursor);
        img[i].addEventListener('click',getImgModal);
        img[i].setAttribute('imgId',i);
        img[i].setAttribute('title',item[i].TITLE);
        img[i].setAttribute('content',item[i].CONTENT);
        var date = date_format(item[i].DATE);
        img[i].setAttribute('date',date);
    }
}

function date_format(data){
    var date;
    date = data.slice(0,10);
    return date;
}

function getImgModal(){
    //console.log(this);
    var modalImg = document.querySelector('#modalImg');
    modalImg.src = this.getAttribute('src');
    currentImgNum = Number(this.getAttribute('imgid'));
    modalImg.setAttribute('imgid',currentImgNum);

    var photo_title = document.querySelector('#modal-in-photo .modal_body h2');
    photo_title.innerText = this.getAttribute('title');
    
    var photo_date = document.querySelector('#modal-in-photo .modal_body h5');
    photo_date.innerText = this.getAttribute('date');
    
    var photo_content = document.querySelector('#modal-in-photo .modalspan');
    photo_content.innerText = this.getAttribute('content');
    
    axios.get('/layout/getImages').then(function (res){
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
    var modalImg = document.querySelector('#modalImg');
    currentImgNum = Number(modalImg.getAttribute('imgid'));


    
    if(currentImgNum == 0){
        err_modal.style.display = 'block';
    }
    else{
        var photo_title = document.querySelector('#modal-in-photo .modal_body h2');
        photo_title.innerText = dbImg[currentImgNum - 1].TITLE;
        
        var photo_date = document.querySelector('#modal-in-photo .modal_body h5');
        photo_date.innerText = date_format(dbImg[currentImgNum - 1].DATE);
        
        var photo_content = document.querySelector('#modal-in-photo .modalspan');
        photo_content.innerText = dbImg[currentImgNum - 1].CONTENT;
        
        modalImg.src = dbImg[currentImgNum - 1].PATH + dbImg[currentImgNum - 1].FILE_NAME;

        modalImg.setAttribute('imgid',currentImgNum - 1);
    }
}

function goToNext(){
    var modalImg = document.querySelector('#modalImg');
    currentImgNum = Number(modalImg.getAttribute('imgid'));
    
    if(currentImgNum == dbCnt - 1){
        err_modal.style.display = 'block';
    }
    else{
        var photo_title = document.querySelector('#modal-in-photo .modal_body h2');
        photo_title.innerText = dbImg[currentImgNum + 1].TITLE;
        
        var photo_date = document.querySelector('#modal-in-photo .modal_body h5');
        photo_date.innerText = date_format(dbImg[currentImgNum + 1].DATE);
        
        var photo_content = document.querySelector('#modal-in-photo .modalspan');
        photo_content.innerText = dbImg[currentImgNum + 1].CONTENT;

        modalImg.src = dbImg[currentImgNum + 1].PATH + dbImg[currentImgNum + 1].FILE_NAME;
        modalImg.setAttribute('imgid',currentImgNum + 1);
    }
}

// 사진 슬라이드
setInterval(() => {
    photoSlide.style.transition = 0.8 + "s";
    
    var miniPhoto = document.querySelector('.miniPhoto');
    let dbindex = 
   
    photoSlide.style.transform = "translateX(-" + (miniPhoto.clientWidth * (index + 1)) + "px)";
    index++;
    if(index==photoCnt-1){
        index = -1;
    }

}, 4000);

function getCursor(){
    this.style.cursor = 'pointer';
}

// modal 종료 함수
post_modal_closeBtn.onclick = function(){
    postModal.style.display = 'none';
}

img_modal_closeBtn.onclick = function(){
    imgModal.style.display = 'none';
}

err_close.onclick = function(){
    err_modal.style.display = 'none';
}

window.onclick = function(event){
    if(event.target == imgModal){
        imgModal.style.display = 'none';
    }
}

window.onkeydown = function(){
    if(event.keyCode == 27){
        imgModal.style.display = 'none';
    }
}

init();