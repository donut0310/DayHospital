const submitClicked = document.querySelector('#submitBut');
submitClicked.addEventListener("click", insertContent);

const searchClicked = document.querySelector('#searchBtn');
searchClicked.addEventListener("click",search);

const totalList = document.querySelector('.pArticleBody');
const pArticleBtns = document.querySelector('#pArticleBtns');
const page_btns = document.querySelector('#page_btns');
const initData = document.querySelector('#searchText');



const para = window.location.href.split('?');

let pages;
let dbData = [];

//DB상에 저장된 내용 모두 가져오기
function init(){
    //console.log(para[1]);
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

    pages = dbData.length/5; //한 페이지당 게시글 5개
    createBtns(pages);
    
    //초기 최신글 5개 출력
    for(i=0;i<5;i++){
        let pabNum = document.createElement('div');
        let pabTitle = document.createElement('div');
        let pabDate = document.createElement('div');
        
        listStyle(pabNum, pabTitle, pabDate);
        let aNum = document.createElement('a');
        let aTitle = document.createElement('a');
        // 페이지 만들어주면 링크 연결하기
        aTitle.href = './question_board?'+item[i].CONTENT_ORDER;
    
        let aDate = document.createElement('a');

        aNum.innerText = item[i].CONTENT_ORDER;
        aTitle.innerText = item[i].TITLE;
        aDate.innerText = item[i].date;

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
 


function createBtns(cnt){
    pArticleBtns.style.width = '100%';
    pArticleBtns.style.margin = '0 auto';
    pArticleBtns.style.float = 'left';

    page_btns.style.float = 'left';
    page_btns.style.marginLeft = '30vw';

    for(i=0;i<cnt;i++){
        let btn = document.createElement('button');
        btn.className += 'page_btn';
        btn.style.float = 'left';
        btn.innerText = i+1;
        btn.value = i+1;
        btn.addEventListener('click',showList);
        page_btns.appendChild(btn);
        pArticleBtns.appendChild(page_btns);
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
        aDate.innerText = item[i].date;
        
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
        aDate.innerText = dbData[i].date;
        
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
// function pressKey(){
//     if(window.event.keyCode == 13){
//             insertContent();
//     }
// }

init();