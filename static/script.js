//creating event listener for buttons
const relayGroup = document.querySelectorAll('.relay');
relayGroup.forEach(item => item.addEventListener("click", event => {
    //prevent submission
    event.preventDefault();

    // toggles 'on' class so css can do stuff
    item.classList.toggle('on'); 
}));
