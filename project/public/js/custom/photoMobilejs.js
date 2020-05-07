const tp2 = document.querySelector('#tp2 tbody');
const mobilePageBtns = document.querySelector('.mobilePageBtns');

//params
let mobilepages;
let mobileCurrentPage;

//DB상에 저장된 내용 모두 가져오기
function init(){
    resetList();
    axios.get('/photoMobile/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                mobileCreateBtns(res.data["data"]);
            }
        }
    });
    axios.get('/photoMobile/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                //추가 공지사항 리스트
                addListMobile(res.data["data"]);
            }
        }
    });
}

// Mobile page btn
function mobileCreateBtns(item = []){
    mobileResetBtns();
    if(item.length%8==0){
        mobilepages = parseInt(item.length/8);
    }
    else mobilepages = parseInt(item.length/8 + 1);
    let prevBtn = document.createElement('button');
    let nextBtn = document.createElement('button');
    
    prevBtn.classList.add('prevBtn','mobile');

    prevBtn.innerText = '←';
    prevBtn.addEventListener('click',goToPrev);

    mobilePageBtns.appendChild(prevBtn);

    for(i=1;i<=mobilepages;i++){
        let pageButton = document.createElement('button');
        pageButton.classList.add('pageButton','mobile');

        if(i==1){
            pageButton.classList.add('current');

            mobileCurrentPage = pageButton;
        }
        else {
            pageButton.classList.remove('current');
            pageButton.classList.add('notCurrent');
        }
        pageButton.innerText = i;
        pageButton.value = i;
        pageButton.addEventListener('click',deleteAndGet);
        mobilePageBtns.appendChild(pageButton);
    }
    nextBtn.classList.add('nextBtn','mobile');
    nextBtn.innerText = '→';
    nextBtn.addEventListener('click',goToNext);
    mobilePageBtns.appendChild(nextBtn);
}

function goToPrev(){
    if(mobileCurrentPage.value != 1){
        resetList();
        mobileCurrentPage.classList.remove('current');
        mobileCurrentPage.classList.add('notCurrent');
        
        mobileCurrentPage = mobileCurrentPage.previousSibling;
        
        mobileCurrentPage.classList.remove('notCurrent');
        mobileCurrentPage.classList.add('current');

        page_num = mobileCurrentPage.value;
        axios.get('/photoMobile/page_num', { params :{
            page_num : page_num
        }}).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addListMobile(res.data["data"]);
            }
        }
    });
    }
    
}
function goToNext(){
    if(mobileCurrentPage.value != mobilepages){
        resetList();
        mobileCurrentPage.classList.remove('current');
        mobileCurrentPage.classList.add('notCurrent');
        
        mobileCurrentPage = mobileCurrentPage.nextSibling;
        
        mobileCurrentPage.classList.remove('notCurrent');
        mobileCurrentPage.classList.add('current');

        page_num = mobileCurrentPage.value;
        axios.get('/photoMobile/page_num', { params :{
            page_num : page_num
        }}).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addListMobile(res.data["data"]);
            }
        }
    });
    }
}

//해당 페이지에 로드할 리스트들(게시글)
function deleteAndGet(){
    mobileCurrentPage.classList.remove('current');
    mobileCurrentPage.classList.add('notCurrent');

    let page_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    mobileCurrentPage = this;
    //이전 데이터 삭제
    resetList();
    //이후 데이터 출력 위해 db 호출
        axios.get('/photoMobile/page_num', { params:{
            page_num: page_num
        }}).then((res)=>{
            if(res.status === 200){
                if(res.data["result"] == "success"){ 
                    addListMobile(res.data["data"]);
                }
            }
        });
}

function addListMobile(item = []){
    item.forEach(function(data){
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDate = document.createElement('td');
        
        let url = document.createElement('a');
        url.innerText = data.TITLE;        

        tdId.innerText = data.ID;
        tdDate.innerText = date_format(data.DATE);

        url.href = 'photo_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tp2.appendChild(tr);
    });
}

//날짜 폼 변경
function date_format(data){
    let date;
    date = data.slice(0,10);
    return date;
}

//table 리셋 함수
function resetList(){
    while(tp2.hasChildNodes()){
        tp2.removeChild(tp2.firstChild);
    }
}

//버튼 리셋 함수
function mobileResetBtns(){
    let pageBtns = document.querySelector('.mobilePageBtns');
    while(pageBtns.hasChildNodes()){
        pageBtns.removeChild(pageBtns.firstChild);
    }
}

function getCursor(){
    this.style.cursor = 'pointer';
 }

// 엔터키 입력
function pressKey(){
    if(window.event.keyCode == 13){
            search();
    }
}
init();