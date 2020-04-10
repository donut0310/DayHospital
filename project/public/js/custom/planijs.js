
const a1 = document.querySelector('#week');
const a2 = document.querySelector('#year');
function init(){
    a1.innerText = "주간계획표.pdf";
    a2.innerText = "연간계획표.pdf";
    a1.href = '/assets/save/plan/week.pdf';
    a2.href = '/assets/save/plan/year.pdf';
}

init();