//dynamic add elements
const tbody = document.querySelector('.pmpcTb tbody');
const pageBtns = document.querySelector('.pageBtns');

//btns
const page_btns = document.querySelector('#page_btns');
const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener("click",search);
const okBtn = document.querySelector('#ok');

//params
let pages;
let currentPage;

// close btn
const err_close = document.querySelector("#err_close");

// Modal
// 경고창 모달
const err_modal = document.querySelector('#err_modal');

//DB상에 저장된 내용 모두 가져오기
function init(){
    resetList();

    axios.get('/meal/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
            }
        }
    });
    axios.get('/meal/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
            }
        }
    });
}

//페이지 버튼
function createBtns(item = []){
    resetBtns();

    if(item.length%5==0){
        pages = parseInt(item.length/5);
    }
    else pages = parseInt(item.length/5 + 1);
    let prevBtn = document.createElement('button');
    let nextBtn = document.createElement('button');
    
    prevBtn.className += 'prevBtn';
    prevBtn.innerText = '←';
    prevBtn.addEventListener('click',goToPrev);
    pageBtns.appendChild(prevBtn);
    
    for(i=1;i<=pages;i++){
        let pageButton = document.createElement('button');
        pageButton.className += 'pageButton';
        if(i==1){
            pageButton.className += ' current';
            currentPage = pageButton;
        }
        else pageButton.className += ' notCurrent';
        
        pageButton.innerText = i;
        pageButton.value = i;
        pageButton.addEventListener('click',deleteAndGet);
        pageBtns.appendChild(pageButton);
    }
    
    nextBtn.className += 'nextBtn';
    nextBtn.innerText = '→';
    nextBtn.addEventListener('click',goToNext);
    pageBtns.appendChild(nextBtn);
    
}

function createSearchedBtns(item = []){
    resetBtns();
    
    if(item.length%5==0){
        pages = parseInt(item.length/5);
    }
    else pages = parseInt(item.length/5 + 1);
    let nextBtn = document.createElement('button');
    let prevBtn = document.createElement('button');
    
    prevBtn.className += 'prevBtn';
    prevBtn.innerText = '←';
    prevBtn.addEventListener('click',goToPrev);
    pageBtns.appendChild(prevBtn);

    for(i=1;i<=pages;i++){
        let pageButton = document.createElement('button');
        pageButton.className += 'pageButton';
        if(i==1){
            pageButton.className += ' current';
            currentPage = pageButton;
        }
        else pageButton.className += ' notCurrent';
        
        pageButton.innerText = i;
        pageButton.value = i;
        pageButton.addEventListener('click',searchedDeleteAndGet);
        pageBtns.appendChild(pageButton);
    }
    
    nextBtn.className += 'nextBtn';
    nextBtn.innerText = '→';
    nextBtn.addEventListener('click',goToNext);
    pageBtns.appendChild(nextBtn);
}

function resetBtns(){
    let pageBtns = document.querySelector('.pageBtns');
    while(pageBtns.hasChildNodes()){
        pageBtns.removeChild(pageBtns.firstChild);
    }
}

function goToPrev(){
    if(currentPage.value != 1){
        resetList();
        currentPage.classList.remove('current');
        currentPage.classList.add('notCurrent');
        
        currentPage = currentPage.previousSibling;
        
        currentPage.classList.remove('notCurrent');
        currentPage.classList.add('current');

        page_num = currentPage.value;

        
        axios.get('/meal/page_num', {params: {
            page_num: page_num
            }
          }).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
            }
        }
    });
    }
    
}
function goToNext(){
    if(currentPage.value != pages){
        resetList();
        currentPage.classList.remove('current');
        currentPage.classList.add('notCurrent');
        
        currentPage = currentPage.nextSibling;
        
        currentPage.classList.remove('notCurrent');
        currentPage.classList.add('current');

        axios.get('/meal/page_num', {params: {
            page_num: page_num
            }
          }).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
            }
        }
    });
    }
}

//게시글 검색
function search(){
    let target = document.querySelector('#selectBy');
    let searchText = document.querySelector('#searchText').value;
    
    let otn = target.options[target.selectedIndex].value;
    
    axios.get('/meal/selectData', {params: {
        page_num: page_num,
        value : otn,
        text : searchText
        }
      }).then((res)=>{
        if(res.status === 200){
            if(res.data['result'] == "success"){
                if(res.data['data'] == 'init'){
                    resetList();
                    init();
                }
                else showSearchedInit(res.data['data']);                
            }
        }
    });
}

// 검색된 고객정보 출력
function showSearchedInit(item = []){
    createSearchedBtns(item);
    //이전 데이터 삭제
    resetList();
    //이후 데이터 출력
    for(i=0;i<10;i++){
        if(item[i]==null)break;
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDate = document.createElement('td');

        tdId.innerText = item[i].ID;
        tdTitle.innerText = item[i].TITLE;
        tdTitle.value = item[i].ID;
        tdDate.innerText = item[i].DATE
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbody.appendChild(tr);
    }
}

//해당 페이지에 로드할 리스트들(게시글)
function deleteAndGet(){
    currentPage.classList.remove('current');
    currentPage.classList.add('notCurrent');

    let page_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    currentPage = this;
    //이전 데이터 삭제
    resetList();
    
    //이후 데이터 출력 위해 db 호출
    axios.get('/meal/page_num', {params: {
        page_num: page_num
        }
      }).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
            }
        }
    });
}

//해당 페이지에 로드할 검색된 리스트들(게시글)
function searchedDeleteAndGet(){
    currentPage.classList.remove('current');
    currentPage.classList.add('notCurrent');

    let page_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    currentPage = this;

    let target = document.querySelector('#selectBy');
    let searchText = document.querySelector('#searchText').value;
    
    let otn = target.options[target.selectedIndex].value;
    
    //이전 데이터 삭제
    resetList();
    
    //이후 데이터 출력 위해 db 호출

    axios.get('/meal/selectData_page_num', {params: {
        page_num: page_num,
        value : otn,
        text : searchText
        }
      }).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){
                    if(res.data['data']=='init'){
                        resetList();
                        init();
                    }
                    else {addList(res.data['data']);}
            }
        }
    }); 
}

//table에 추가할 공지사항 list 함수
function addList(item = []){
    
    item.forEach(function(data){
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDate = document.createElement('td');
        
        let url = document.createElement('a');
        url.innerText = data.TITLE;        

        tdId.innerText = data.ID;
        tdDate.innerText = data.DATE

        url.href = 'meal_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbody.appendChild(tr);
    });
}

//table 리셋 함수
function resetList(){
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
}

//버튼 리셋 함수
function resetBtns(){
    let pageBtns = document.querySelector('.pageBtns');
    while(pageBtns.hasChildNodes()){
        pageBtns.removeChild(pageBtns.firstChild);
    }
}

function getCursor(){
    this.style.cursor = 'pointer';
 }

// 에러 창 닫기 버튼 클릭시
err_close.onclick = function(){
    err_modal.style.display = 'none';
    init();
}
// 에러창 확인 버튼 클릭시
okBtn.onclick = function(event){
    err_modal.style.display = 'none';
    init();
}


// 엔터키 입력
function pressKey(){
    if(window.event.keyCode == 13){
            search();
    }
}
init();