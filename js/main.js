
var canvas = document.getElementById('line-chart');
canvas.height = '160px';
var LineChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: ['Sun', 'Mon', 'Tues', 'Thur', 'Fri', 'Sat'],
        datasets: [{
            label: "This Week",
            fill: 'false',
            borderWidth: 5,
            borderColor: "#4d8cf4",
            lineTension: .4,
            pointSytle: 'reactangle',
            pointRadius: 0,
            pointHitRadius: 10,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,255,255,.3)",
            pointHoverBorderWidth: 10,
            data: [15, 12, 6, 27, 20, 13, 28]
        }]
    },
    options: {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    max: 35,
                    beginAtZero: true,
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }

            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
                },
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                }
            }]
        }
    }
});

var dateRangeToggle = document.getElementById('date-range-toggle');
var dateRange = document.getElementById('date-range');

dateRangeToggle.addEventListener('click',function(event){
    event.preventDefault();
    dateRange.classList.toggle('show');
})

//Nav Indicator
var indicator = document.getElementsByClassName('indicator')[0];
var links = document.querySelectorAll('.nav-left>ul>li');

for(let i = 0; i < links.length; i++){
    links[i].addEventListener('mouseover',function(event){
        let width = links[i].offsetWidth;
        let startPoint = links[i].offsetLeft;
        indicator.style.left = startPoint+'px';
        indicator.style.width = width+'px';
    })
}

//Typing Animation
var typeSts = document.getElementsByClassName('type-status')[0];
var replyBox = document.getElementsByClassName('reply')[0];
replyBox.addEventListener('keydown',function type(event){
    typeSts.classList.add('show-type');
})
replyBox.onkeyup = function removeType(event){
    setTimeout(() => {
        typeSts.classList.remove('show-type')
    }, 2000);
};

//Tabs
var tabLinks = document.querySelectorAll('.tab-nav > a');
var tabs = document.querySelectorAll('.tab');
window.onload = function tab(){
    tabs[0].classList.add('show-tab');
}
for(let i = 0; i< tabLinks.length; i++){
    tabLinks[i].addEventListener('click',function(event){
        event.preventDefault();
        for(let x = 0; x < tabs.length; x++){
            tabs[x].classList.remove('show-tab');
            tabLinks[x].classList.remove('tab-active');
            if(x == i){
                tabs[i].classList.add('show-tab');
                tabLinks[i].classList.add('tab-active');
            }
        }
    });
};

var removeActivity = document.getElementsByClassName('remove-activity');
var removeNote = document.getElementsByClassName('remove-note');
for(let i = 0; i<removeActivity.length;i++){
    removeActivity[i].onclick = function(event){
        event.preventDefault();
        removeActivity[i].closest('li').classList.add('hide');
    }
}
for(let i = 0; i<removeNote.length;i++){
    removeNote[i].onclick = function(event){
        event.preventDefault();
        removeNote[i].closest('li').classList.add('hide');
    }
}