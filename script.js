'use strict'

//add event for when button gets pressed
const relayGroup = document.querySelectorAll('.relay');
relayGroup.forEach(item => item.addEventListener("click", event => {
    if(item.classList.contains("on")){
        item.classList.remove("on");
    }else{
        item.classList.add("on");
    }
}));
