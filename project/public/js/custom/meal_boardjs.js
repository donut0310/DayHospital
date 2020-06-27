//para에 게시글 id값 저장
var para = window.location.href.split('?');

//parmas
var pcCurrentID;
var mobileCurrentID;
var list;

function init(){
    axios.get('/meal/select_content_order', {params :{
        id : para[1]
    }
    }).then(function (res){
        if(res.status === 200){
            if(res.data['result'] == "success"){ 
                initShowPC(res.data['data']);
                initShowMobile(res.data['data']);
            }
        }
    });
}

function initShowPC(item = []){
    list = item.length;
    
    var a1 = document.querySelector('.pabBefore a');
    var a2 = document.querySelector('.pabNext a');    
    
    var pabNum = document.querySelector('.pabNum');
    var pabTitle = document.querySelector('.pabTitle');
    var pabDate = document.querySelector('.pabDate');

    var pabText = document.querySelector('.pabText');
    
    if(list == 1){
        //이전 글, 다음 글 모두 없을때
        a1.innerText = '이전 글이 없습니다.';
        a2.innerText = '다음 글이 없습니다.';

        pcCurrentID = item[0].ID;
        pabNum.innerText = item[0].ID;
        pabTitle.innerText = item[0].TITLE;
        pabDate.innerText = date_format(item[0].DATE);
        pabText.innerText = item[0].CONTENT;

        // download.innerText = item[0].TITLE;
        // download.setAttribute('target','_blank');
        // download.href = './assets/save/meal_file/' + item[0].FILE_NAME;
    }
    else if(list == 2){
        //이전 글이 없고 다음글만 있을때
        if(item[0].ID == parseInt(para[1])){
            pcCurrentID = item[0].ID;
            pabNum.innerText = item[0].ID;
            pabTitle.innerText = item[0].TITLE;
            pabDate.innerText = date_format(item[0].DATE);
            pabText.innerText = item[0].CONTENT;

            // download.innerText = item[0].TITLE;
            // download.setAttribute('target','_blank');
            // download.href = './assets/save/meal_file/' + item[0].FILE_NAME;

            a1.innerText = '이전 글이 없습니다.';

            a2.innerText = item[1].TITLE;
            a2.href = 'meal_board?' + (parseInt(para[1]) + 1);
            a2.addEventListener('mouseover',getCursor);
        }
        //이전 글만 있을때
        else{
            pcCurrentID = item[1].ID;
            pabNum.innerText = item[1].ID;
            pabTitle.innerText = item[1].TITLE;
            pabDate.innerText = date_format(item[1].DATE);
            pabText.innerText = item[1].CONTENT;
            
            // download.innerText = item[1].TITLE;
            // download.setAttribute('target','_blank');
            // download.href = './assets/save/meal_file/' + item[1].FILE_NAME;

            a1.innerText = item[1].TITLE;

            a1.href = 'meal_board?' + (parseInt(para[1]) - 1);
            a1.addEventListener('mouseover',getCursor);

            a2.innerText = '다음 글이 없습니다.';
        }
    }
    else if(list==3){
        //이전 글, 다음 글 모두 있을때
        pcCurrentID = item[1].ID;
        pabNum.innerText = item[1].ID;
        pabTitle.innerText = item[1].TITLE;
        pabDate.innerText = date_format(item[1].DATE);
        pabText.innerText = item[1].CONTENT;

        // download.innerText = item[1].TITLE;
        // download.setAttribute('target','_blank');
        // download.href = './assets/save/meal_file/' + item[1].FILE_NAME;

        a1.innerText = item[0].TITLE;
        a1.href = 'meal_board?' + (parseInt(para[1]) - 1);
        a1.addEventListener('mouseover',getCursor);
        
        a2.innerText = item[2].TITLE;
        a2.href = 'meal_board?' + (parseInt(para[1]) + 1);
        a2.addEventListener('mouseover',getCursor);
    }
    
}

function initShowMobile(item = []){
    list = item.length;
    
    var a1 = document.querySelector('.mobile_pabBefore a');
    var a2 = document.querySelector('.mobile_pabNext a');    
    
    var pabNum = document.querySelector('.mobile_pabNum');
    var pabTitle = document.querySelector('.mobile_pabTitle');
    var pabDate = document.querySelector('.mobile_pabDate');

   // var download = document.querySelector('.download a');
    var pabText = document.querySelector('.mobile_pabText');
    
    if(list == 1){
        //이전 글, 다음 글 모두 없을때
        a1.innerText = '이전 글이 없습니다.';
        a2.innerText = '다음 글이 없습니다.';

        mobileCurrentId = item[0].ID;
        pabNum.innerText = item[0].ID;
        pabTitle.innerText = item[0].TITLE;
        pabDate.innerText = date_format(item[0].DATE);
        pabText.innerText = item[0].CONTENT;

        // download.innerText = item[0].TITLE;
        // download.setAttribute('target','_blank');
        // download.href = './assets/save/meal_file/' + item[0].FILE_NAME;
    }
    else if(list == 2){
        //이전 글이 없고 다음글만 있을때
        if(item[0].ID == parseInt(para[1])){
            mobileCurrentId = item[0].ID;
            pabNum.innerText = item[0].ID;
            pabTitle.innerText = item[0].TITLE;
            pabDate.innerText = date_format(item[0].DATE);
            pabText.innerText = item[0].CONTENT;

            // download.innerText = item[0].TITLE;
            // download.setAttribute('target','_blank');
            // download.href = './assets/save/meal_file/' + item[0].FILE_NAME;

            a1.innerText = '이전 글이 없습니다.';

            a2.innerText = item[1].TITLE;
            a2.href = 'meal_board?' + (parseInt(para[1]) + 1);
            a2.addEventListener('mouseover',getCursor);
        }
        //이전 글만 있을때
        else{
            mobileCurrentId = item[1].ID;
            pabNum.innerText = item[1].ID;
            pabTitle.innerText = item[1].TITLE;
            pabDate.innerText = date_format(item[1].DATE);
            pabText.innerText = item[1].CONTENT;
            
            // download.innerText = item[1].TITLE;
            // download.setAttribute('target','_blank');
            // download.href = './assets/save/meal_file/' + item[1].FILE_NAME;

            a1.innerText = item[1].TITLE;

            a1.href = 'meal_board?' + (parseInt(para[1]) - 1);
            a1.addEventListener('mouseover',getCursor);

            a2.innerText = '다음 글이 없습니다.';
        }
    }
    else if(list==3){
        //이전 글, 다음 글 모두 있을때
        mobileCurrentId = item[1].ID;
        pabNum.innerText = item[1].ID;
        pabTitle.innerText = item[1].TITLE;
        pabDate.innerText = date_format(item[1].DATE);
        pabText.innerText = item[1].CONTENT;

        // download.innerText = item[1].TITLE;
        // download.setAttribute('target','_blank');
        // download.href = './assets/save/meal_file/' + item[1].FILE_NAME;

        a1.innerText = item[0].TITLE;
        a1.href = 'meal_board?' + (parseInt(para[1]) - 1);
        a1.addEventListener('mouseover',getCursor);
        
        a2.innerText = item[2].TITLE;
        a2.href = 'meal_board?' + (parseInt(para[1]) + 1);
        a2.addEventListener('mouseover',getCursor);
    }
    
}

function date_format(data){
    var date;
    date = data.slice(0,10);
    return date;
}

function getCursor(){
    this.style.cursor = 'pointer';
}
init();


