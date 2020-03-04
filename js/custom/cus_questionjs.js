const submitClicked = document.querySelector('#submitBut');
submitClicked.addEventListener("click", insertContent);

const searchClicked = document.querySelector('#searchBtn');
searchClicked.addEventListener("click",search);

const totalList = document.querySelector('.pArticleBody');
let dbData = [];
let len;
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

//고객 정보 삭제
// function deleteDataInDB(recieveData = {}){
//     let checkData = {};
//     checkData = recieveData;
//     axios.post('/cus_consulting/deleteData', checkData).then((res)=>{
//         if(res.status === 200){
//             if(res.data == "success"){
//                 console.log('데이터 삭제 성공');
//                 window.location.reload();
//             }
//         }
//     });
// }

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

// function parsedName(item = {}){
//     //li에 추가되어 있는 이전 검색 기록 삭제 기능 추가 할것
//     let li = document.createElement("li");
//     let span = document.createElement("span");
//     let delBtn = document.createElement("button");
//     let textBtn = document.createElement("button");
//     delBtn.innerText = "삭제";
//     delBtn.addEventListener("click", function(){
//         //삭제한 게시글의 id값을 찾아서 함수 연결하기
//         deleteDataInDB(item);
//     });
//     textBtn.innerText = "내용보기";
//     span.innerText = item.USER_NAME;
//     li.appendChild(span);
//     li.appendChild(delBtn);
//     li.appendChild(textBtn);
//     parsedData.appendChild(li);
// }

function initShow(item = []){
    dbData = item;
    len = dbData.length;
    item.forEach(function(data){
        let pabNum = document.createElement('div');
        let pabTitle = document.createElement('div');
        let pabDate = document.createElement('div');

        listStyle(pabNum, pabTitle, pabDate);
        let aNum = document.createElement('a');
        let aTitle = document.createElement('a');
        let aDate = document.createElement('a');

        aNum.innerText = data.CONTENT_ORDER;
        aTitle.innerText = data.TITLE;
        aDate.innerText = data.date;

        pabNum.appendChild(aNum);
        pabNum.className += 'addPabNum';
        pabTitle.appendChild(aTitle);
        pabTitle.className += 'addPabTitle';
        pabDate.appendChild(aDate);    
        pabDate.className += 'addPabDate';
      
        totalList.appendChild(pabNum);
        totalList.appendChild(pabTitle);
        totalList.appendChild(pabDate);
    });
    // let li = document.createElement("li");
    // let span = document.createElement("span");
    // let delBtn = document.createElement("button");
    // let textBtn = document.createElement("button");
    //delBtn.innerText = "삭제";
    // delBtn.addEventListener("click", function(){
    //     //삭제한 게시글의 id값을 찾아서 함수 연결하기
    //     deleteDataInDB(item);
    // });
    //textBtn.innerText = "내용보기";
    // span.innerText = item.USER_NAME;
    // li.appendChild(span);
    // li.appendChild(delBtn);
    // li.appendChild(textBtn);
    // saveData.appendChild(li);
}

function showSearched(item = []){
    for(i=0;i<len;i++){
        var pabNum = document.querySelector('.addPabNum');
        var pabTitle = document.querySelector('.addPabTitle');
        var pabDate = document.querySelector('.addPabDate');
        totalList.removeChild(pabNum);
        totalList.removeChild(pabTitle);
        totalList.removeChild(pabDate);
    }
    len = item.length;
    item.forEach(function(data){
        let pabNum = document.createElement('div');
        let pabTitle = document.createElement('div');
        let pabDate = document.createElement('div');
        
        listStyle(pabNum, pabTitle, pabDate);
        
        let aNum = document.createElement('a');
        let aTitle = document.createElement('a');
        let aDate = document.createElement('a');
        
        aNum.innerText = data.CONTENT_ORDER;
        aTitle.innerText = data.TITLE;
        aDate.innerText = data.date;
        
        pabNum.appendChild(aNum);
        pabNum.className += 'addPabNum';
        pabTitle.appendChild(aTitle);
        pabTitle.className += 'addPabTitle';
        pabDate.appendChild(aDate);    
        pabDate.className += 'addPabDate';

        totalList.appendChild(pabNum);
        totalList.appendChild(pabTitle);
        totalList.appendChild(pabDate);
        });
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