//dynamic add elements
const tbody = document.querySelector('.pmpcTb tbody');
const tbodyMobile = document.querySelector('#tp1 tbody');
const pcPageBtns = document.querySelector('.pcPageBtns');
const mobilePageBtns = document.querySelector('.mobilePageBtns');

//btns
const searchClicked = document.querySelector('#searchBtn');
searchClicked.addEventListener("click",search);

//params
let pages;
let currentPage;

//DB상에 저장된 내용 모두 가져오기
function init(){
    resetList();
    axios.get('/pmpc/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
                    mobileCreateBtns(res.data["data"]);
            }
        }
    });
    axios.get('/pmpc/preList').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                //우선순위 공지사항 리스트
                addPreList(res.data["data"]);
                addPreListMobile(res.data["data"]);
            }
        }
    });
    axios.get('/pmpc/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                //추가 공지사항 리스트
                addList(res.data["data"]);
                addListMobile(res.data["data"]);
            }
        }
    });
}

// PC page btn
function createBtns(item = []){
    resetBtns();
    if(item.length%8==0){
        pages = parseInt(item.length/8);
    }
    else pages = parseInt(item.length/8 + 1);
    let prevBtn = document.createElement('button');
    let nextBtn = document.createElement('button');
    
    prevBtn.classList.add('prevBtn');
    prevBtn.innerText = '←';
    prevBtn.addEventListener('click',goToPrev);

    pcPageBtns.appendChild(prevBtn);

    for(i=1;i<=pages;i++){
        let pageButton = document.createElement('button');
        pageButton.classList.add('pageButton');

        if(i==1){
            pageButton.classList.add('current');

            currentPage = pageButton;
        }
        else {
            pageButton.classList.remove('current');
            pageButton.classList.add('notCurrent');
        }
        pageButton.innerText = i;
        pageButton.value = i;
        pageButton.addEventListener('click',deleteAndGet);
        pcPageBtns.appendChild(pageButton);
    }
    nextBtn.classList.add('nextBtn');

    nextBtn.innerText = '→';
    nextBtn.addEventListener('click',goToNext);
    pcPageBtns.appendChild(nextBtn);
}

// Mobile page btn
function mobileCreateBtns(item = []){
    mobileResetBtns();
    if(item.length%8==0){
        pages = parseInt(item.length/8);
    }
    else pages = parseInt(item.length/8 + 1);
    let prevBtn = document.createElement('button');
    let nextBtn = document.createElement('button');
    
    prevBtn.classList.add('prevBtn','mobile');

    prevBtn.innerText = '←';
    prevBtn.addEventListener('click',goToPrev);

    mobilePageBtns.appendChild(prevBtn);

    for(i=1;i<=pages;i++){
        let pageButton = document.createElement('button');
        pageButton.classList.add('pageButton','mobile');

        if(i==1){
            pageButton.classList.add('current');

            currentPage = pageButton;
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

function createSearchedBtns(item = []){
    resetBtns();
    
    if(item.length%8==0){
        pages = parseInt(item.length/8);
    }
    else pages = parseInt(item.length/8 + 1);
    let nextBtn = document.createElement('button');
    let prevBtn = document.createElement('button');
    
    prevBtn.className += 'prevBtn';
    prevBtn.innerText = '←';
    prevBtn.addEventListener('click',goToPrev);
    pcPageBtns.appendChild(prevBtn);

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
        pcPageBtns.appendChild(pageButton);
    }
    
    nextBtn.className += 'nextBtn';
    nextBtn.innerText = '→';
    nextBtn.addEventListener('click',goToNext);
    pcPageBtns.appendChild(nextBtn);
}

function goToPrev(){
    if(currentPage.value != 1){
        resetList();
        currentPage.classList.remove('current');
        currentPage.classList.add('notCurrent');
        
        currentPage = currentPage.previousSibling;
        
        currentPage.classList.remove('notCurrent');
        currentPage.classList.add('current');
        
        axios.get('/pmpc/preList').then((res)=>{
            if(res.status === 200){
                if(res.data["result"] == "success"){ 
                    addPreList(res.data["data"]);
                    addPreListMobile(res.data["data"]);
                }
            }
        });

        page_num = currentPage.value;
        axios.get('/pmpc/page_num', { params :{
            page_num : page_num
        }}).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
                addListMobile(res.data["data"]);
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

        axios.get('/pmpc/preList').then((res)=>{
            if(res.status === 200){
                if(res.data["result"] == "success"){ 
                    addPreList(res.data["data"]);
                    addPreListMobile(res.data["data"]);
                }
            }
        });

        page_num = currentPage.value;
        axios.get('/pmpc/page_num', { params :{
            page_num : page_num
        }}).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
                addListMobile(res.data["data"]);
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
    
    axios.get('/pmpc/selectData',  { params :{
        value: otn,
        text: searchText
    }}).then((res)=>{
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
    for(i=0;i<12;i++){
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
    
    axios.get('/pmpc/preList').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addPreList(res.data["data"]);
                addPreListMobile(res.data["data"]);
            }
        }
    });
    //이후 데이터 출력 위해 db 호출
        axios.get('/pmpc/page_num', { params:{
            page_num: page_num
        }}).then((res)=>{
            if(res.status === 200){
                if(res.data["result"] == "success"){ 
                    addList(res.data["data"]);
                    addListMobile(res.data["data"]);
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
    
    axios.post('/pmpc/selectData_page_num', {params:{
        page_num: page_num,
        value: otn,
        text: searchText
    }}).then((res)=>{
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
function addPreList(item = []){
    item.forEach(function(data){
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDate = document.createElement('td');
        
        let url = document.createElement('a');
        url.innerText = data.TITLE;        

        tdId.innerText = data.ID;
        tdDate.innerText = date_format(data.DATE);

        url.href = 'pmpc_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbody.appendChild(tr);
    });
}

function addPreListMobile(item = []){
    item.forEach(function(data){
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDate = document.createElement('td');
        
        let url = document.createElement('a');
        url.innerText = data.TITLE;        

        tdId.innerText = data.ID;
        tdDate.innerText = date_format(data.DATE);

        url.href = 'pmpc_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbodyMobile.appendChild(tr);
    });
}

function addList(item = []){
    item.forEach(function(data){
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDate = document.createElement('td');
        
        let url = document.createElement('a');
        url.innerText = data.TITLE;        

        tdId.innerText = data.ID;
        tdDate.innerText = date_format(data.DATE);

        url.href = 'pmpc_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbody.appendChild(tr);
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

        url.href = 'pmpc_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbodyMobile.appendChild(tr);
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
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    while(tbodyMobile.hasChildNodes()){
        tbodyMobile.removeChild(tbodyMobile.firstChild);
    }}

//버튼 리셋 함수
//PC 버전만
function resetBtns(){
    let pageBtns = document.querySelector('.pcPageBtns');
    while(pageBtns.hasChildNodes()){
        pageBtns.removeChild(pageBtns.firstChild);
    }
}
//PC, Mobile버전 둘다
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