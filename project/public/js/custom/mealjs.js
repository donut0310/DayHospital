//dynamic add elements
var tbodyPC = document.querySelector('.pmpcTb tbody');
var tbodyMobile = document.querySelector('.mobileTb tbody');

var pcPageBtns = document.querySelector('.pcPageBtns');
var mobilePageBtns = document.querySelector('.mobilePageBtns');

//btns
var searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener("click",search);

//params
var pages;
var pcCurrentPage;
var mobileCurrentPage;

//DB상에 저장된 내용 모두 가져오기
function init(){
    resetList();

    axios.get('/meal/createBtns').then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
                    mobileCreateBtns(res.data["data"]);
            }
        }
    });
    axios.get('/meal/init').then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
                addListMobile(res.data["data"]);
            }
        }
    });
}

//페이지 버튼
// PC page btn
function createBtns(item = []){
    resetBtns();
    if(item.length!=0){
        if(item.length%8==0){
            pages = parseInt(item.length/8);
        }
        else pages = parseInt(item.length/8 + 1);
        var prevBtn = document.createElement('button');
        var nextBtn = document.createElement('button');
        
        prevBtn.classList.add('prevBtn','pc');
        prevBtn.innerText = '←';
        prevBtn.addEventListener('click',goToPrev);
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
            pageButton.addEventListener('click',deleteAndGet);
            pcPageBtns.appendChild(pageButton);
        }
        nextBtn.classList.add('nextBtn','pc');
    
        nextBtn.innerText = '→';
        nextBtn.addEventListener('click',goToNext);
        pcPageBtns.appendChild(nextBtn);
    }
}

