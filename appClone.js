//Select Item 
const alert = document.querySelector(".alert"); 
const form = document.querySelector(".grocery-form"); 
const grocery = document.getElementById("grocery"); 
const submitBtn = document.querySelector(".submit-btn"); 
const container = document.querySelector(".grocery-container"); 
const list = document.querySelector(".grocery-list"); 
const clearBtn = document.querySelector(".clear-btn"); 
// edit flag 
 
let editElement ; 
let editFlag = false; 
let editID = "";  
// clear Button  
clearBtn.addEventListener("click",clearItem)
 
// *********Event Listener******** 
form.addEventListener("submit", addItem); 

// load   
window.addEventListener("DOMContentLoaded",setupItem);


// *** FUNCTION *** 
 
function addItem(e){ 
 e.preventDefault(); 
  
 const value = grocery.value; 
 const id = new Date().getTime().toString(); 
  
 if(value  && !editFlag){ 
  createListItem(id,value);
  container.classList.add("show-container"); 
  // add to localstorage 
  addToLocalStorage(id,value); 
  // set back to default 
  setBackToDefault();

  displayAlert("Item added","success"); 

 }else if(value  && editFlag){ 
   editElement.innerHTML = value; 
   displayAlert("Value Changed", "success");  
  //  edit local storage 
  editLocalStorage(editID,value);
   setBackToDefault();
 
 }else{  

   displayAlert("Please enter Item","danger");

 }

}  
 
function displayAlert(text,action){  
    alert.textContent = text; 
    alert.classList.add(`alert-${action}`); 
     
    setTimeout(() => {
      alert.textContent = ""; 
      alert.classList.remove(`alert-${action}`);
    }, 1000);
}  
 
function clearItem(){ 
  const items = document.querySelectorAll(".grocery-item"); 
  if(items.length > 0){ 
    items.forEach(function(item){ 
    list.removeChild(item); 
    }) 
  } 
  container.classList.remove("show-container"); 
  displayAlert("Item has removed", "success"); 
  // removing from local storage 
  localStorage.removeItem("list"); 
  setBackToDefault() 
}
// ********Function********* 
  //delete btn function 
  function deleteItem(e){ 
  const element = e.currentTarget.parentElement.parentElement; 
  const id = element.dataset.id; 
  list.removeChild(element); 
  if(list.children.length === 0){ 
    container.classList.remove("show-container");
  } 
  displayAlert("item Removed", "Danger"); 
  setBackToDefault(); 
  // Remove from Local storage 
  removeFromLocalStorage(id); 
  } 
   
  // edit btn Function 
  function editItem(e){ 
    const element = e.currentTarget.parentElement.parentElement;  
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;  
    // set Form value  
    grocery.value = editElement.innerHTML;  
     editFlag = true;  
     editID = element.dataset.id; 
    submitBtn.textContent = "Edit"; 

    console.log(element);
  }

// set back deFault 
 function setBackToDefault(){ 
   grocery.value = ""; 
   editFlag = false; 
   editID = ''; 
   submitBtn.textContent = "Submit"
 }
// ******* LOCAL STORAGE****** 
function addToLocalStorage(id,value){ 
 const grocery = {id , value } 
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
 localStorage.setItem("list", JSON.stringify(items));
} 
function editLocalStorage(id,value){ 
 let items = getLocalStorage(); 
 items = items.map(function(item){ 
   if(item.id === id){ 
     item.value = value;
   } 
   return item
 }); 
 localStorage.setItem("list", JSON.stringify(items));
} 
 
function getLocalStorage(){ 
 return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[]; 
}
// *** setup  
 
function setupItem(){ 
  let item = getLocalStorage(); 
  if(item.length > 0){ 
  item.forEach(function(item){ 
    createListItem(item.id,item.value);
  }); 
  container.classList.add("show-container")
  }
}
function createListItem(id,value){ 
  const element = document.createElement("article");  
  // add class 
  element.classList.add("grocery-item"); 
  // add attribute 
  const attr = document.createAttribute("data-id"); 
  attr.value = id; 
   
  // add attribute to element with node 
  element.setAttributeNode(attr);  

  element.innerHTML = `<p class="title">${value}</p>
  <div class="btn-container"> 
    <button type="button" class="edit-btn"> 
    <i class="fas fa-edit"></i>
    </button> 
    <button type="button" class="delete-btn"> 
      <i class="fas fa-trash"></i>
      </button>
  </div>` 
   
  const deleteBtn = element.querySelector(".delete-btn"); 
  const editBtn = element.querySelector(".edit-btn");  
  
   
  deleteBtn.addEventListener("click",deleteItem); 
  editBtn.addEventListener("click",editItem);
  
//  append child 
  list.appendChild(element);  
}