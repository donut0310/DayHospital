var photos = document.querySelectorAll('.fa img');
var bigPhoto = document.querySelector('#fa_photo_big img');
var photoDiv = document.querySelectorAll('.fa');
//params
var currentValue = 0;

function init(){
    
    for(i=0;i<6;i++){
        if(i==0){
            bigPhoto.src = photos[i].src;
        }
        photos[i].addEventListener('mouseover',getCursor);        
        photos[i].addEventListener('click',loadImage); 
        photos[i].setAttribute('imgid',i);
    }   
}

function loadImage(){
    photoDiv[currentValue].classList.remove('fa_current');
    
    currentValue = this.getAttribute('imgid');
    photoDiv[currentValue].classList.add('fa_current');
    
    bigPhoto.src = this.src;
}
function getCursor(){
    this.style.cursor = "pointer";
}
init();