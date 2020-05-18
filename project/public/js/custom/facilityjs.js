//Facility Slide Show PC
let slideIndex = 1;
showSlides(slideIndex); //first slide show on

function plusSlides(n){ // click prev, next
    showSlides(slideIndex += n);
}

function currentSlide(n) { //click dot
    showSlides(slideIndex = n);
}

function showSlides(n){
    let i = 0;
    var slides = document.getElementsByClassName("facilitySlide");
    var dots = document.getElementsByClassName("dot");

    if(n>slides.length) {slideIndex=1};
    if(n<1){slideIndex = slides.length};

    for(i=0;i<slides.length;i++){ //init
        slides[i].style.display = 'none';
    }

    for(i=0;i<dots.length;i++){ //init
        dots[i].className = dots[i].className.replace(" active","");
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

