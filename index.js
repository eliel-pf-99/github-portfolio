let menu = document.querySelector('.menu');
const menu_action = () => {
    let toggle = document.querySelector('.toggle');
    let nav_screen = document.querySelector('.screen-nav');
    let body = document.querySelector('body');
    toggle.classList.toggle('open');
    nav_screen.classList.toggle('show');
    body.style.overflowY = body.style.overflowY === 'hidden' ? "scroll" : 'hidden';
    let color = "";
    if(nav_screen.classList.contains('show')){
        color = "#FFF"
    }
    else{
        window.scroll(0,window.scrollY - 1 );
    }
    document.documentElement.style.setProperty('--theme', color);
}
menu.addEventListener('click', menu_action);
document.querySelectorAll('.screen-nav ul li a').forEach(link => link.addEventListener('click', menu_action))

let nav_toggle_color = () => {
    function toggle_color(color){
        document.documentElement.style.setProperty('--theme', color);
    }
    function getBottom(el){
        return el.getBoundingClientRect().bottom;
    }

    function getTop(el){
        return el.getBoundingClientRect().top;
    }
    function run(el, index){
        let title = document.querySelector('.navbar h2');
        let bottom = getBottom(el);
        let top = getTop(el);
        if(bottom > 36 && bottom <= innerHeight){

            if(index % 2 === 0){
                toggle_color("#FFF")

            }
            else{
                toggle_color("#000")
            }
        }
        if(top < 36 && top <= innerHeight){
            title.innerHTML = el.id;
            if(index % 2 === 0){
                toggle_color("#FFF")
            }
            else{
                toggle_color("#000")
            }
        }
    }

    document.querySelectorAll('section').forEach((section, index) => {
        run(section, index);
    })
}
document.addEventListener('scroll', nav_toggle_color)
document.onload = () => nav_toggle_color();

import skills from "./skills.json" assert { type: "json" };
let icons_container_front = document.querySelector('.front .icons_container');
let icons_container_back = document.querySelector('.back .icons_container');
skills.frontend.map(item => {icons_container_front.appendChild(createElement(item.icon, 'black', 70, item.title, item.url))})
skills.backend.map(item => {icons_container_back.appendChild(createElement(item.icon, 'white', 70, item.title, item.url))})
function createElement(icon, color, size, title, url){
    let img = document.createElement('img');
    img.width = size;
    img.height = size;
    img.alt = title;
    if(url === undefined){
        img.src = `https://cdn.simpleicons.org/${icon}/${color}`;
    }
    else{
        img.src = url;
        img.style.filter = "brightness(0) invert(1)"
    }
    return img;
}

function isViewSkill(e){
    let top = e.getBoundingClientRect().top;
    let bottom = e.getBoundingClientRect().bottom;
    if(top < innerHeight - 100 && bottom >= 200){
        e.classList.add('show')
    }
    else{
        e.classList.remove('show')
    }

}
window.addEventListener('scroll', () => {
    isViewSkill(document.querySelector('.front.skill'))
    isViewSkill(document.querySelector('.back.skill'))
});

function submit(){

    function creatObj(name, email, message){
        return {
                "name" : name.value.toString(),
                "email" : email.value.toString(),
                "message" : message.value.toString()
        }
    }

    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let message = document.querySelector('#message');

    let name_check = name.value.toString().trim() === "";
    let email_check = email.value.toString().trim() === "";
    let message_check = message.value.toString().trim() === "";

    if(!(name_check && email_check && message_check)){
        let obj = creatObj(name, email, message);
        fetch("https://portfoliopymail.onrender.com/msg/", {method: "POST",
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }}).then((aws) => {
            document.querySelector('form').classList.add('hidden');
            document.querySelector('#thanks').classList.remove('hidden');
        })
            .catch(() => alert("Ops something wrong!"))
    }
    else{
        if(name_check){
            let lbl = document.querySelector('#lbl_name');
            name.classList.add('error_input');
            lbl.classList.add('error');
            setTimeout(() => {name.classList.remove('error_input');
                lbl.classList.remove('error')}, 2000)
        }
        if(email_check){
            let lbl = document.querySelector('#lbl_email')
            email.classList.add('error_input');
            lbl.classList.add('error');
            setTimeout(() => {email.classList.remove('error_input');
                lbl.classList.remove('error')}, 2000)
        }
        if(message_check){
            let lbl = document.querySelector('#lbl_message')
            message.classList.add('error_input');
            lbl.classList.add('error');
            setTimeout(() => {message.classList.remove('error_input');
                lbl.classList.remove('error')}, 2000)
        }
    }

}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    submit();
})








