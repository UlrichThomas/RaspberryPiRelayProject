'use strict'

const relayGroup = document.querySelectorAll('.relay');
relayGroup.forEach(item => item.addEventListener("click", event => {
    console.log('click');
}));
