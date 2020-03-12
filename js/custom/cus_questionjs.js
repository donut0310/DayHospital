//btn event
const submitClicked = document.querySelector('#submitBut');
submitClicked.addEventListener("click", insertContent);

const searchClicked = document.querySelector('#searchBtn');
searchClicked.addEventListener("click",search);

const wri_btn = document.querySelector("#wri_question");
wri_btn.addEventListener('click',wri_modal);

const submit_pw_btn = document.querySelector('#submit_pw');

const okBtn = document.querySelector('#ok');
//
// close btn
const check_close = document.querySelector("#check_close");
const err_close = document.querySelector("#err_close");
const post_close = document.querySelector("#post_close");
const question_close = document.querySelector("#question_close");
//

//dynamic add elements
const totalList = document.querySelector('.pArticleBody');
//const pArticleFooter = document.querySelector('#pArticleFooter');
const page_btns = document.querySelector('#page_btns');
const initData = document.querySelector('#searchText');
//

//Modal
// 게시글 띄우는 모달
const post_modal = document.querySelector('#post_modal');
// 글 쓰기 모달
const modal_question = document.querySelector("#modal_question");
// pw 입력 모달
const check_pw_modal = document.querySelector('#check_pw_modal');
// 경고창 모달
const err_modal = document.querySelector('#err_modal');

//페이지 분리 
const para = window.location.href.split('?');

let pages;
let dbData = [];

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.post('/cus_question/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){
                initShow(res.data['data']);
            }
        }
    });
}

function initShow(item = []){
    dbData = item;
    
    post_modal.style.display = 'none';
    check_pw_modal.style.display = 'none';

    pages = dbData.length/5; //한 페이지당 게시글 5개
    createBtns(pages);
    let cnt = dbData.length - 1;
    //초기 최신글 5개 출력
    for(i=0;i<5;i++){
        if(cnt<i)break;
        let pabNum = document.createElement('div');
        let pabTitle = document.createElement('div');
        let pabDate = document.createElement('div');
        
        listStyle(pabNum, pabTitle, pabDate);
        let aNum = document.createElement('a');
        let aTitle = document.createElement('a');
        let aDate = document.createElement('a');

        aNum.innerText = item[i].CONTENT_ORDER;
        aTitle.innerText = item[i].TITLE;
        aTitle.value = item[i].CONTENT_ORDER;
        aDate.innerText = item[i].DATE;

        //각 게시글마다 클릭시 모달 연결  이벤트 등록
        aTitle.addEventListener('mouseover', cursor);
        aTitle.addEventListener('click',pwModal);
         
        pabNum.appendChild(aNum);
        pabNum.className += 'addPabNum';
        pabTitle.appendChild(aTitle);
        pabTitle.className += 'addPabTitle';
        pabDate.appendChild(aDate);    
        pabDate.className += 'addPabDate';
      
        totalList.appendChild(pabNum);
        totalList.appendChild(pabTitle);
        totalList.appendChild(pabDate);
    }
}

//게시글 mouseover시 pointer 효과
function cursor(){
    this.style.cursor = 'pointer';
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

    let sendData = {};
    sendData['content_order'] = dbData.length + 1;
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
                    showSearched(res.data['data']);                
            }
        }
    });
}

// 검색된 고객정보 출력
function showSearched(item = []){
    for(i=0;i<5;i++){
        var pabNum = document.querySelector('.addPabNum');
        var pabTitle = document.querySelector('.addPabTitle');
        var pabDate = document.querySelector('.addPabDate');
        if(pabNum===null)break;
        totalList.removeChild(pabNum);
        totalList.removeChild(pabTitle);
        totalList.removeChild(pabDate);
    }
    for(i=0;i<5;i++){
        if(item[i]==null)break;
        let pabNum = document.createElement('div');
        let pabTitle = document.createElement('div');
        let pabDate = document.createElement('div');
        
        listStyle(pabNum, pabTitle, pabDate);
        
        let aNum = document.createElement('a');
        let aTitle = document.createElement('a');
        let aDate = document.createElement('a');
       
        aNum.innerText = item[i].CONTENT_ORDER;
        aTitle.innerText = item[i].TITLE;
        aDate.innerText = item[i].DATE;
        
        aTitle.addEventListener('mouseover', cursor);
        aTitle.addEventListener('click',pwModal);

        pabNum.appendChild(aNum);
        pabNum.className += 'addPabNum';
        pabTitle.appendChild(aTitle);
        pabTitle.className += 'addPabTitle';
        pabDate.appendChild(aDate);    
        pabDate.className += 'addPabDate';

        totalList.appendChild(pabNum);
        totalList.appendChild(pabTitle);
        totalList.appendChild(pabDate);
    }
}

