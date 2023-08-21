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
//add event for when button gets pressed
const relayGroup = document.querySelectorAll('.relay');
relayGroup.forEach(item => item.addEventListener("click", event => {
    event.preventDefault();
    let id = item.id;
    readJsonFile().then(jsonArray => {
        const index = jsonArray.indexOf(id);
        if(index !== -1){
            jsonArray.splice(index, 1);
        } else {
            jsonArray.push(id);
        }
        writeJsonFile([id]);
    });
}));
