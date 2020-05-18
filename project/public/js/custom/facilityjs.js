//Facility Slide Show PC
let slideIndex = 1;
let mslideIndex = 1;
showSlides(slideIndex); //first slide show on
mobileShowSlides(mslideIndex);

function plusSlides(n){ // click prev, next
    showSlides(slideIndex += n);
    mobileShowSlides(mslideIndex+=n);
}

function currentSlide(n) { //click dot
    showSlides(slideIndex = n);
    mobileShowSlides(mslideIndex = n);
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

function mobileShowSlides(n){
    let j=0;
    let mslides = document.getElementsByClassName("mobile-facilitySlide");
    let mdots = document.getElementsByClassName("mdot");

    if(n>mslides.length) {mslideIndex=1};
    if(n<1){mslideIndex = mslides.length};

    for(j=0;j<mslides.length;j++){ //init
        mslides[j].style.display = 'none';
    }

    for(j=0;j<mdots.length;j++){ //init
        mdots[j].className = mdots[j].className.replace(" active","");
    }

    mslides[mslideIndex-1].style.display = "block";
    mdots[mslideIndex-1].className += " active";
}

