const postUl = document.querySelector('#postUl');
const photoList = document.querySelectorAll('.photoList');
const img = document.querySelector('.photoList img');

//사진 개수
let photoCnt;

let dbImg;
let index = 0;

function init(){
    //추후에 삭제 예정
    resetList();
    axios.post('/layout/postListInit').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                addList(res.data["data"]);
            }
        }
    });
    axios.post('/layout/photoListInit').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                dbImg = (res.data["data"]);
                if(dbImg.length!=0){
                    img.src = dbImg[0].path + dbImg[0].file_name;
                    img.fadeIn(10);
                }
            }
        }
    });
}   

function addList(item = []){
    item.forEach(function (data) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.style.float = 'right';
        span.innerText = '자세히 보기';

        li.innerText = data.TITLE;
        li.appendChild(span);
        postUl.appendChild(li);

        //모달, 페이지 상의 후에 span 태그에 작업 마무리 하기

    });
}
//프론트용 데이터 삭제 용도 함수
function resetList(){
    let resetPostUl = document.querySelector('#postUl');
     //이전 데이터 삭제
     while(resetPostUl.hasChildNodes()){
        resetPostUl.removeChild(resetPostUl.firstChild);
    }
}

setInterval(() => {
    index++;
    if(index==dbImg.length){
        index = 0;
    }
    img.src = dbImg[index].path + dbImg[index].file_name;
}, 2000);



init();