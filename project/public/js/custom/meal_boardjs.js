//para에 게시글 id값 저장
const para = window.location.href.split('?');

//이전글 다음글 링크
const pabBefore = document.querySelector('.pabBefore span');

const pabNext = document.querySelector('.pabNext span');

//parmas
let currentID;
let list;

function init(){
    let sendData = {};
    sendData['id'] = para[1];
    axios.post('/meal/select_content_order', sendData).then((res)=>{
        if(res.status === 200){
            if(res.data['result'] == "success"){ 
                initShow(res.data['data']);
            }
        }
    });
}

function initShow(item = []){
    console.log(item);

    list = item.length;
    let a1 = document.createElement('a');
    let a2= document.createElement('a');    
    
    let pabNum = document.querySelector('.pabNum');
    let pabTitle = document.querySelector('.pabTitle');
    let pabDate = document.querySelector('.pabDate');
    let pabContent = document.querySelector('.pabContent');
    
    if(list == 1){
        //이전 글, 다음 글 모두 없을때
        pabBefore.innerText = '이전 글이 없습니다.';
        pabNext.innerText = '다음 글이 없습니다.';

        currentId = item[0].ID;
        pabNum.innerText = item[0].ID;
        pabTitle.innerText = item[0].TITLE;
        pabDate.innerText = item[0].DATE;
        pabContent.innerText = item[0].CONTENT;
    }
    else if(list == 2){
        //이전 글이 없고 다음글만 있을때
        if(item[0].ID == parseInt(para[1])){
            pabBefore.innerText = '이전 글이 없습니다.';
            
            pabNext.innerText = item[1].TITLE;
            a2.href = 'meal_board?' + parseInt(para[1]) + 1;
            pabNext.appendChild(a2);    
            pabNext.addEventListener('mouseover',getCursor);
        }
        //이전 글만 있을때
        else{
            pabBefore.innerText = item[0].TITLE;
            a1.href = 'meal_board?' + parseInt(para[1]) - 1;
            pabBefore.appendChild('a');
            pabBefore.addEventListener('mouseover',getCursor);

            pabNext.innerText = '다음 글이 없습니다.';
        }
    }
    else{
        //이전 글, 다음 글 모두 있을때
        currentId = item[1].ID;
        pabNum.innerText = item[1].ID;
        pabTitle.innerText = item[1].TITLE;
        pabDate.innerText = item[1].DATE;
        pabContent.innerText = item[1].CONTENT;
    
        pabBefore.innerText = item[0].TITLE;
        a1.href = 'meal_board?' + parseInt(para[1]) - 1;

        pabNext.innerText = item[2].TITLE;
        a2.href = 'meal_board?' + parseInt(para[1]) + 1;

        pabBefore.appendChild(a1);
        pabNext.appendChild(a2);

        pabBefore.addEventListener('mouseover',getCursor);
        pabNext.addEventListener('mouseover',getCursor);

    }
    
}

function getCursor(){
    this.style.cursor = 'pointer';
}
init();


