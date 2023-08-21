//'use strict'

const url = 'http://localhost:3000/activeRelays'

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
    let id = item.id;
    readJsonFile().then(jsonArray => {
        const index = jsonArray.findIndex(loc => loc.id === id);
        console.log(index);
        if(index !== -1){
            jsonArray.splice(index, 1);
            deleteId(id);
        } else {
            console.log("not in");
            writeJsonFile({id});
        }
    });
    item.classList.toggle('on');
}));
