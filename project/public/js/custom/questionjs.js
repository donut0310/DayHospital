const tbody = document.querySelector('.questionTb tbody');
const pageBtns = document.querySelector('.pageBtns');
// btns
const wri_btn = document.querySelector("#wri_question");
wri_btn.addEventListener('mouseover',getCursor);
wri_btn.addEventListener('click',wri_modal);

const submitBut = document.querySelector('#submitBut');
submitBut.addEventListener('mouseover',getCursor);
submitBut.addEventListener('click',insertContent);

const modal_ask_closeBtn = document.querySelector('#modal_ask_closeBtn');
modal_ask_closeBtn.addEventListener('mouseover',getCursor);

const modal_answer_closeBtn = document.querySelector('#modal_answer_closeBtn');
modal_answer_closeBtn.addEventListener('mouseover',getCursor);

const pw_modal_closeBtn = document.querySelector('#pw_modal_closeBtn');
pw_modal_closeBtn.addEventListener('mouseover',getCursor);

const submit_pw = document.querySelector('#submit_pw');

const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener("click",search);

//parmas
let pages;
let postId;
let currentPage;

//modal
const modal_ask = document.querySelector('#modal-ask');
const check_pw_modal = document.querySelector('#check_pw_modal');
const modal_answer = document.querySelector('#modal-answer');
const submit_err_modal = document.querySelector('#submit_err_modal');
//DB상에 저장된 내용 모두 가져오기
function init(){
    resetList();
    axios.post('/cus_question/createBtns').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    createBtns(res.data["data"]);
            }
        }
    });
    axios.post('/cus_question/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){
                addList(res.data['data']);
            }
        }
    });
}

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

        let sendData = {};
        page_num = currentPage.value;
        sendData['page_num'] = page_num;
        
        axios.post('/cus_question/page_num', sendData).then((res)=>{
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

        let sendData = {};
        page_num = currentPage.value;
        sendData['page_num'] = page_num;
        
        axios.post('/cus_question/page_num', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
            }
        }
    });
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
    let sendData = {};
    sendData['page_num'] = page_num;
    
    axios.post('/cus_question/page_num', sendData).then((res)=>{
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
    let sendData = {};
    sendData['page_num'] = page_num;
    sendData['value'] = otn;
    sendData['text'] = searchText;
    axios.post('/cus_question/selectData_page_num', sendData).then((res)=>{
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

//고객 정보 검색
function search(){
    let target = document.querySelector('#selectBy');
    let searchText = document.querySelector('#searchText').value;
    
    let otn = target.options[target.selectedIndex].value;
    
    let sendData = {};
    sendData['value'] = otn;
    sendData['text'] = searchText;
    
    axios.post('/cus_question/selectData', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data['result'] == "success"){
                if(res.data['data'] == 'init'){
                    resetList();
                    init();
                }
                else {
                    showSearchedInit(res.data['data']);
                }                
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
        tdTitle.addEventListener('click',pwModal);

        tbody.appendChild(tr);
    }
}

//게시글 목록 초기화
function resetList(){
    let tbody = document.querySelector('.questionTb tbody');
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
}

//글쓰기 버튼 시에 고객 정보  전송
function insertContent(){
    let uname = document.querySelector('#uname').value;
    let upw = document.querySelector('#upw').value;
    let utitle = document.querySelector('#utitle').value;
    let uphone = document.querySelector('#uphone').value;
    let ucon = document.querySelector('#mod_cont_question').value;
    let date = new Date();
   
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if(month<10){
        month = '0'+month;
    }
    let day = date.getDate();
    if(day<10){
        day = '0'+day;
    }
    if(uname==''||upw==''||utitle==''||uphone==''||ucon==''){
        let submit_err_okBtn = document.querySelector('#submit_err_box button');
        submit_err_modal.style.display = 'block';
        
        submit_err_okBtn.onclick = function(){
            submit_err_modal.style.display = 'none';
            let input;
            if(utitle==''){
                input = document.querySelector('#utitle');
                input.focus();
            }else if(uname==''){
                input = document.querySelector('#uname');
                input.focus();
            }else if(upw==''){
                input = document.querySelector('#upw');
                input.focus();
            }else if(uphone==''){
                input = document.querySelector('#uphone');
                input.focus();
            }else if(ucon==''){                
                input = document.querySelector('#mod_cont_question');
                input.focus();
            }
        }   
    }
    else{
        let sendData = {};
        sendData['uname'] = uname;
        sendData['upw'] = upw;
        sendData['utitle'] = utitle;
        sendData['ucon'] = ucon;
        sendData['uphone'] = uphone;
        sendData['date'] = year+'-'+month+'-'+day;

        axios.post('/cus_question/insertData', sendData).then((res)=>{
            if(res.status === 200){
                if(res.data == "success"){
                    window.location.reload();
                }
            }
        });
    }
}
function addList(item = []){
    item.forEach(function(data){
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDate = document.createElement('td');

        tdId.innerText = data.ID;
        tdTitle.innerText = data.TITLE;
        tdTitle.value = data.ID;
        tdDate.innerText = data.DATE
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        
        tdTitle.addEventListener('mouseover', getCursor);
        tdTitle.addEventListener('click',pwModal);

        tbody.appendChild(tr);
    });
}

function showContent(item = []){
    let title = document.querySelector('#modal-answer .modal_title .modalspan');
    let name = document.querySelector('#modal-answer .modal_name .modalspan');
    let phoneNum = document.querySelector('#modal-answer .modal_num .modalspan');
    let content = document.querySelector('#modal-answer .answer-textarea .modalspan');

    title.innerText = '제목 ' + item[0].TITLE;
    name.innerText = '이름 ' + item[0].USER_NAME;
    phoneNum.innerText = '전화번호 ' + item[0].USER_PHONE;
    content.innerText = item[0].CONTENT;
}

function checkPw(check){ 
    // 비번 일치 시 내용 출력 아니면 경고창 모달
    let reset_pw = document.querySelector('#inputPw');

    if(check == 'correct'){
        reset_pw.value = null;
        check_pw_modal.style.display = 'none';

        let sendData = {};
        sendData['id'] = postId;
        axios.post('/cus_question/getData', sendData).then((res)=>{
            if(res.status === 200){
                if(res.data['result'] == "success"){
                    showContent(res.data['data']);
                }
            }
        });
        modal_answer.style.display = 'block';
    }
    else{
        reset_pw.value = null;
        let changeText = document.querySelector('#check_pw_box span');
        changeText.innerText = "비밀번호 오류";

        let inputPw = document.querySelector('#inputPw');
        inputPw.focus();
    }
}

function pwModal(){
    let changeText = document.querySelector('#check_pw_box span');
    changeText.innerText = '비밀번호 입력';
    check_pw_modal.style.display = 'block';

    postId = this.value;
    let input = document.querySelector('#inputPw');
    input.focus();
}

submit_pw.onclick = function(event){
    if(event.target == submit_pw){
        let pw = document.querySelector('#inputPw').value;
        sendData = {};
        sendData['id'] = postId;
        sendData['pw'] = pw;
        axios.post('/cus_question/getPw', sendData).then((res)=>{
            if(res.status === 200){
                if(res.data['result'] == "success"){
                    checkPw(res.data['data'])
                }
            }
        });
    }
}

// 모달 종료
modal_ask_closeBtn.onclick = function(){
    modal_ask.style.display = 'none';
    
    let utitle = document.querySelector('#utitle');
    let uname = document.querySelector('#uname');
    let upw = document.querySelector('#upw');
    let uphone = document.querySelector('#uphone');
    utitle.value = null;
    uname.value = null;
    upw.value = null;
    uphone.value = null;
    
    let removeContent = document.querySelector('#mod_cont_question');
    removeContent.value = null;
}

modal_answer_closeBtn.onclick = function(){
    modal_answer.style.display = 'none';
}

pw_modal_closeBtn.onclick = function(){
    let reset_pw = document.querySelector('#inputPw');
    reset_pw.value = null;
    check_pw_modal.style.display = 'none';
}

window.onclick = function(event) {
    let reset_pw = document.querySelector('#inputPw'); 

    if (event.target == modal_ask) {
        modal_ask.style.display = "none";
        
        let utitle = document.querySelector('#utitle');
        let uname = document.querySelector('#uname');
        let upw = document.querySelector('#upw');
        let uphone = document.querySelector('#uphone');
        
        utitle.value = null;
        uname.value = null;
        upw.value = null;
        uphone.value = null;
        
        let removeContent = document.querySelector('#mod_cont_question');
        removeContent.value = null;
    }
    else if(event.target == modal_answer){
        modal_answer.style.display = "none";
    }
     else if(event.target == check_pw_modal){
        reset_pw.value = null;
        check_pw_modal.style.display = 'none';
    }
 }

//modal control functions
function wri_modal(){
    modal_ask.style.display = 'block';
    let utitle = document.querySelector('#utitle');
    utitle.focus();
 }

 function getCursor(){
    this.style.cursor = 'pointer';
 }

function pressKey(){
    if(window.event.keyCode == 13){
            search();
    }
}

function pressKey2(){
    if(window.event.keyCode == 13){
        let pw = document.querySelector('#inputPw').value;
        sendData = {};
        sendData['id'] = postId;
        sendData['pw'] = pw;
        axios.post('/cus_question/getPw', sendData).then((res)=>{
            if(res.status === 200){
                if(res.data['result'] == "success"){
                    checkPw(res.data['data'])
                }
            }
        });
    }
}

init();

