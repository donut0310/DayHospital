const addTable = document.querySelector('.t_body');
const writeBtnClicked = document.querySelector('#writeBtn');
writeBtnClicked.addEventListener("click",textField)

let modal_div = document.querySelector('#modal');

//db상에 모든 데이터 저장해 놓을 배열
let dbData = [];

//DB상에 저장된 내용 모두 가져오기
function init(){
    modal_div.style.display = 'none';
    modal_div.style.zIndex = 1;
    modal_div.style.width = '30%';
    modal_div.style.height = '30%';
    modal_div.style.margin = 'auto';
    modal_div.style.backgroundColor = 'orange';
    modal_div.style.position = 'absolute';

    axios.post('/adm_pmpc/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    initShow(res.data["data"]);
            }
        }
    });
}

function initShow(item = []){
    dbData = item;
    
    item.forEach(function(data){
  
        let topic_link = document.createElement('a');
        topic_link.href = './board.html?'+data.content_order;
        topic_link.innerText = data.title;

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.innerText = data.content_order;
        td2.appendChild(topic_link);
        td3.innerText = data.date;
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        addTable.appendChild(tr);
    });
    
}

function insertData(){
    let topic = document.querySelector('#pmpc_topic').value;
    let content = document.querySelector('#pmpc_content').value;
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
    sendData['topic'] = topic;
    sendData['content'] = content;
    sendData['date'] = year+'-'+month+'-'+day;

    axios.post('/adm_pmpc/insert', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data == "success"){ 
                window.location.reload();
            }
        }
    });
}

function textField(){
    modal_div.style.display = 'block'; 
    let btn = document.querySelector('#pmpc_btn');
    
    btn.addEventListener("click",function(){
        modal_div.style.display = 'none'; 
        insertData();
    });
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal_div.style.display = "none";
    }
}

init();

