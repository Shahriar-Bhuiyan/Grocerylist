// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");  
const form = document.querySelector(".grocery-form");  
const grocery = document.getElementById("grocery");  
const submitBtn = document.querySelector(".submit-btn");  
const container = document.querySelector(".grocery-container");  
const list = document.querySelector(".grocery-list");  
const clearBtn = document.querySelector(".clear-btn"); 
// edit option 
let editElement; 
let editFlag = false; 
let editID = ""; 
// ****** EVENT LISTENERS **********  
// submit form
form.addEventListener("submit",addItem); 
// clear item 
clearBtn.addEventListener("click",clearItem);  
// load item 
window.addEventListener("DOMContentLoaded",setupItem);
// ****** FUNCTIONS **********
function addItem(e){ 
    e.preventDefault(); 
    const value = grocery.value; 
    // if(!value){ 
    //     console.log("true")
    // }  
    
    const id = new Date().getTime().toString(); 
    if(value && !editFlag ){ 
     createListItem(id,value)
        displayAlert("item added to the list","success"); 
         
        // show container 
        container.classList.add("show-container") 
         
        // add to local storage 
        addToLocalStorage(id,value) 
        // set Back to default 
        setBackToDefault()

    } 
    else if(value  && editFlag ){ 
        editElement.innerHTML = value; 
        displayAlert("value Changed", "success"); 
        editLocalStorage(editID,value);
        setBackToDefault()
    } 
    else{ 
         
       displayAlert("please enter item", "danger")
    }
} 
// display alert  
function displayAlert(text,action){ 
   alert.textContent = text; 
   alert.classList.add(`alert-${action}`); 
//    remove alert 
setTimeout(function(){ 
    alert.textContent = ''; 
    alert.classList.remove(`alert-${action}`)
},1000);
}  
// clearItem 
function clearItem(){ 
    const items = document.querySelectorAll(".grocery-item"); 
    if(items.length > 0){ 
     items.forEach(function(item){ 
         list.removeChild(item);
     })
    }; 
    container.classList.remove(".show-container"); 
    displayAlert("emptylist", "danger"); 
    localStorage.removeItem("list")
}  
// delete item
function deleteItem(e){ 
   const element = e.currentTarget.parentElement.parentElement;  
   const id = element.dataset.id; 
   list.removeChild(element); 
   if(list.children.length === 0){ 
       container.classList.remove("show-container");
   } 
   displayAlert('item removed', 'danger');  
   setBackToDefault(); 
//    remove from local strogae  
removeFromLocalStorage(id);
}
function editItem(e){ 
    const element = e.currentTarget.parentElement.parentElement;  
    // set edit item  
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value 
    grocery.value = editElement.innerHTML; 
    editFlag = true; 
    editID = element.dataset.id; 
    submitBtn.textContent = "edit";
}
// set Back to default  
function setBackToDefault(){ 
    console.log("set back to default") 
    grocery.value = ''; 
    editFlag = false; 
    submitBtn.textContent = "submit"; 
    editID = '';
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){ 
    const grocery = {id,value} 
    let items = getLocalStorage(); 
    items.push(grocery);
    localStorage.setItem("list",JSON.stringify(items)); 
} 
function removeFromLocalStorage(id){ 
     let items = getLocalStorage(); 
     items = items.filter(function(item){ 
         if(item.id !== id){ 
             return item    
         }  
     });  
     console.log(items)
     localStorage.setItem("list",JSON.stringify(items));
} 
function editLocalStorage(id,value){ 
 let items = getLocalStorage(); 
 items = items.map(function(item){ 
     if(items.id === id){ 
         item.value = value;
     } 
     return item;
 }) ; 
 localStorage.setItem("list",JSON.stringify(items));
}  
function getLocalStorage(){ 
     return localStorage.getItem("list")?JSON.parse(localStorage.getItem('list')):[]; 
     
}
// localStorage API  
// setItem  
// getItem 
// removeItem  
// save as strings  
localStorage.setItem("orange", JSON.stringify(["item","item2"])); 
const oranges =JSON.parse(localStorage.getItem("orange")) ; 
console.log(oranges); 
localStorage.removeItem("orange")
// ****** SETUP ITEMS **********
function setupItem(){ 
    let items = getLocalStorage(); 
    if(items.length > 0){ 
    items.forEach(function(items){ 
        createListItem(items.id,items.value)
    }) 
    container.classList.add("show-container")
    }
}
function createListItem(id,value){ 
    const element = document.createElement("article"); 
    // add class 
    element.classList.add("grocery-item"); 
    // add id 
    const attr = document.createAttribute("data-id"); 
     
    attr.value = id; 
    element.setAttributeNode(attr); 
     
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container"> 
      <button type="button" class="edit-btn"> 
      <i class="fas fa-edit"></i>
      </button> 
      <button type="button" class="delete-btn"> 
        <i class="fas fa-trash"></i>
        </button>
    </div>`;  
    const deleteBtn = element.querySelector(".delete-btn"); 
    const editBtn = element.querySelector(".edit-btn"); 

    editBtn.addEventListener("click",editItem);
      
    deleteBtn.addEventListener("click",deleteItem);
    // append child 
    list.append(element); 
}