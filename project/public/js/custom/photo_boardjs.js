//para에 게시글 id값 저장
const para = window.location.href.split('?');

//parmas
let currentID;
let list;

function init(){
    axios.get('/photo/select_content_order', {params :{
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

    let img = document.querySelector('.main_photo img');
    let title = document.querySelector('.main_photo_box h3 span');
    let p = document.querySelectorAll('.main_photo_box p span');
    let content = document.querySelector('.photo_content_text');

    if(list == 1){
        //이전 글, 다음 글 모두 없을때
        a1.innerText = '이전 글이 없습니다.';
        a2.innerText = '다음 글이 없습니다.';

        img.src = item[0].PATH + item[0].FILE_NAME;
        title.innerText = item[0].TITLE;
        content.innerText = item[0].CONTENT;
        p[0].innerText = date_format(item[0].DATE);
        p[1].innerText = item[0].PLACE;
    }
    else if(list == 2){
        //이전 글이 없고 다음글만 있을때
        if(item[0].ID == parseInt(para[1])){
            img.src = item[0].PATH + item[0].FILE_NAME;
            title.innerText = item[0].TITLE;
            content.innerText = item[0].CONTENT;

            p[0].innerText = date_format(item[0].DATE);
            p[1].innerText = item[0].PLACE;
            a1.innerText = '이전 글이 없습니다.';

            a2.innerText = item[1].TITLE;
            a2.href = 'photo_board?' + (parseInt(para[1]) + 1);
            a2.addEventListener('mouseover',getCursor);
        }
        //이전 글만 있을때
        else{
            img.src = item[1].PATH + item[1].FILE_NAME;
            title.innerText = item[1].TITLE;
            content.innerText = item[1].CONTENT;

            p[0].innerText = date_format(item[1].DATE);
            p[1].innerText = item[1].PLACE;

            a1.innerText = item[0].TITLE;

            a1.href = 'photo_board?' + (parseInt(para[1]) - 1);
            a1.addEventListener('mouseover',getCursor);

            a2.innerText = '다음 글이 없습니다.';
        }
    }
    else if(list==3){
        //이전 글, 다음 글 모두 있을때
        img.src = item[1].PATH + item[1].FILE_NAME;
        title.innerText = item[1].TITLE;
        content.innerText = item[1].CONTENT;

        p[0].innerText = date_format(item[1].DATE);
        p[1].innerText = item[1].PLACE;

        a1.innerText = item[0].TITLE;
        a1.href = 'photo_board?' + (parseInt(para[1]) - 1);
        a1.addEventListener('mouseover',getCursor);
        
        a2.innerText = item[2].TITLE;
        a2.href = 'photo_board?' + (parseInt(para[1]) + 1);
        a2.addEventListener('mouseover',getCursor);
    }
}

function getCursor(){
    this.style.cursor = 'pointer';
}

function date_format(data){
    let date;
    date = data.slice(0,10);
    return date;
}

init();


