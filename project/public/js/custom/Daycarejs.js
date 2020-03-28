//daynamic add elements
const ul = document.querySelector('.postlist');

// btns
const pmpc_btn = document.querySelector('#iPost_more');
const meal_btn = document.querySelector('#iPost_more');
const imgCloseBtn = document.querySelector('#imgCloseBtn');

const prevBtn = document.querySelector('#prevBtn');
prevBtn.addEventListener('mouseover',getCursor);
prevBtn.addEventListener('click',goToPrev);

const nextBtn = document.querySelector('#nextBtn');
nextBtn.addEventListener('click',goToNext);
nextBtn.addEventListener('mouseover',getCursor);

const okBtn = document.querySelector('#ok');

//Modal
const imgModal = document.querySelector('.modal');
const err_modal = document.querySelector('#err_modal');
const err_close = document.querySelector("#err_close");

//parmas
let currentImgValue = 0;
let imgMaxCnt;
let resImg; //가져온 100개의 사진

//공지사항 리스트, 성모사랑사진 db 호출
function init() {
    axios.post('/Daycare/initPostlist').then((res) => {
        if (res.status === 200) {
            if (res.data["result"] == "success") {
                showPostList(res.data["data"]);
            }
        }
    });
    axios.post('/Daycare/initPhoto').then((res) => {
        if (res.status === 200) {
            if (res.data["result"] == "success") {
                showPhoto(res.data["data"]);
            }
        }
    });
    openMsgBox();

    setInterval(slide, 2000);
}

//공지사항 불러오기
function showPostList(item = []) {
    item.forEach(function (data) {
        let url = document.createElement('a');
        url.href = '/cus_pmpc_board?' + data.content_order;
        url.innerText = data.title;

        let li = document.createElement('li');
        li.className += 'list';
        li.appendChild(url);
        ul.appendChild(li);
    });
}

//성모사랑 사진 불러오기
function showPhoto(item =[]){
    let cnt = 1;
    item.forEach(function (data) {
        resizeImg(data, cnt);
        cnt += 2;
    });
}

function resizeImg(data, cnt) {
    let photozone = document.querySelector('.photozone');
    let photos = photozone.childNodes;

    let img = document.createElement('img');
    img.src = data.path;
    img.setAttribute('imgid', data.ID); 

    img.width = 195;
    img.height = 120;

    img.addEventListener('click',getImgModal);
    img.addEventListener('mouseover', getCursor);
    photos[cnt].appendChild(img);
}
function getCursor(){
    this.style.cursor = 'pointer';
}

// Get the modal
function getImgModal(){
    let modalImg = document.querySelector('#modalImg');
    modalImg.src = this.getAttribute('src');
    modalImg.setAttribute('imgid', this.getAttribute('imgid'));

    axios.post('/Daycare/getImg').then((res) => {
        if (res.status === 200) {
            if (res.data["result"] == "success") {
                resImg = (res.data['data']);
                imgMaxCnt = resImg.length;
            }
        }
    });
    
    imgModal.style.display = 'block';

    imgCloseBtn.addEventListener('mouseover',getCursor);
}

imgCloseBtn.onclick = function(){
    imgModal.style.display = 'none';
}

// prev버튼 클릭시
function goToPrev(){
    let currentImg = document.querySelector('#modalImg');
    currentImgValue = Number(currentImg.getAttribute('imgid'));
    
    //첫번째 사진이 아닌 경우에만 실행
    if(currentImgValue < imgMaxCnt){
        //현재 이미지->이전 이미지로 경로 변경
        currentImg.src = resImg[imgMaxCnt - currentImgValue - 1].path;
        currentImg.setAttribute('imgid', currentImgValue + 1);
    }
    else{
       err_modal.style.display = 'block';
    }
}
// next버튼 클릭시
function goToNext(){
    let currentImg = document.querySelector('#modalImg');
    currentImgValue = Number(currentImg.getAttribute('imgid'));
    
    //마지막 사진이 아닌 경우에만 실행
    if(currentImgValue>1){
        currentImg.src = resImg[imgMaxCnt - currentImgValue + 1].path;
        currentImg.setAttribute('imgid', currentImgValue - 1);
    }
    else{
        err_modal.style.display = 'block';
    }
}

err_close.onclick = function(){
    err_modal.style.display = 'none';
}
okBtn.onclick = function(){
    err_modal.style.display = 'none';
}

//메인 페이지 팝업창
function getCookie(name) {
    var Found = false
    var start, end
    var i = 0
    while (i <= document.cookie.length) {
        start = i
        end = start + name.length
        if (document.cookie.substring(start, end) == name) {
            Found = true
            break
        }
        i++
    }
    if (Found == true) {
        start = end + 1
        end = document.cookie.indexOf(";", start)
        if (end < start)
            end = document.cookie.length
        return document.cookie.substring(start, end)
    }
    return ""
}

function openMsgBox() {
    var eventCookie = getCookie("memo");
    if (eventCookie != "no")
        window.open('/popup', 'popup file', 'width=345px,height=722px,top=50,left=150');
}

//메인 페이지 배너
var firstslide = document.querySelector(".carousel-box:first-child");
var active = "active";
function slide() {
    var currentslide = document.querySelector(".active");

    if (currentslide) {

        currentslide.classList.remove(active);

        var nextslide = currentslide.nextElementSibling;

        if (nextslide) {
            nextslide.classList.add(active);
        }

        else {
            firstslide.classList.add(active);
        }
    }
    else {
        firstslide.classList.add(active);
    }


}

init();