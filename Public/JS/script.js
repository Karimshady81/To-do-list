// Function to add an item to the list and save it to localStorage
function addItem(item) {
    const newItem = item || document.getElementById("new-item").value;
    
    if(newItem.trim() !== ''){
        const listItem = document.createElement("li");
        listItem.innerHTML = `${newItem} <button onclick="removeItem(this, '${newItem}')">&#128465;</button>`;
        document.getElementById("todo-list").appendChild(listItem); 

        // Only save to localStorage if item was added via user input
        if (!item) {
            saveToLocalStorage(newItem);
        }

        document.getElementById("new-item").value = ''; // Clear input
    }
}

// Function to remove an item from the list and localStorage
function removeItem(button, itemText){
    button.parentElement.remove();
    removeFromLocalStorage(itemText);
}

// Function to remove the item from localStorage
function removeFromLocalStorage(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(i => i !== item); // Remove the item from the array
    localStorage.setItem('items', JSON.stringify(items)); // Update localStorage
}

// Search functionality: filters items based on input
document.getElementById("search").addEventListener('input', function (){
    const searchInput = this.value.toLowerCase();
    const items = document.querySelectorAll("#todo-list li");

    items.forEach(item => {
        if (item.textContent.toLocaleLowerCase().includes(searchInput)){
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

// Event listener for "Enter" key to add items
document.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addItem();
    }
});

// Function to save the item to localStorage
function saveToLocalStorage(item){
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Function to load items from localStorage and display them
function loadFromLocalStorage(){
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => addItem(item));
}

// Load items from localStorage when the page loads
loadFromLocalStorage();

