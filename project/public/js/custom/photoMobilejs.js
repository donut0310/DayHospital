var tp2 = document.querySelector('#tp2 tbody');
var mobilePageBtns = document.querySelector('.mobilePageBtns');

//params
var mobilepages;
var mobileCurrentPage;

//DB상에 저장된 내용 모두 가져오기
function init(){
    resetList();
    axios.get('/photoMobile/createBtns').then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                mobileCreateBtns(res.data["data"]);
            }
        }
    });
    axios.get('/photoMobile/init').then(function (res){
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
    if(item.length!=0){
        if(item.length%8==0){
            mobilepages = parseInt(item.length/8);
        }
        else mobilepages = parseInt(item.length/8 + 1);
        var prevBtn = document.createElement('button');
        var nextBtn = document.createElement('button');
        
        prevBtn.classList.add('prevBtn','mobile');
    
        prevBtn.innerText = '←';
        prevBtn.addEventListener('click',mobileGoToPrev);
    
        mobilePageBtns.appendChild(prevBtn);
    
        for(i=1;i<=mobilepages;i++){
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
            pageButton.addEventListener('click',mobileDeleteAndGet);
            mobilePageBtns.appendChild(pageButton);
        }
        nextBtn.classList.add('nextBtn','mobile');
        nextBtn.innerText = '→';
        nextBtn.addEventListener('click',mobileGoToNext);
        mobilePageBtns.appendChild(nextBtn);
    }
}

function mobileGoToPrev(){
    if(mobileCurrentPage.value != 1){
        resetList();
        mobileCurrentPage.classList.remove('current');
        mobileCurrentPage.classList.add('notCurrent');
        
        mobileCurrentPage = mobileCurrentPage.previousSibling;
        
        mobileCurrentPage.classList.remove('notCurrent');
        mobileCurrentPage.classList.add('current');

        var mobilePage_num = mobileCurrentPage.value;
        axios.get('/photoMobile/page_num', { params :{
            page_num : mobilePage_num
        }}).then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addListMobile(res.data["data"]);
            }
        }
    });
    }
    
}
function mobileGoToNext(){
    
    if(mobileCurrentPage.value != mobilepages){
        resetList();
        mobileCurrentPage.classList.remove('current');
        mobileCurrentPage.classList.add('notCurrent');
        
        mobileCurrentPage = mobileCurrentPage.nextSibling;
        
        mobileCurrentPage.classList.remove('notCurrent');
        mobileCurrentPage.classList.add('current');

        var mobilePage_num = mobileCurrentPage.value;
        axios.get('/photoMobile/page_num', { params :{
            page_num : mobilePage_num
        }}).then(function (res){
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addListMobile(res.data["data"]);
            }
        }
    });
    }
}

//해당 페이지에 로드할 리스트들(게시글)
function mobileDeleteAndGet(){
    mobileCurrentPage.classList.remove('current');
    mobileCurrentPage.classList.add('notCurrent');

    var mobilePage_num = this.value;
    this.classList.remove('notCurrent');
    this.classList.add('current');
    mobileCurrentPage = this;
    //이전 데이터 삭제
    resetList();
    //이후 데이터 출력 위해 db 호출
        axios.get('/photoMobile/page_num', { params:{
            page_num: mobilePage_num
        }}).then(function (res){
            if(res.status === 200){
                if(res.data["result"] == "success"){ 
                    addListMobile(res.data["data"]);
                }
            }
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
    var date;
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
    var pageBtns = document.querySelector('.mobilePageBtns');
    while(pageBtns.hasChildNodes()){
        pageBtns.removeChild(pageBtns.firstChild);
    }
}

function getCursor(){
    this.style.cursor = 'pointer';
 }

init();