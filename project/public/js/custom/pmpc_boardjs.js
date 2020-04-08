//para에 게시글 id값 저장
const para = window.location.href.split('?');

function init(){
    let sendData = {};
    sendData['id'] = para[1];
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

    pabNum.innerText = item[0].ID;
    pabTitle.innerText = item[0].TITLE;
    pabDate.innerText = item[0].DATE;
    pabContent.innerText = item[0].CONTENT;
}
init();


