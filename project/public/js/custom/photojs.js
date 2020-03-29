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
let pages;

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.post('/cus_photo/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
            }
        }
    });
    axios.post('/cus_photo/init').then((res)=>{
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
    resetTable();

    item.forEach(function(data){
            let td = document.createElement('td');
            let divImg = document.createElement('div');
            let divContent = document.createElement('div');
            let img = document.createElement('img');



            img.src = data.path;
            img.name = data.file_name;
            divImg.appendChild(img);
            img.style.width = "100%";
            img.style.height = "100%"; 

            divContent.className += 'photo_content';

            divImg.addEventListener('mouseover',getCursor);
            img.addEventListener('click',showImage);

            let title = document.createElement('div');
            let photo_date = document.createElement('div');

            title.className += 'photo_title';
            photo_date.className += 'photo_date';

            title.innerText = '사진 제목 관리자 업로드시 db 추가';
            photo_date.innerText = data.date;
            
            divContent.appendChild(title);
            divContent.appendChild(photo_date);
            
            td.appendChild(divImg);
            td.appendChild(divContent);
            photoTr.appendChild(td);
        });
}

//table 리셋 함수
function resetTable(){
    //이전 데이터 삭제
    while(photoTr.hasChildNodes()){
        photoTr.removeChild(photoTr.firstChild);
    }
}

//해당 페이지에 로드할 리스트들(게시글)
function deleteAndGet(){
    let page_num = this.value;
    
    //이전 데이터 삭제
    resetTable();
    
    //이후 데이터 출력 위해 db 호출
    let sendData = {};
    sendData['page_num'] = page_num;
    
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