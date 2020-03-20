//dynamic add elements
const tbody = document.querySelector('tbody');
//btns
const page_btns = document.querySelector('#page_btns');
const searchClicked = document.querySelector('#searchBtn2');
searchClicked.addEventListener("click",search);
//params
let pages;

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.post('/cus_pmpc/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
            }
        }
    });
    axios.post('/cus_pmpc/init').then((res)=>{
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

    pages = item.length/10;
    for(i=0;i<pages;i++){
        let btn = document.createElement('button');
        btn.className += 'page_btn';
        btn.style.float = 'left';
        btn.innerText = i+1;
        btn.value = i+1;
        btn.addEventListener('click',deleteAndGet);
        page_btns.appendChild(btn);
        //buttons.appendChild(page_btns);
    }
}
function createSearchedBtns(item = []){
    resetBtns();

    pages = item.length/10;
    for(i=0;i<pages;i++){
        let btn = document.createElement('button');
        btn.className += 'page_btn';
        btn.style.float = 'left';
        btn.innerText = i+1;
        btn.value = i+1;
        btn.addEventListener('click',searchedDeleteAndGet);
        page_btns.appendChild(btn);
        //buttons.appendChild(page_btns);
    }
}

//게시글 검색
function search(){
    let target = document.querySelector('#selectBy');
    let searchText = document.querySelector('#searchText').value;
    
    let otn = target.options[target.selectedIndex].value;
    
    let sendData = {};
    sendData['value'] = otn;
    sendData['text'] = searchText;
    
    axios.post('/cus_pmpc/selectData', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data['result'] == "success"){
                if(res.data['data'] == 'init'){
                    resetTable();
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
    resetTable();
    
    //이후 데이터 출력
    for(i=0;i<10;i++){
        if(item[i]==null)break;
        let title_url = document.createElement('a');
        title_url.href = './cus_pmpc_board.html?'+ item[i].content_order;
        title_url.innerText = item[i].title;

        let tr = document.createElement('tr');
        let td_num = document.createElement('td');
        let td_title = document.createElement('td');
        let td_regist = document.createElement('td');

        tdStyle(td_num,td_title,td_regist);

        tr.className += 'addTr';
        td_num.className +='add_td_num';
        td_title.className +='add_td_title';
        td_regist.className +='add_td_regist';
        td_num.innerText = item[i].content_order;
        td_title.appendChild(title_url);
        td_regist.innerText = item[i].date;
        
        tr.appendChild(td_num);
        tr.appendChild(td_title);
        tr.appendChild(td_regist);
        tbody.appendChild(tr);
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
    
    axios.post('/cus_pmpc/page_num', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    addList(res.data["data"]);
            }
        }
    });
}

//해당 페이지에 로드할 검색된 리스트들(게시글)
function searchedDeleteAndGet(){
    let page_num = this.value;
    let target = document.querySelector('#selectBy');
    let searchText = document.querySelector('#searchText').value;
    
    let otn = target.options[target.selectedIndex].value;
    
    //이전 데이터 삭제
    resetTable();
    
    //이후 데이터 출력 위해 db 호출
    let sendData = {};
    sendData['page_num'] = page_num;
    sendData['value'] = otn;
    sendData['text'] = searchText;
    axios.post('/cus_pmpc/selectData_page_num', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){
                    if(res.data['data']=='init'){
                        resetTable();
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
        let title_url = document.createElement('a');
        title_url.href = './cus_pmpc_board.html?'+ data.content_order;
        title_url.innerText = data.title;

        let tr = document.createElement('tr');
        let td_num = document.createElement('td');
        let td_title = document.createElement('td');
        let td_regist = document.createElement('td');

        tdStyle(td_num,td_title,td_regist);

        tr.className += 'addTr';
        td_num.className +='add_td_num';
        td_title.className +='add_td_title';
        td_regist.className +='add_td_regist';

        td_num.innerText = data.content_order;
        td_title.appendChild(title_url);
        td_regist.innerText = data.date;
        
        tr.appendChild(td_num);
        tr.appendChild(td_title);
        tr.appendChild(td_regist);

        tbody.appendChild(tr);
    });
}

//table 리셋 함수
function resetTable(){
    //이전 데이터 삭제
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    //tr, th 생성
    let tr = document.createElement('tr');
    let th_num = document.createElement('th');
    let th_title = document.createElement('th');
    let th_regist = document.createElement('th');

    th_num.innerText = '번 호';
    th_title.innerText = '제 목';
    th_regist.innerText = '등 록 일';

    th_num.className = 'th_num';
    th_title.className = 'th_title';
    th_regist.className = 'th_regist';

    tr.appendChild(th_num);
    tr.appendChild(th_title);
    tr.appendChild(th_regist);
    tbody.appendChild(tr);
}

//버튼 리셋 함수
function resetBtns(){
    let deleteBtns = document.querySelector('#page_btns');
    while(deleteBtns.hasChildNodes()){
        deleteBtns.removeChild(deleteBtns.firstChild);
    }
    //프론트 확인용 버튼
    let decoBtn = document.createElement('button');
    decoBtn.innerText = 0;
    let deco = document.querySelector('#page_btns');
    deco.appendChild(decoBtn);
}

//table 스타일 함수
function tdStyle(td_num,td_title,td_regist){
    td_num.style.borderRight = '1px solid black';
    td_num.style.width = '10%';
    td_title.style.borderRight = '1px solid black';
    td_title.style.width = '70%';
    td_regist.style.width = '20%';
}

// 엔터키 입력
function pressKey(){
    if(window.event.keyCode == 13){
            search();
    }
}
init();