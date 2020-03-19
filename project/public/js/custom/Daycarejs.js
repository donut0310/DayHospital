<<<<<<< HEAD:project/public/js/custom/Daycarejs.js
const ul = document.querySelector('.postlist');

const pmpc_btn = document.querySelector('#iPost_more');
const meal_btn = document.querySelector('#iPost_more');

function init(){
    axios.post('/Daycare/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    initShow(res.data["data"]);
            }
        }
    });
}

function initShow(item = []){
    item.forEach(function(data){
        let url = document.createElement('a');
        url.href = '../../html/pmpc/cus_pmpc_board.html?' + data.content_order;
        url.innerText = data.title;
        
        let li = document.createElement('li');
        li.className += 'list';
        li.appendChild(url);
        ul.appendChild(li);
    });
}


=======
const ul = document.querySelector('.postlist');

const pmpc_btn = document.querySelector('#iPost_more');
const meal_btn = document.querySelector('#iPost_more');

function init(){
    axios.post('/Daycare/init').then((res)=>{
        if(res.status === 200){
            if(res.data["result"] == "success"){ 
                    initShow(res.data["data"]);
            }
        }
    });
}

function initShow(item = []){
    item.forEach(function(data){
        let url = document.createElement('a');
        url.href = '../../html/pmpc/cus_pmpc_board.html?' + data.content_order;
        url.innerText = data.title;
        
        let li = document.createElement('li');
        li.className += 'list';
        li.appendChild(url);
        ul.appendChild(li);
    });
}


>>>>>>> a89133af6e8e3eb9a12d00aaf4deb029fd402ae9:js/custom/Daycarejs.js
init();