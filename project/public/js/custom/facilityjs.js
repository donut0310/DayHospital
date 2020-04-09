// modal
const imgModal = document.querySelector('#modal-in-photo');
const err_modal = document.querySelector('#err_modal');
const err_close = document.querySelector("#err_close");
err_close.addEventListener('mouseover',getCursor);

//btns
const imgCloseBtn = document.querySelector('.imgCloseBtn');
imgCloseBtn.addEventListener('mouseover',getCursor);

const prevBtn = document.querySelector('.prevBtn');
prevBtn.addEventListener('click',goToPrev);
prevBtn.addEventListener('mouseover',getCursor);

const nextBtn = document.querySelector('.nextBtn');
nextBtn.addEventListener('click',goToNext);
nextBtn.addEventListener('mouseover',getCursor);

//parmas
let currentImgNum; //모달에 로드된 이미지 id값

function init(){
    let images = document.querySelectorAll('.facility_photo img');
    
    images.forEach(function(data){
        data.addEventListener('mouseover',getCursor);
        data.addEventListener('click',getImgModal);
    });
}

function getImgModal(){
    //console.log(this);
    let modalImg = document.querySelector('#modalImg');
    modalImg.src = this.getAttribute('src');
    currentImgNum = Number(this.getAttribute('imgid'));
    modalImg.setAttribute('imgid',currentImgNum);

    imgModal.style.display = 'block';
}

function getCursor(){
    this.style.cursor = 'pointer';
}

// 이전 사진으로
function goToPrev(){
    let modalImg = document.querySelector('#modalImg');
    currentImgNum = Number(modalImg.getAttribute('imgid'));
    if(currentImgNum == 1){
        err_modal.style.display = 'block';
    }
    else{
        let prevImg = document.querySelector('#fa_photo' + (currentImgNum - 1) + ' img');
        modalImg.src = prevImg.getAttribute('src');
        modalImg.setAttribute('imgid',currentImgNum - 1);

    }
}

// 다음사진으로
function goToNext(){
    let modalImg = document.querySelector('#modalImg');
    currentImgNum = Number(modalImg.getAttribute('imgid'));
    
    if(currentImgNum == 6){
        err_modal.style.display = 'block';
    }
    else{
        let nextImg = document.querySelector('#fa_photo' + (currentImgNum + 1) + ' img');
        modalImg.src = nextImg.getAttribute('src'); 
        modalImg.setAttribute('imgid',currentImgNum + 1);
    }
}

// modal 종료 함수
imgCloseBtn.onclick = function(){
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