const postUl = document.querySelector('#postUl');
const photoList = document.querySelectorAll(".photoList img");

//사진 개수
let photoCnt;

function init(){
    showImg();
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
                showImg(res.data["data"]);
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

// 성모사랑 사진 관련 함수
function showImg(item = []){
    photoCnt = item.length;

    for(i=0;i<photoCnt;i++){
        photoList[i].src = item[i].path + item[i].file_name;
    }
    listSlide();
}

function listSlide(){
    for(i=0;i<cnt;i++){

    }
}

init();