const ul = document.querySelector('.postlist');

const pmpc_btn = document.querySelector('#iPost_more');
const meal_btn = document.querySelector('#iPost_more');

function init() {
    axios.post('/Daycare/initPostlist').then((res) => {
        if (res.status === 200) {
            if (res.data["result"] == "success") {
                showPostList(res.data["data"]);
            }
        }
    });
    axios.post('/Daycare/initPhoto').then((res) => {
        if (res.status === 200) {
            if (res.data["result"] == "success") {
                showPhoto(res.data["data"]);
            }
        }
    });
    openMsgBox();
}

function showPostList(item = []) {
    item.forEach(function (data) {
        let url = document.createElement('a');
        url.href = '/cus_pmpc_board?' + data.content_order;
        url.innerText = data.title;

        let li = document.createElement('li');
        li.className += 'list';
        li.appendChild(url);
        ul.appendChild(li);
    });
}

function showPhoto(item =[]){
    let cnt = 1;
    item.forEach(function(data){
        resizeImg(data,cnt);
        cnt+=2;
    });
}
function resizeImg(data,cnt) {
    let photozone = document.querySelector('.photozone');
    let photos = photozone.childNodes;

    let img = document.createElement('img');
    img.src = data.path + data.file_name;
    img.width = 195;
    img.height = 120;
    
    photos[cnt].appendChild(img);
}
    
 //메인 페이지 팝업창
function getCookie(name) {
   var Found = false
   var start, end
   var i = 0
   while (i <= document.cookie.length) {
       start = i
       end = start + name.length
       if (document.cookie.substring(start, end) == name) {
           Found = true
           break
       }
       i++
   }
   if (Found == true) {
       start = end + 1
       end = document.cookie.indexOf(";", start)
       if (end < start)
           end = document.cookie.length
       return document.cookie.substring(start, end)
   }
   return ""
}

function openMsgBox() {
    var eventCookie = getCookie("memo");
    if (eventCookie != "no")
        window.open('/popup', 'popup file', 'width=345px,height=722px,top=50,left=150');
}

init();