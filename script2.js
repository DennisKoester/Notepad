let titles = [];
let notes = [];

function init() {
    loadNotes();
    render();
}

function render() {

    document.getElementById('title').value = '';
    document.getElementById('note').value = '';

    let noteList = document.getElementById('noteList');
    noteList.innerHTML = ''

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];

        noteList.innerHTML += /*html*/ `
        <div class="note">
            <h2>${title}</h2>
            <p>${note}</p>
            <a href="#" onclick="deleteNote(${i})">X</a>
        </div>
        `
    }
}

function createNote() {

    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (document.getElementById('title').value.length && document.getElementById('note').value.length > 0) {

        titles.push(title);
        notes.push(note);

        render();
        saveNote();

    } else {
        alert('Fill out textfields');
    }
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

function deleteNote(position) {

    titles.splice(position, 1);
    notes.splice(position, 1);

    saveNote();
    render();

}