'use strict'

async function readJsonFile(){
    try{
        const response = await fetch('activeRelays.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error reading JSON file: ", error);
        return [];
    }
}

async function writeJsonFile(data){
    try{
        const response = await fetch('activeRelays.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'applications/json'
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
    
    if(item.classList.contains("on")){
        item.classList.remove("on");
        readJsonFile().then(jsonArray => {
            console.log('Orginal JSON array: ', jsonArray);
            const id = item.id;
            jsonArray = jsonArray.filter(item => item !== id);
            writeJsonFile(jsonArray);
        })
    }else{
        item.classList.add("on");
        readJsonFile().then(jsonArray => {
            console.log('Orginal JSON array: ', jsonArray);
            const id = item.id;
            jsonArray.push(id);
            writeJsonFile(jsonArray);
        })
    }
}));
