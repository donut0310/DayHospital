const addTable = document.querySelector('tbody');

//DB상에 저장된 내용 모두 가져오기
function init(){
    axios.post('/cus_pmpc/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    initShow(res.data["data"]);
            }
        }
    });
}

function initShow(item = []){
    item.forEach(function(data){

        let title_url = document.createElement('a');
        title_url.href = './cus_pmpc_board.html?'+ data.content_order;
        title_url.innerText = data.title;

        let tr = document.createElement('tr');
        let td_num = document.createElement('td');
        let td_title = document.createElement('td');
        let td_regist = document.createElement('td');

        tdStyle(td_num,td_title,td_regist);

        td_num.innerText = data.content_order;
        td_title.appendChild(title_url);
        td_regist.innerText = data.date;
        
        tr.appendChild(td_num);
        tr.appendChild(td_title);
        tr.appendChild(td_regist);

        addTable.appendChild(tr);
    });
    
}

function tdStyle(td_num,td_title,td_regist){
    td_num.style.borderRight = '1px solid black';
    td_num.style.width = '10%';
    td_title.style.borderRight = '1px solid black';
    td_title.style.width = '70%';
    td_regist.style.width = '20%';
}

init();