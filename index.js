// Selecting Input Feilds Buttons and record List
let firstName = document.querySelector(".fName");
let lastName = document.querySelector(".lName");
let studentId = document.querySelector(".studentId");
let emailId = document.querySelector(".emailId");
let contact = document.querySelector(".contact");
let addBtn = document.querySelector(".add");
let list = document.querySelector(".list");

// Array to Store Student Info
let userInfo = [];

// Taking data from localStorage
let userInfoObject = localStorage.getItem("userInfo");
userInfo = JSON.parse(userInfoObject) || [];

// Display stored data on page load
displayInfo()

// Function to add student info
function addTask() {
  // Taking values from input fields
  let firstNameValue = firstName.value.trim();
  let lastNameValue = lastName.value.trim();
  let studentIdValue = studentId.value.trim();
  let emailIdValue = emailId.value.trim();
  let contactValue = contact.value.trim();

  // All fields have values to work this if statement
  if(firstNameValue && lastNameValue &&studentIdValue &&emailIdValue &&contactValue) {
      userInfo.push({
      "FirstNameValue": firstNameValue,
      "LastNameValue": lastNameValue,
      "StudentIdValue" : studentIdValue,
      "EmailIdValue": emailIdValue,
      "ContactValue": contactValue,
    });

    // save Update data to LocalStorage
    saveInfo(userInfo);
    // Refresh displayInfo
    displayInfo();

  } 

  // Making input Fields clear
  firstName.value = "";
  lastName.value = "";
  studentId.value = "";
  emailId.value = "";
  contact.value = "";
}

// Saving student data to local Storage
function saveInfo(data) {
  let storedData = JSON.stringify(data);
  localStorage.setItem("userInfo", storedData);
}

// Function to display Stored student info
function displayInfo() {
  
  userInfo.forEach((user) => {

    // creating mainDiv 
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("listHeader");

    // creating first name span and adding class to it
    let firstNameSpan = document.createElement("span");
    firstNameSpan.classList.add("listItem");
  
    // creating last name span and adding class to it
    let lastNameSpan = document.createElement("span");
    lastNameSpan.classList.add("listItem");
  
    // creating id span and adding class to it
    let idSpan = document.createElement("span");
    idSpan.classList.add("listItem");
  
    // creating email span and adding class to it
    let emailSpan = document.createElement("span");
    emailSpan.classList.add("listItem");
  
    // creating contact span and adding class to it
    let contactSpan = document.createElement("span");
    contactSpan.classList.add("listItem");
    
    // creating edit button and adding class to it
    let editSpan = document.createElement("span");
    editSpan.classList.add("listItem");
    editSpan.classList.add("edit");
  
    // creating delete button and adding class to it
    let deleteSpan = document.createElement("span");
    deleteSpan.classList.add("listItem");
    deleteSpan.classList.add("delete");

    // Adding data to the elements we create
    firstNameSpan.innerHTML = `${user.FirstNameValue}`
    lastNameSpan.innerHTML = `${user.LastNameValue}`;
    idSpan.innerHTML = `${user.StudentIdValue}`;
    emailSpan.innerHTML = `${user.EmailIdValue}`;
    contactSpan.innerHTML = `${user.ContactValue}`;
    editSpan.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>Edit`
    deleteSpan.innerHTML = `<i class="fa-solid fa-trash"></i>Delete`

    // Append elements to mainDiv
    mainDiv.appendChild(firstNameSpan);
    mainDiv.appendChild(lastNameSpan);
    mainDiv.appendChild(idSpan);
    mainDiv.appendChild(emailSpan)
    mainDiv.appendChild(contactSpan);
    mainDiv.appendChild(editSpan);
    mainDiv.appendChild(deleteSpan)
    // Append mainDiv to list
    list.append(mainDiv);
  });
  // Enable delete functionality
  deleteInfo();
  // Enable edit functionality
  editInfo()
}

// Function to edit student info
function editInfo() {
  let editBtns = document.querySelectorAll(".edit");

editBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
          let parentEl = btn.parentElement;
          // Get Student ID
          let studentIdToEdit = parentEl.children[2].innerText; 
          let userToEdit = userInfo.find(user => user.StudentIdValue === studentIdToEdit);

          if (userToEdit) {
              // Giving input vield existing data
              firstName.value = userToEdit.FirstNameValue;
              lastName.value = userToEdit.LastNameValue;
              studentId.value = userToEdit.StudentIdValue;
              emailId.value = userToEdit.EmailIdValue;
              contact.value = userToEdit.ContactValue;

              // Change add button text
              addBtn.innerText = "Update";
              addBtn.removeEventListener("click", addTask);

              function updateTask() {
                // Update user details
                  userToEdit.FirstNameValue = firstName.value.trim();
                  userToEdit.LastNameValue = lastName.value.trim();
                  userToEdit.StudentIdValue = studentId.value.trim();
                  userToEdit.EmailIdValue = emailId.value.trim();
                  userToEdit.ContactValue = contact.value.trim();

                  // save changes
                  saveInfo(userInfo);

                  // Displaying Updated data
                  parentEl.children[0].innerText = userToEdit.FirstNameValue;
                  parentEl.children[1].innerText = userToEdit.LastNameValue;
                  parentEl.children[2].innerText = userToEdit.StudentIdValue;
                  parentEl.children[3].innerText = userToEdit.EmailIdValue;
                  parentEl.children[4].innerText = userToEdit.ContactValue;

                  // Clear Input Fields
                  firstName.value = "";
                  lastName.value = "";
                  studentId.value = "";
                  emailId.value = "";
                  contact.value = "";

                  // Changing text back to add
                  addBtn.innerText = "Add";
                  addBtn.removeEventListener("click", updateTask);
                  addBtn.addEventListener("click", addTask);
              }

              addBtn.addEventListener("click", updateTask);
          }
      });
  });
}


// Function to delete Student Info
function deleteInfo() {
  let deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let parentEl = btn.parentElement;
      let studentIdToDelete = parentEl.children[2].innerText;

      // Filtering out deleted record
      userInfo = userInfo.filter(user => user.StudentIdValue !== studentIdToDelete);

      // Resetting List
      list.innerHTML = `<div class="listHeader">
      <span class="listfName listItem">First Name</span>
      <span class="listlName listItem">Last Name</span>
      <span class="listid listItem">Id</span>
      <span class="listemail listItem">Email</span>
      <span class="listcontact listItem">Contact</span>
      <span class="listedit listItem">Edit</span>
      <span class="listdelete listItem">Delete</span>
      </div>`
      
      // Saving updated data
      saveInfo(userInfo);
      // Refresh Display
      displayInfo();

    });
  });
}
