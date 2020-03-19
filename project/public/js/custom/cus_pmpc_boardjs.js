//para에 게시글 id값 저장
const para = window.location.href.split('?');

const add = document.querySelector('.pArticleBody');

function init(){
    let sendData = {};
    sendData['content_order'] = para[1];
    axios.post('/cus_pmpc/select_content_order', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data['result'] == "success"){ 
                //window.location.reload();
                initShow(res.data['data']);
            }
        }
    });
}

function initShow(item = []){
    let pabNum = document.querySelector('.pabNum');
    let pabTitle = document.querySelector('.pabTitle');
    let pabDate = document.querySelector('.pabDate');
    let pabContent = document.querySelector('.pabContent');
    
    let a = document.createElement('a');
    a.innerText = item[0].content_order;

    pabNum.appendChild(a);
    pabTitle.innerText = item[0].title;
    pabDate.innerText = item[0].date;
    pabContent.innerText = item[0].content;

    add.appendChild(pabNum);
    add.appendChild(pabTitle);
    add.appendChild(pabDate);
    add.appendChild(pabContent);
}
init();


