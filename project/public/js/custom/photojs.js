//dynamic add elements
const photoTr = document.querySelector('#photoTr');

//btns
const page_btns = document.querySelector('#page_btns');
const modal_img_close = document.querySelector('#modal_img_close');

//modal
const modal_img = document.querySelector('#modal_img');
const modal_content = document.querySelector('#modal_img_content');
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

            divImg.className += 'photo_i';

            
            img.src = data.path + data.file_name;
            img.name = data.file_name;
            img.width = 300;
            img.height = 280; 
            divImg.appendChild(img);
            divContent.className += 'photo_content';

            divImg.addEventListener('mouseover',cursor);
            divImg.addEventListener('click',showImage);
            


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
function cursor(){
    this.style.cursor = 'pointer';
}

// 사진 모달
function showImage(){
    modal_img.style.display = 'block';
    modal_content.style.height = "70%";
    let show_img = document.querySelector('#show_img');
    let clone = this.cloneNode(true);

    clone.className = 'addedImg';
    show_img.appendChild(clone);

    let img = document.querySelector('.addedImg img'); 
    img.width = 800;
    img.height = 500;
    img.style.cursor = 'default';
}

// 모달 종료
window.onclick = function(event) {
    if (event.target == modal_img) {
        modal_img.style.display = "none";
        let parent = document.querySelector('#show_img');
        let child = document.querySelector('.addedImg');
        parent.removeChild(child);
    }
 }

modal_img_close.onclick = function(){
    modal_img.style.display = "none";
    let parent = document.querySelector('#show_img');
    let child = document.querySelector('.addedImg');
    parent.removeChild(child);
}

//시작 함수
init();