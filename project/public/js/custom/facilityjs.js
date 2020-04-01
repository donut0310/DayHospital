const photo = document.querySelectorAll('.facility_photo img');

//btns
const imgCloseBtn = document.querySelector('#imgCloseBtn');
imgCloseBtn.addEventListener('mouseover',getCursor);

//modal
const modalImg = document.querySelector('#modalImg');
const modal = document.querySelector('.modal');





function init(){
    photo.forEach(function(data){
        data.addEventListener('mouseover',getCursor);
        data.addEventListener('click',showImage);
    });   
}

function getCursor(){
    this.style.cursor = 'pointer';
}

// 사진 모달
function showImage(){
    let modalImg = document.querySelector('#modalImg');

    modalImg.src = this.src;
    modalImg.style.width = "100%";
    modalImg.style.height = "100%";
    modalImg.style.cursor = 'default';

    modal.style.display = 'block';
}

// 모달 종료
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
 }

imgCloseBtn.onclick = function(){
    modal.style.display = 'none';
}

init();