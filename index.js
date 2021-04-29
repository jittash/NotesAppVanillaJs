//Display notes stored in local storage
function showNotes() {
    let notesObj;
    let notes = localStorage.getItem("notes");    //"["note1","note2"]"  Stringify Format
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);       //(2)["note1","note2"]
    }

    let html = "";

    notesObj.forEach((element, index) => {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 21rem;">
    <div class="card-body">
      <h4 class="card-title text-decoration-underline">${element.title}</h4>
      <p class="card-text">${element.note}</p>
      <br>
      <h6 class="fw-lighter">Added on ${element.time}</h6>
      <button onclick=deleteNote(${index})
      class="btn btn-danger">Delete
      </button>
    </div>
  </div>`;
    });
    //Populate Notes
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = '<h3 style="text-align: center; color: grey;">Nothing to display</h3>';
    }
}

function addNote() {
    let note = document.getElementById("addNote");
    let title = document.getElementById("addTitle");
    let notesObj;
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let now = new Date();
	let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`;
    let myObj = {
        title: title.value,
        note: note.value,
        time: dateTime
    };
    //Pushing the note entered by user in notesObj Array
    notesObj.push(myObj);
    //Saving the note to local storage in string format
    localStorage.setItem("notes", JSON.stringify(notesObj));
    title.value = "";
    note.value = "";
    showNotes();
}

let btn = document.getElementById("addBtn");
//When User clicks on Add button
btn.addEventListener("click", addNote);
showNotes();

function deleteNote(index) {
    if (confirm('Do you really wish to delete this item?')) {
        let notesStr = localStorage.getItem("notes");
        let notesArray = JSON.parse(notesStr);
        notesArray.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        showNotes();
    }

}

//Function to delete all items
function clearAll() {
    if (localStorage.getItem("notes")) {
        if (confirm("Do you really want to delete all items in list?")) {
            localStorage.clear();
            showNotes();
        }
    }
    else {
        alert("Nothing to delete!")
    }

}

//Search Functionality
let search = document.getElementById("searchBtn");
search.addEventListener("input", function () {
    let inputval = search.value; //Search Query
    //singleNote returns an iterable of noteCard elements
    let singleNote = document.getElementsByClassName("noteCard");
    Array.from(singleNote).forEach(function (element) {
        let cardTxt = element.querySelectorAll("p")[0].innerText;
        let cardText = element.querySelectorAll("h4")[0].innerText;
        //Check whether body of notes matches the search query
        if (cardTxt.includes(inputval) || cardText.includes(inputval)) {
            element.style.display = "block";  
        } 
        else {
            element.style.display = "none";  

        }
    });
});
