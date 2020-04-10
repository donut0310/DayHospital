//para에 게시글 id값 저장
const para = window.location.href.split('?');

//params
let currentID;
let list;

function init(){
    axios.get('/pmpc/select_content_order', {params:{
        id : para[1]
    }
    }).then((res)=>{
        if(res.status === 200){
            if(res.data['result'] == "success"){ 
                initShow(res.data['data']);
            }
        }
    });
}

function initShow(item = []){
    list = item.length;

    let a1 = document.querySelector('.pabBefore a');
    let a2 = document.querySelector('.pabNext a');    

    let pabNum = document.querySelector('.pabNum');
    let pabTitle = document.querySelector('.pabTitle');
    let pabDate = document.querySelector('.pabDate');
    let pabContent = document.querySelector('.pabContent');

    pabNum.innerText = item[0].ID;
    pabTitle.innerText = item[0].TITLE;
    pabDate.innerText = item[0].DATE;
    pabContent.innerText = item[0].CONTENT;

    if(list == 1){
        //이전 글, 다음 글 모두 없을때
        a1.innerText = '이전 글이 없습니다.';
        a2.innerText = '다음 글이 없습니다.';

        currentId = item[0].ID;
        pabNum.innerText = item[0].ID;
        pabTitle.innerText = item[0].TITLE;
        pabDate.innerText = item[0].DATE;
        pabContent.innerText = item[0].CONTENT;
    }
    else if(list == 2){
        //이전 글이 없고 다음글만 있을때
        if(item[0].ID == parseInt(para[1])){
            currentId = item[0].ID;
            pabNum.innerText = item[0].ID;
            pabTitle.innerText = item[0].TITLE;
            pabDate.innerText = item[0].DATE;
            pabContent.innerText = item[0].CONTENT;

            a1.innerText = '이전 글이 없습니다.';

            a2.innerText = item[1].TITLE;
            a2.href = 'pmpc_board?' + (parseInt(para[1]) + 1);
            a2.addEventListener('mouseover',getCursor);
        }
        //이전 글만 있을때
        else{
            currentId = item[1].ID;
            pabNum.innerText = item[1].ID;
            pabTitle.innerText = item[1].TITLE;
            pabDate.innerText = item[1].DATE;
            pabContent.innerText = item[1].CONTENT;
            
            a1.innerText = item[1].TITLE;

            a1.href = 'pmpc_board?' + (parseInt(para[1]) - 1);
            a1.addEventListener('mouseover',getCursor);
            
            a2.innerText = '다음 글이 없습니다.';
        }
    }
    else if(list==3){
        //이전 글, 다음 글 모두 있을때
        currentId = item[1].ID;
        pabNum.innerText = item[1].ID;
        pabTitle.innerText = item[1].TITLE;
        pabDate.innerText = item[1].DATE;
        pabContent.innerText = item[1].CONTENT;

        a1.innerText = item[0].TITLE;
        a1.href = 'pmpc_board?' + (parseInt(para[1]) - 1);
        a1.addEventListener('mouseover',getCursor);
        
        a2.innerText = item[2].TITLE;
        a2.href = 'pmpc_board?' + (parseInt(para[1]) + 1);
        a2.addEventListener('mouseover',getCursor);
    }
}

function getCursor(){
    this.style.cursor = 'pointer';
}

init();


