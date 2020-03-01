let submitClicked = document.querySelector('.submit_btn');
submitClicked.addEventListener("click", insertContent);

let findBtnClicked = document.querySelector('#findBtn');
findBtnClicked.addEventListener("click",findName);

let saveData = document.querySelector('.saveCusData');
let parsedData = document.querySelector('.saveParsedName');

let hideParsedName = document.querySelector('#parsedName');
let hideSavedField = document.querySelector('#savedField');

const CUSTOMDATA = 'dataArr';
let dataArr = [];

//고객 정보  전송
function insertContent(){
    let uname = document.querySelector('#input_name').value
    let upw = document.querySelector('#input_pw').value;
    let ucon = document.querySelector('#content').value;

    let sendData = {};
    sendData['uname'] = uname;
    sendData['upw'] = upw;
    sendData['ucon'] = ucon;

    axios.post('/cus_consulting/insertData', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data == "success"){
                console.log('데이터 전송 성공');
                window.location.reload();
            }
        }
    });
}

//고객 정보 삭제
function deleteDataInDB(recieveData = {}){
    let checkData = {};
    checkData = recieveData;
    axios.post('/cus_consulting/deleteData', checkData).then((res)=>{
        if(res.status === 200){
            if(res.data == "success"){
                console.log('데이터 삭제 성공');
                window.location.reload();
            }
        }
    });
}

//고객 정보 검색
function findName(){
    let uname = document.querySelector('#findText').value
    let sendData = {};
    sendData['uname'] = uname;
    axios.post('/cus_consulting/selectData', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data['result'] == "success"){
                console.log('데이터 전송 성공');
                hideSavedField.style.display = "none";
                console.log(res.data["data"]);

                hideParsedName.style.display = "block";
                res.data["data"].forEach(function(item){
                    parsedName(item);
              });
            }
        }
    });
}

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.post('/cus_consulting/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){
                hideParsedName.style.display = "none";
                hideSavedField.style.display = "block";
                res.data["data"].forEach(function(item){
                    initShow(item);
              });
            }
        }
    });
}

function parsedName(item = {}){
    //li에 추가되어 있는 이전 검색 기록 삭제 기능 추가 할것
    let li = document.createElement("li");
    let span = document.createElement("span");
    let delBtn = document.createElement("button");
    let textBtn = document.createElement("button");
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", function(){
        //삭제한 게시글의 id값을 찾아서 함수 연결하기
        deleteDataInDB(item);
    });
    textBtn.innerText = "내용보기";
    span.innerText = item.USER_NAME;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(textBtn);
    parsedData.appendChild(li);
}

function initShow(item = {}){
    let li = document.createElement("li");
    let span = document.createElement("span");
    let delBtn = document.createElement("button");
    let textBtn = document.createElement("button");
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", function(){
        //삭제한 게시글의 id값을 찾아서 함수 연결하기
        deleteDataInDB(item);
    });
    textBtn.innerText = "내용보기";
    span.innerText = item.USER_NAME;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(textBtn);
    saveData.appendChild(li);
}

function pressKey(){
    if(window.event.keyCode == 13){
            insertContent();
    }
}

init();