//페이지 버튼
function createBtns(cnt){
    // buttons.style.width = '100%';
    // buttons.style.margin = '10 auto';
    // buttons.style.float = 'left';

    //page_btns.style.float = 'left';
    //page_btns.style.marginLeft = '30vw';

    for(i=0;i<cnt;i++){
        let btn = document.createElement('button');
        btn.className += 'page_btn';
        btn.style.float = 'left';
        btn.innerText = i+1;
        btn.value = i+1;
        btn.addEventListener('click',showList);
        page_btns.appendChild(btn);
        //buttons.appendChild(page_btns);
    }

}
//해당 페이지에 로드할 리스트들(게시글)
function showList(){
    initData.value = null;
    let index = this.value;
    //이전 데이터 삭제
    for(i=0;i<5;i++){
        var pabNum = document.querySelector('.addPabNum');
        var pabTitle = document.querySelector('.addPabTitle');
        var pabDate = document.querySelector('.addPabDate');
        if(pabNum===null)break;
        totalList.removeChild(pabNum);
        totalList.removeChild(pabTitle);
        totalList.removeChild(pabDate);
    }
    //이후 데이터 출력
    for(i=(index-1)*5;i<index*5;i++){
        if(dbData[i]==null)break;
        let pabNum = document.createElement('div');
        let pabTitle = document.createElement('div');
        let pabDate = document.createElement('div');
        
        listStyle(pabNum, pabTitle, pabDate);
        
        let aNum = document.createElement('a');
        let aTitle = document.createElement('a');
        let aDate = document.createElement('a');
        
        aNum.innerText = dbData[i].CONTENT_ORDER;
        aTitle.innerText = dbData[i].TITLE;
        aDate.innerText = dbData[i].DATE;

        aTitle.addEventListener('mouseover', cursor);
        aTitle.addEventListener('click',pwModal);

        pabNum.appendChild(aNum);
        pabNum.className += 'addPabNum';
        pabTitle.appendChild(aTitle);
        pabTitle.className += 'addPabTitle';
        pabDate.appendChild(aDate);    
        pabDate.className += 'addPabDate';

        totalList.appendChild(pabNum);
        totalList.appendChild(pabTitle);
        totalList.appendChild(pabDate);
    }
}

//해당 게시글 내용 출력
function showContent(){
    post_modal.style.display = 'block';
    let len = dbData.length;
    let modal_content = document.querySelector('#post_modal_content');
    modal_content.style.height = "50%";
    
    let a = document.createElement('a');
    a.className = 'addContent';
    a.innerText = dbData[len - order].CONTENT;
    let modal = document.querySelector('#inputData');
    modal.appendChild(a);
}

// 엔터키 입력
function pressKey(){
    if(window.event.keyCode == 13){
            search();
    }
}

//modal control functions
 function wri_modal(){
    modal_question.style.display = 'block';
 }

 window.onclick = function(event) {
    let reset_pw = document.querySelector('#inputPw'); 

    if (event.target == modal_question) {
       modal_question.style.display = "none";
        }else if(event.target == post_modal){
            post_modal.style.display = "none";
            //이전 div에 추가되었던 데이터 삭제
            let parent = document.querySelector('#inputData');
            let child = document.querySelector('.addContent');
            parent.removeChild(child);
        }else if(event.target == check_pw_modal){
           reset_pw.value = null;
           check_pw_modal.style.display = 'none';
       }else if(event.target == err_modal){
           check_pw_modal.style.display = 'block';
           reset_pw.value = null;
           reset_pw.focus();
           err_modal.style.display = 'none';
       }
 }

check_close.onclick = function(){
    let reset_pw = document.querySelector('#inputPw');
    reset_pw.value = null;
    check_pw_modal.style.display = 'none';
    
}
err_close.onclick = function(){
    let reset_pw = document.querySelector('#inputPw');
    reset_pw.value = null;
    err_modal.style.display = 'none';
}
post_close.onclick = function(){
    //이전 div에 추가되었던 데이터 삭제
    let parent = document.querySelector('#inputData');
    let child = document.querySelector('.addContent');
    parent.removeChild(child);
    post_modal.style.display = "none";
    
}
question_close.onclick = function(){
    modal_question.style.display = 'none';
}

// 해당 게시글 클릭시 간단한 본인 비밀번호 입력
let order; // 해당 게시글 고유 순서

 function checkPw(item = [], pw){ 
    // 비번 일치 시 내용 출력 아니면 경고창 모달
    let reset_pw = document.querySelector('#inputPw');

    if(pw == item[0].USER_PASSWORD){
        showContent();
        reset_pw.value = null;
        check_pw_modal.style.display = 'none';
    }else{
        check_pw_modal.style.display = 'none';
        err_modal.style.display = 'block';
        okBtn.onclick = function(event){
            if(event.target == okBtn){
                err_modal.style.display = 'none';
                check_pw_modal.style.display = 'block';
                reset_pw.value = null;
                reset_pw.focus();
            }
        }
    }
 }

submit_pw_btn.onclick = function(event){
    if(event.target == submit_pw_btn){
        let pw = document.querySelector('#inputPw').value;
        sendData = {};
        sendData['content_order'] = order;

        axios.post('/cus_question/getPw', sendData).then((res)=>{
            if(res.status === 200){
                if(res.data['result'] == "success"){
                        checkPw(res.data['data'], pw);                
                }
            }
        });
    }
}
 function pwModal(){
    check_pw_modal.style.display = 'block';
    order = this.value;
    let input = document.querySelector('#inputPw');
    input.focus();
}
 //

 //동적으로 추가된 데이터 스타일 함수
 function listStyle(pabNum, pabTitle, pabDate){
    pabNum.style.width = "15%";
    pabNum.style.float = "left";
    pabNum.style.textAlign = "center";

    pabTitle.style.width = "65%";
    pabTitle.style.float = "left";
    pabTitle.style.textAlign = "center";

    pabDate.style.width = "20%";
    pabDate.style.float = "left";
    pabDate.style.textAlign = "center";
}
//------------------------------------------
init();
