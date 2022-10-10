let titles = []
let notes = []

function init() {
    render();
    loadNotes();
}

function render() {
    document.getElementById('noteList').innerHTML = '';

}

function createNote() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (document.getElementById('note').value.length && document.getElementById('title').value.length > 0) {

        titles.push(title);
        notes.push(note);

        showNotes(title, note);
        document.getElementById('title').value = '';
        document.getElementById('note').value = '';
        // title.innerHTML = '';
        // note.innerHTML = '';

        saveNote();

    } else if (document.getElementById('note').value.length == 0) {
        alert('Please fill out both inputs!');
    } else if (document.getElementById('title').value.length == 0) {
        alert('Please fill out both inputs!');
    }
}


function showNotes(title, note) {
    document.getElementById('noteList').innerHTML += /*html*/`
         <div class="note">
             <h2>${title}</h2> 
            <p>${note}</p>
        </div>`;
}

function saveNote() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);

    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
}

function loadNotes() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}

