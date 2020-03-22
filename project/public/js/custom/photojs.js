//dynamic add elements
const photoTr = document.querySelector('#photoTr');

//btns
const page_btns = document.querySelector('#page_btns');

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
            let spanImg = document.createElement('span');
            let spanContent = document.createElement('span');
            let img = document.createElement('img');

            spanImg.className += 'photo_i';
            img.src = data.path + data.file_name;
            spanImg.appendChild(img);

            spanContent.className += 'photo_content';

            let title = document.createElement('div');
            let photo_date = document.createElement('div');

            title.className += 'photo_title';
            photo_date.className += 'photo_date';

            title.innerText = '사진 제목 관리자 업로드시 db 추가';
            photo_date.innerText = data.date;
            
            spanContent.appendChild(title);
            spanContent.appendChild(photo_date);
            
            td.appendChild(spanImg);
            td.appendChild(spanContent);
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
                    addList(res.data["data"]);
            }
        }
    });
}

init();