const anchor = document.getElementById("anchor")
const menuNavs = document.querySelectorAll(".navigation-text[data-scrollto]")
const images = document.querySelectorAll('img')


if (menuNavs.length>0) {
    menuNavs.forEach(menuNav=>{
        menuNav.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuNav = e.target;
        menuNavs.forEach(nav=>{
            nav.classList.remove("current")
        })
        menuNav.classList.add("current")
        if(menuNav.dataset.scrollto && document.querySelector(menuNav.dataset.scrollto)) {
            const scrolltoBlock = document.querySelector(menuNav.dataset.scrollto);
            const scrolltoBlockValue = scrolltoBlock.getBoundingClientRect().top + scrollY;
            window.scrollTo({
                top: scrolltoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}   

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

function handleImg(myImg, observer){
    myImg.forEach(myImgSingle =>{
        if(myImgSingle.intersectionRatio > 0) {
            loadImage(myImgSingle.target)
        }
    })
}

function loadImage(image){
    image.src = image.getAttribute('data');
}

const observer = new IntersectionObserver(handleImg, options);

images.forEach (img => {
    observer.observe(img);

})


anchor.addEventListener('click', scroll)

function scroll () {
    window.scrollTo({top: 0, behavior: "smooth"}) 
}

window.onscroll = reveal
function reveal (){
    if (window.scrollY > document.querySelector('header').offsetHeight-1) {
        anchor.classList.add("active")
    } else {
        anchor.classList.remove("active")
    }
}

//Quest №2
function getDayInfo(date) {
    let dateChange = swap(date.split('.'), 0,1).join('.')
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
    function swap(arr, a, b) {
        let temp = arr[a]
        arr[a] = arr[b]
        arr[b] = temp
        return arr
    }

    const formatDate = new Date(dateChange)
    let dayIndex = days[formatDate.getDay()]
    let weekIndex = Math.ceil(((formatDate.getDate() - 1 - formatDate.getDay())/7))+1
    let monthIndex = months[formatDate.getMonth()]
    let yearIndex = formatDate.getFullYear()

    return `${dayIndex}, ${weekIndex} неделя ${monthIndex}, ${yearIndex} года`
}

console.log(getDayInfo("01.01.2022"))