const postUl = document.querySelector('#postUl');

function init(){

    //추후에 삭제 예정
    resetList();
    // axios.post('/layout/init').then((res)=>{
    //     if(res.status === 200){
    //         if(res.data["result"] == "success"){ 
    //             addList(res.data["data"]);
    //         }
    //     }
       
    // });
}   

function addList(item = []){
    item.forEach(function (data) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.style.float = 'right';
        span.innerText = '자세히 보기';

        li.innerText = data.title;
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



init();