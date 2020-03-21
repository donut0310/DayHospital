const ul = document.querySelector('.postlist');

const pmpc_btn = document.querySelector('#iPost_more');
const meal_btn = document.querySelector('#iPost_more');

function init() {
    axios.post('/Daycare/init').then((res) => {
        if (res.status === 200) {
            if (res.data["result"] == "success") {
                initShow(res.data["data"]);
            }
        }
    });
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
    openMsgBox();
}

function initShow(item = []) {
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


init();