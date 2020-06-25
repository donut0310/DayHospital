//dynamic add elements

//btns
var pcPageBtns = document.querySelector('.pcPageBtns');

//params
var pages;
var pcCurrentPage;

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.get('/photo/createBtns').then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
            }
        }
    });
    axios.get('/photo/init').then(function (res){
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
    if(item.length!=0){
        if(item.length%6==0){
            pages = parseInt(item.length/6);
        }
        else pages = parseInt(item.length/6 + 1);
        var prevBtn = document.createElement('button');
        var nextBtn = document.createElement('button');
        
        prevBtn.classList.add('prevBtn','pc');
        prevBtn.innerText = '←';
        prevBtn.addEventListener('click',pcGoToPrev);
        pcPageBtns.appendChild(prevBtn);
        
        for(i=1;i<=pages;i++){
            var pageButton = document.createElement('button');
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
}

//버튼 리셋 함수
function resetBtns(){
    var pcPageBtns = document.querySelector('.pcPageBtns');
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


        var pcPage_num = pcCurrentPage.value;
        
        axios.get('/photo/page_num', {params :{
            page_num : pcPage_num
        }
    }).then(function (res){
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

        var pcPage_num = pcCurrentPage.value;
        
        axios.get('/photo/page_num', {params :{
            page_num : pcPage_num
        }}).then(function (res){
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
    var len = item.length;
    for(i=0;i<len;i++){
        var img = document.querySelector('#td' + (i + 1) + ' img');
        var a = document.querySelector('#td' + (i + 1) + ' a');
        var title = document.querySelector('#td' + (i + 1) + ' .photo_title');
        var date = document.querySelector('#td' + (i + 1) + ' .photo_date');
        var filename = item[i].file_name.substring(0,32);
        img.style.cursor = "pointer";
        
        img.src = '/assets/uploads/' + filename;
        console.log(item[i].PATH);
        title.innerText = item[i].TITLE;
        date.innerText = date_format(item[i].DATE);
        a.href = 'photo_board?' + (item[i].ID);    
    }
    //사진 없는 경우
    for(i=len;i<6;i++){
        var img = document.querySelector('#td' + (i + 1) + ' img');
        img.src = '/assets/images/SMH/none.png';
        
        img.style.cursor = "default";
    }
}

function date_format(data){
    var date;
    date = data.slice(0,10);
    return date;
}

//해당 페이지에 로드할 리스트들(게시글)
function pcDeleteAndGet(){
    pcCurrentPage.classList.remove('current');
    pcCurrentPage.classList.add('notCurrent');
    
    var pcPage_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    pcCurrentPage = this;

    //이후 데이터 출력 위해 db 호출    
    axios.get('/photo/page_num', {params:{
        page_num:pcPage_num
    }}).then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    addImg(res.data["data"]);
            }
        }
    });
}


//시작 함수
init();