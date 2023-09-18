//url for json server
const url = 'http://localhost:3000/activeRelays'

/**
 * reads JSON file
 * @returns JSON data
 */
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

/**
 * Writes to JSON File
 * @param {*} data the number being passed in
 */
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

/**
 * Deletes the item with the corrosponding id
 * @param {*} id 
 */
async function deleteId(id){
    const response = await fetch(url + '/' + id, {method: 'DELETE'})
    if(!response.ok){
        throw Error('Error' + response.url + response.statusText);
    }
}

//creating event listener for buttons
const relayGroup = document.querySelectorAll('.relay');
relayGroup.forEach(item => item.addEventListener("click", event => {
    //prevent submission
    event.preventDefault();

    //can prob get rid off
    const id = item.id;
    
    //method to update JSON array
    readJsonFile().then(jsonArray => {
        //finds where the target id is in the json array
        const index = jsonArray.findIndex(loc => loc.id === id); 
        
        // if id is in the array
        if(index !== -1){ 
            jsonArray.splice(index, 1);
            deleteId(id);
        } 
        
        // if id is not in the array
        else { 
            writeJsonFile({id});
        }
    });

    // toggles 'on' class so css can do stuff
    item.classList.toggle('on'); 
}));
