//dynamic add elements
const photoTr = document.querySelector('#photoTr');

//btns
const page_btns = document.querySelector('#page_btns');
const imgCloseBtn = document.querySelector('#imgCloseBtn');
imgCloseBtn.addEventListener('mouseover',getCursor);
//modal
const modalImg = document.querySelector('#modalImg');
const imgModal = document.querySelector('.modal');

//params
let pages = 1;

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.post('/cus_photo/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
            }
        }
    });
    let sendData = {};
    sendData['pageNum'] = pages;
    axios.post('/cus_photo/getImg',sendData).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    addImg(res.data["data"]);
            }
        }
    });
}
 
//페이지 버튼
function createBtns(item = []){
    resetBtns();

    pages = item.length/3;
    for(i=0;i<pages;i++){
        let btn = document.createElement('button');
        btn.className += 'page_btn';
        btn.style.float = 'left';
        btn.innerText = i+1;
        btn.value = i+1;
        btn.addEventListener('click',deleteAndGet);
        page_btns.appendChild(btn);
    }
}

//버튼 리셋 함수
function resetBtns(){
    let deleteBtns = document.querySelector('#page_btns');
    while(deleteBtns.hasChildNodes()){
        deleteBtns.removeChild(deleteBtns.firstChild);
    }
}

//사진 나열
function addImg(item = []){
    let dataCnt = item.length;
    for(i=0;i<dataCnt;i++){
        
        let set_tdId = "td"+(i+1);
        let get_tdImg = document.querySelector('#'+set_tdId + ' img');
        get_tdImg.src = item[i].path;

        let get_photo_title = document.querySelector('#' + set_tdId + ' .photo_title');
        get_photo_title.innerText = item[i].file_name;
        
        let get_photo_date = document.querySelector('#' + set_tdId + ' .photo_date');
        get_photo_date.innerText = item[i].date;
    }
}

//해당 페이지에 로드할 리스트들(게시글)
function deleteAndGet(){
    pages = this.value;

    let sendData = {};
    sendData['pageNum'] = pages;
    axios.post('/cus_photo/page_num', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    addImg(res.data["data"]);
            }
        }
    });
}

//img mouseover시 pointer 효과
function getCursor(){
    this.style.cursor = 'pointer';
}

// 사진 모달
function showImage(){
    let modalImg = document.querySelector('#modalImg');
    modalImg.src = this.getAttribute('src');
    
    modalImg.style.width = "100%";
    modalImg.style.height = "100%";
    modalImg.style.cursor = 'default';

    imgModal.style.display = 'block';
    
}

// 모달 종료
window.onclick = function(event) {
    if (event.target == imgModal) {
        imgModal.style.display = "none";
    }
 }

imgCloseBtn.onclick = function(){
    imgModal.style.display = 'none';
}

//시작 함수
init();