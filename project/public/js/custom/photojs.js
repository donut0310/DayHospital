//dynamic add elements

//btns
const pcPageBtns = document.querySelector('.pcPageBtns');

//params
let pages;
let pcCurrentPage;

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.get('/photo/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
            }
        }
    });
    axios.get('/photo/init').then((res)=>{
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

    if(item.length%6==0){
        pages = parseInt(item.length/6);
    }
    else pages = parseInt(item.length/6 + 1);
    let prevBtn = document.createElement('button');
    let nextBtn = document.createElement('button');
    
    prevBtn.classList.add('prevBtn','pc');
    prevBtn.innerText = '←';
    prevBtn.addEventListener('click',pcGoToPrev);
    pcPageBtns.appendChild(prevBtn);
    
    for(i=1;i<=pages;i++){
        let pageButton = document.createElement('button');
        pageButton.classList.add('pageButton','pc');
        if(i==1){
            pageButton.classList.add('current');
            pcCurrentPage = pageButton;
        }
        else {
            pageButton.classList.remove('current');
            pageButton.classList.add('notCurrent');
        }
        pageButton.innerText = i;
        pageButton.value = i;
        pageButton.addEventListener('click',pcDeleteAndGet);
        pcPageBtns.appendChild(pageButton);
    }
    
    nextBtn.classList.add('nextBtn','pc');
    nextBtn.innerText = '→';
    nextBtn.addEventListener('click',pcGoToNext);
    pcPageBtns.appendChild(nextBtn);
    
}

//버튼 리셋 함수
function resetBtns(){
    let pcPageBtns = document.querySelector('.pcPageBtns');
    while(pcPageBtns.hasChildNodes()){
        pcPageBtns.removeChild(pcPageBtns.firstChild);
    }
}

function pcGoToPrev(){
    if(pcCurrentPage.value != 1){
        pcCurrentPage.classList.remove('current');
        pcCurrentPage.classList.add('notCurrent');
        
        pcCurrentPage = pcCurrentPage.previousSibling;

        pcCurrentPage.classList.remove('notCurrent');
        pcCurrentPage.classList.add('current');


        let pcPage_num = pcCurrentPage.value;
        
        axios.get('/photo/page_num', {params :{
            page_num : pcPage_num
        }
    }).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addImg(res.data["data"]);
            }
        }
    });
    }
}

function pcGoToNext(){
    if(pcCurrentPage.value != pages){
        pcCurrentPage.classList.remove('current');
        pcCurrentPage.classList.add('notCurrent');
     
        pcCurrentPage = pcCurrentPage.nextSibling;

        pcCurrentPage.classList.remove('notCurrent');
        pcCurrentPage.classList.add('current');

        let pcPage_num = pcCurrentPage.value;
        
        axios.get('/photo/page_num', {params :{
            page_num : pcPage_num
        }}).then((res)=>{
            if(res.status === 200){
                if(res.data["result"] == "success"){ 
                    addImg(res.data["data"]);
                }
            }
        });
    }
}

//사진 나열
function addImg(item = []){
    let len = item.length;
    for(i=0;i<len;i++){
        let img = document.querySelector('#td' + (i + 1) + ' img');
        let a = document.querySelector('#td' + (i + 1) + ' a');
        let title = document.querySelector('#td' + (i + 1) + ' .photo_title');
        let date = document.querySelector('#td' + (i + 1) + ' .photo_date');
    
        img.style.cursor = "pointer";

        img.src = item[i].PATH + item[i].FILE_NAME;
        title.innerText = item[i].TITLE;
        date.innerText = date_format(item[i].DATE);
        a.href = 'photo_board?' + (item[i].ID);    
    }
    //사진 없는 경우
    for(i=len;i<6;i++){
        let img = document.querySelector('#td' + (i + 1) + ' img');
        let a = document.querySelector('#td' + (i + 1) + ' a');
        let title = document.querySelector('#td' + (i + 1) + ' .photo_title');
        let date = document.querySelector('#td' + (i + 1) + ' .photo_date');
        
        img.style.cursor = "default";
        a.removeAttribute('href');
        img.src = "";
        title.innerText = "";
        date.innerText = "";
    }
}

function date_format(data){
    let date;
    date = data.slice(0,10);
    return date;
}

//해당 페이지에 로드할 리스트들(게시글)
function pcDeleteAndGet(){
    pcCurrentPage.classList.remove('current');
    pcCurrentPage.classList.add('notCurrent');
    
    let pcPage_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    pcCurrentPage = this;

    //이후 데이터 출력 위해 db 호출    
    axios.get('/photo/page_num', {params:{
        page_num:pcPage_num
    }}).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    addImg(res.data["data"]);
            }
        }
    });
}


//시작 함수
init();