// Mobile page btn
function mobileCreateBtns(item = []){
    mobileResetBtns();
    if(item.length!=0){
        if(item.length%8==0){
            pages = parseInt(item.length/8);
        }
        else pages = parseInt(item.length/8 + 1);
        var prevBtn = document.createElement('button');
        var nextBtn = document.createElement('button');
        
        prevBtn.classList.add('prevBtn','mobile');
    
        prevBtn.innerText = '←';
        prevBtn.addEventListener('click',goToPrev);
    
        mobilePageBtns.appendChild(prevBtn);
    
        for(i=1;i<=pages;i++){
            var pageButton = document.createElement('button');
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
    
}

function createSearchedBtnsPC(item = []){
    resetBtns();
    if(item.length!=0){
        if(item.length%8==0){
            pages = parseInt(item.length/8);
        }
        else pages = parseInt(item.length/8 + 1);
        var nextBtn = document.createElement('button');
        var prevBtn = document.createElement('button');
        
        prevBtn.classList.add('prevBtn','searchedPC');
        prevBtn.innerText = '←';
        prevBtn.addEventListener('click',goToPrev);
        pcPageBtns.appendChild(prevBtn);
    
        for(i=1;i<=pages;i++){
            var pageButton = document.createElement('button');
            pageButton.classList.add('pageButton','searchedPC');
            if(i==1){
                pageButton.classList.add('current');
                pcCurrentPage = pageButton;
            }
            else {
                pageButton.classList.remove('Current');
                pageButton.classList.add('notCurrent');
            }
            pageButton.innerText = i;
            pageButton.value = i;
            pageButton.addEventListener('click',searchedDeleteAndGet);
            pcPageBtns.appendChild(pageButton);
        }
        
        nextBtn.classList.add('nextBtn','searchedPC');
        nextBtn.innerText = '→';
        nextBtn.addEventListener('click',goToNext);
        pcPageBtns.appendChild(nextBtn);
    }
}

function createSearchedBtnsMobile(item = []){
    mobileResetBtns();
    
    if(item.length!=0){
        if(item.length%8==0){
            pages = parseInt(item.length/8);
        }
        else pages = parseInt(item.length/8 + 1);
        var nextBtn = document.createElement('button');
        var prevBtn = document.createElement('button');
        
        prevBtn.classList.add('prevBtn','searchedMobile');
        prevBtn.innerText = '←';
        prevBtn.addEventListener('click',goToPrev);
        mobilePageBtns.appendChild(prevBtn);
    
        for(i=1;i<=pages;i++){
            var pageButton = document.createElement('button');
            pageButton.classList.add('pageButton','searchedMobile');
            if(i==1){
                pageButton.classList.add('current');
                mobileCurrentPage = pageButton;
            }
            else {
                pageButton.classList.remove('Current');
                pageButton.classList.add('notCurrent');
            }
            pageButton.innerText = i;
            pageButton.value = i;
            pageButton.addEventListener('click',searchedDeleteAndGet);
            mobilePageBtns.appendChild(pageButton);
        }
        
        nextBtn.classList.add('nextBtn','searchedMobile');
        nextBtn.innerText = '→';
        nextBtn.addEventListener('click',goToNext);
        mobilePageBtns.appendChild(nextBtn);
    }
}


function goToPrev(){
    if(pcCurrentPage.value != 1 && mobileCurrentPage.value != 1){
        resetList();

        pcCurrentPage.classList.remove('current');
        pcCurrentPage.classList.add('notCurrent');
        mobileCurrentPage.classList.remove('current');
        mobileCurrentPage.classList.add('notCurrent');
        
        pcCurrentPage = pcCurrentPage.previousSibling;
        mobileCurrentPage = mobileCurrentPage.previousSibling;
        
        pcCurrentPage.classList.remove('notCurrent');
        mobileCurrentPage.classList.remove('notCurrent');
        pcCurrentPage.classList.add('current');
        mobileCurrentPage.classList.add('current');

        page_num = pcCurrentPage.value;
        axios.get('/meal/page_num', { params :{
            page_num : page_num
        }}).then(function (res){
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
    if(pcCurrentPage.value != pages && mobileCurrentPage.value != pages){
        resetList();
        pcCurrentPage.classList.remove('current');
        pcCurrentPage.classList.add('notCurrent');
        mobileCurrentPage.classList.remove('current');
        mobileCurrentPage.classList.add('notCurrent');
        
        pcCurrentPage = pcCurrentPage.nextSibling;
        mobileCurrentPage = mobileCurrentPage.nextSibling;
        
        pcCurrentPage.classList.remove('notCurrent');
        mobileCurrentPage.classList.remove('notCurrent');
        pcCurrentPage.classList.add('current');
        mobileCurrentPage.classList.add('current');

        page_num = pcCurrentPage.value;
        axios.get('/pmpc/page_num', { params :{
            page_num : page_num
        }}).then(function (res){
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
    var target = document.querySelector('#selectBy');
    var searchText = document.querySelector('#searchText').value;
    
    var otn = target.options[target.selectedIndex].value;
    
    axios.get('/meal/selectData', {params: {
        value : otn,
        text : searchText
        }
      }).then(function (res){
        if(res.status === 200){
            if(res.data['result'] == "success"){
                if(res.data['data'] == 'init'){
                    init();
                }
                else showSearchedInit(res.data['data']);                
            }
        }
    });
}

// 검색된 고객정보 출력
function showSearchedInit(item = []){
    createSearchedBtnsPC(item);
    createSearchedBtnsMobile(item);
    
    //이전 데이터 삭제
    resetList();
    //이후 데이터 출력
    for(i=0;i<12;i++){
        if(item[i]==null)break;
        var tr = document.createElement('tr');
        var tdId = document.createElement('td');
        var tdTitle = document.createElement('td');
        var tdDate = document.createElement('td');
        var url = document.createElement('a');
        url.innerText = item[i].TITLE;        

        tdId.innerText = item[i].ID;
        tdDate.innerText = date_format(item[i].DATE);

        url.href = 'meal_board?' + item[i].ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbodyPC.appendChild(tr);
    }
    for(i=0;i<12;i++){
        if(item[i]==null)break;
        var tr = document.createElement('tr');
        var tdId = document.createElement('td');
        var tdTitle = document.createElement('td');
        var tdDate = document.createElement('td');
        var url = document.createElement('a');
        url.innerText = item[i].TITLE;        

        tdId.innerText = item[i].ID;
        tdDate.innerText = date_format(item[i].DATE);

        url.href = 'meal_board?' + item[i].ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbodyMobile.appendChild(tr);
    }
}

//해당 페이지에 로드할 리스트들(게시글)
function deleteAndGet(){
    pcCurrentPage.classList.remove('current');
    mobileCurrentPage.classList.remove('current');
    pcCurrentPage.classList.add('notCurrent');
    mobileCurrentPage.classList.add('notCurrent');
    
    var page_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    pcCurrentPage = this;
    mobileCurrentPage = this;

    //이전 데이터 삭제
    resetList();

    //이후 데이터 출력 위해 db 호출
        axios.get('/meal/page_num', { params:{
            page_num: page_num
        }}).then(function (res){
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
    pcCurrentPage.classList.remove('current');
    mobileCurrentPage.classList.remove('current');
    pcCurrentPage.classList.add('notCurrent');
    mobileCurrentPage.classList.add('notCurrent');

    var page_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    pcCurrentPage = this;
    mobileCurrentPage = this;

    var target = document.querySelector('#selectBy');
    var searchText = document.querySelector('#searchText').value;
    
    var otn = target.options[target.selectedIndex].value;
    
    //이전 데이터 삭제
    resetList();
    
    //이후 데이터 출력 위해 db 호출
    axios.get('/meal/selectData_page_num', {params:{
        page_num: page_num,
        value: otn,
        text: searchText
    }}).then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){
                    if(res.data['data']=='init'){
                        resetList();
                        init();
                    }
                    else {
                        addList(res.data['data']);           
                        addListMobile(res.data["data"]);
                }
            }
        }
    }); 
}

//table에 추가할 공지사항 list 함수
function addList(item = []){
    
    item.forEach(function(data){
        var tr = document.createElement('tr');
        var tdId = document.createElement('td');
        var tdTitle = document.createElement('td');
        var tdDate = document.createElement('td');
        var url = document.createElement('a');
        url.innerText = data.TITLE;        

        tdId.innerText = data.ID;
        tdDate.innerText = date_format(data.DATE);

        url.href = 'meal_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbodyPC.appendChild(tr);
    });
}

function addListMobile(item = []){
    
    item.forEach(function(data){
        var tr = document.createElement('tr');
        var tdId = document.createElement('td');
        var tdTitle = document.createElement('td');
        var tdDate = document.createElement('td');
        
        var url = document.createElement('a');
        url.innerText = data.TITLE;        

        tdId.innerText = data.ID;
        tdDate.innerText = date_format(data.DATE);

        url.href = 'meal_board?' + data.ID;
        tdTitle.appendChild(url);
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);

        tbodyMobile.appendChild(tr);
    });
}

function date_format(data){
    var date;
    date = data.slice(0,10);
    return date;
}

//table 리셋 함수
function resetList(){
    while(tbodyPC.hasChildNodes()){
        tbodyPC.removeChild(tbodyPC.firstChild);
    }
    while(tbodyMobile.hasChildNodes()){
        tbodyMobile.removeChild(tbodyMobile.firstChild);
    }
}

//버튼 리셋 함수
//PC 버전만
function resetBtns(){
    var pageBtns = document.querySelector('.pcPageBtns');
    while(pageBtns.hasChildNodes()){
        pageBtns.removeChild(pageBtns.firstChild);
    }
}
//Mobile버전
function mobileResetBtns(){
    var pageBtns = document.querySelector('.mobilePageBtns');
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