//creating event listener for buttons
const relayGroup = document.querySelectorAll('.relay');
relayGroup.forEach(item => item.addEventListener("click", event => {
    //prevent submission
    event.preventDefault();

    // toggles 'on' class so css can do stuff
    item.classList.toggle('on'); 

    const button_id = item.id;
    fetch(`/button_clicked/${button_id}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });
}));
