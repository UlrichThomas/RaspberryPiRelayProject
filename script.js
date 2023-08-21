//'use strict'

const url = 'http://localhost:3000/activeRelays'

//reads json file
async function readJsonFile(){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error reading JSON file: ", error);
        return [];
    }
}

//adds to db.json
async function writeJsonFile(data){
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        //error handling
        if (response.ok) {
            console.log('JSON file updated successfully');
        } else {
            console.error('Failed to update JSON file: ', response.status, response.statusText);
        }
    } catch (error){
        console.error('Error writing JSON file:', error);
    }
}

//removes from db.json
async function deleteId(id){
    const response = await fetch(url + '/' + id, {method: 'DELETE'})
    if(!response.ok){
        throw Error('Error' + response.url + response.statusText);
    }
}
//add event for when button gets pressed
const relayGroup = document.querySelectorAll('.relay');
relayGroup.forEach(item => item.addEventListener("click", event => {
    event.preventDefault();
    let id = item.id; //prob can rid of
    readJsonFile().then(jsonArray => {
        const index = jsonArray.findIndex(loc => loc.id === id); //finds where the target id is in the json array
        //console.log(index); //uncomment to debug index value
        if(index !== -1){ // if id is in the array
            jsonArray.splice(index, 1);
            deleteId(id);
        } else { // if id is not in the array
            //console.log("not in"); // was used for debugging
            writeJsonFile({id});
        }
    });
    item.classList.toggle('on'); // toggles 'on' class so css can do stuff
}));
