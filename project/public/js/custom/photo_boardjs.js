//para에 게시글 id값 저장
var para = window.location.href.split('?');

//parmas
var currentID;
var list;

function init(){
    axios.get('/photo/select_content_order', {params :{
        id : para[1]
    }
    }).then(function (res){
        if(res.status === 200){
            if(res.data['result'] == "success"){ 
                initShow(res.data['data']);
            }
        }
    });
}

function initShow(item = []){
    var list = item.length;
    
    var a1 = document.querySelector('.pabBefore a');
    var a2 = document.querySelector('.pabNext a');    

    var img = document.querySelector('.main_photo img'); //html 
    var title = document.querySelector('#boardTitle');
    //var p = document.querySelectorAll('.main_photo_box p span'); //촬영일자, 촬영장소
    //var content = document.querySelector('.photo_content_text');

    var filename = [];
    var cnt = 0;

    //console.log(list);
    //console.log(item[0]);
    if(list == 1){
        //이전 글, 다음 글 모두 없을때
        a1.innerText = '이전 글이 없습니다.';
        a2.innerText = '다음 글이 없습니다.';
        if (item[0].FILE_NAME.length>33){
            filename = item[0].FILE_NAME.split(",");
            for(let i = 0; i<item[0].FILE_NAME.length;i++){
                if(item[0].FILE_NAME[i]===',') cnt++;
            }
            console.log(cnt);
            for(let i=0;i<cnt+1;i++){
            var x = 0;
            var y = 32;
            createImg(item[0].FILE_NAME.slice(x+33*i,y+33*i));
            }
        }
        else {
            filename[0]=item[0].FILE_NAME;
            img.src = '/assets/uploads/' + filename[0];
        }
        //img.src = '/assets/uploads/' + filename[0];
        
        title.innerText = item[0].TITLE;
        // content.innerText = item[0].CONTENT;
        // p[0].innerText = date_format(item[0].DATE);
        // p[1].innerText = item[0].PLACE;
    }
    else if(list == 2){
        //이전 글이 없고 다음글만 있을때
        if(item[0].ID == parseInt(para[1])){
            if (item[0].FILE_NAME.length>33){
                filename = item[0].FILE_NAME.split(",");
                for(let i = 0; i<item[0].FILE_NAME.length;i++){
                    if(item[0].FILE_NAME[i]===',') cnt++;
                }
                console.log(cnt);
                for(let i=0;i<cnt+1;i++){
                var x = 0;
                var y = 32;
                createImg(item[0].FILE_NAME.slice(x+33*i,y+33*i));
                }
            }
            else {
                filename[0]=item[0].FILE_NAME;
                img.src = '/assets/uploads/' + filename[0];
            }
        
            title.innerText = item[0].TITLE;
            //content.innerText = item[0].CONTENT;

            // p[0].innerText = date_format(item[0].DATE);
            // p[1].innerText = item[0].PLACE;
            a1.innerText = '이전 글이 없습니다.';

            a2.innerText = item[1].TITLE;
            a2.href = 'photo_board?' + (parseInt(para[1]) + 1);
            a2.addEventListener('mouseover',getCursor);
        }
        //이전 글만 있을때
        else{
            if (item[1].FILE_NAME.length>33){
                filename = item[1].FILE_NAME.split(",");
                for(let i = 0; i<item[1].FILE_NAME.length;i++){
                    if(item[1].FILE_NAME[i]===',') cnt++;
                }
                //console.log(cnt);
                for(let i=0;i<cnt+1;i++){
                var x = 0;
                var y = 32;
                createImg(item[1].FILE_NAME.slice(x+33*i,y+33*i));
                }
            }
            else {
                filename[0]=item[1].FILE_NAME;
                img.src = '/assets/uploads/' + filename[0];
            }
            title.innerText = item[1].TITLE;
            //content.innerText = item[1].CONTENT;

            // p[0].innerText = date_format(item[1].DATE);
            // p[1].innerText = item[1].PLACE;

            a1.innerText = item[0].TITLE;

            a1.href = 'photo_board?' + (parseInt(para[1]) - 1);
            a1.addEventListener('mouseover',getCursor);

            a2.innerText = '다음 글이 없습니다.';
        }
    }
    else if(list==3){
        //이전 글, 다음 글 모두 있을때
        if (item[1].FILE_NAME.length>33){
            filename = item[1].FILE_NAME.split(",");
            for(let i = 0; i<item[1].FILE_NAME.length;i++){
                if(item[1].FILE_NAME[i]===',') cnt++;
            }
            console.log(cnt);
            for(let i=0;i<cnt+1;i++){
            var x = 0;
            var y = 32;
            createImg(item[1].FILE_NAME.slice(x+33*i,y+33*i));
            }
        }
        else {
            filename[0]=item[1].FILE_NAME;
            img.src = '/assets/uploads/' + filename[0];
        }
       
        title.innerText = item[1].TITLE;
        //content.innerText = item[1].CONTENT;

        // p[0].innerText = date_format(item[1].DATE);
        // p[1].innerText = item[1].PLACE;

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
    var date;
    date = data.slice(0,10);
    return date;
}

function createImg(text){
    let img = document.createElement('img');
    const main_photo = document.querySelector('.main_photo'); //main_photo div
    console.log(text);
    if(text!==null){
    img.src = '/assets/uploads/'+text;
    main_photo.appendChild(img);
    }
}
init();
