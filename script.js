let titles = [];
let notes = [];
let titlesTrash = [];
let notesTrash = [];
let titlesArchive = [];
let notesArchive = [];

loadNotes();

function render() {

    document.getElementById('title').value = '';
    document.getElementById('note').value = '';

    let notelist = document.getElementById('noteList');
    notelist.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];

        notelist.innerHTML += htmlHome(i, title, note);
    }
}


function renderTrash() {

    let trashlist = document.getElementById('trashList');
    trashlist.innerHTML = '';

    for (let i = 0; i < titlesTrash.length; i++) {
        const title = titlesTrash[i];
        const note = notesTrash[i];

        trashlist.innerHTML += htmlTrash(i, title, note);
    }
}


function renderArchive() {

    let archivelist = document.getElementById('archiveList');
    archivelist.innerHTML = '';

    for (let i = 0; i < titlesArchive.length; i++) {
        const title = titlesArchive[i];
        const note = notesArchive[i];

        archivelist.innerHTML += htmlArchive(i, title, note);
    }
}


function createNote() {

    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (document.getElementById('note').value.length && document.getElementById('title').value.length > 0) {

        titles.push(title);
        notes.push(note);

        render();
        saveNote();

    } else {
        alert('Please fill out all Fields!')
    }
}


function noteToTrash(i) {
    const title = titles[i];
    const note = notes[i];

    titlesTrash.push(title);
    notesTrash.push(note);

    titles.splice(i, 1);
    notes.splice(i, 1);


    render();
    saveNote();
}


function noteToArchive(i) {
    const title = titles[i];
    const note = notes[i];

    titlesArchive.push(title);
    notesArchive.push(note);

    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    saveNote();
}


function trashToArchive(i) {
    const title = titlesTrash[i];
    const note = notesTrash[i];

    titlesArchive.push(title);
    notesArchive.push(note);

    titlesTrash.splice(i, 1);
    notesTrash.splice(i, 1);

    renderTrash();
    saveNote();
}


function archiveToTrash(i) {
    const title = titlesArchive[i];
    const note = notesArchive[i];

    titlesTrash.push(title);
    notesTrash.push(note);

    titlesArchive.splice(i, 1);
    notesArchive.splice(i, 1);

    renderArchive();
    saveNote();
}


function archiveResend(i) {
    const title = titlesArchive[i];
    const note = notesArchive[i];

    titles.push(title);
    notes.push(note);

    titlesArchive.splice(i, 1);
    notesArchive.splice(i, 1);

    renderArchive();
    saveNote();
}


function saveNote() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
    let titlesTrashAsText = JSON.stringify(titlesTrash);
    localStorage.setItem('titlesTrash', titlesTrashAsText);
    let notesTrashAsText = JSON.stringify(notesTrash);
    localStorage.setItem('notesTrash', notesTrashAsText);
    let titlesArchiveAsText = JSON.stringify(titlesArchive);
    localStorage.setItem('titlesArchive', titlesArchiveAsText);
    let notesArchiveAsText = JSON.stringify(notesArchive);
    localStorage.setItem('notesArchive', notesArchiveAsText);
}

/*
function loadNotes() {

    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');

    let titlesTrashAsText = localStorage.getItem('titlesTrash');
    let notesTrashAsText = localStorage.getItem('notesTrash');

    let titlesArchiveAsText = localStorage.getItem('titlesArchive');
    let notesArchiveAsText = localStorage.getItem('notesArchive');


    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }

    if (titlesTrashAsText && notesTrashAsText) {
        titlesTrash = JSON.parse(titlesTrashAsText);
        notesTrash = JSON.parse(notesTrashAsText);
    }

    if (titlesArchiveAsText && notesArchiveAsText) {
        titlesArchive = JSON.parse(titlesArchiveAsText);
        notesArchive = JSON.parse(notesArchiveAsText);
    }
}
*/

/* short Version */

function loadNotes() {
    loadAllNotes('titles', 'notes');
    loadAllNotes('titlesTrash', 'notesTrash');
    loadAllNotes('titlesArchive', 'notesArchive');
}

function loadAllNotes(titlesKey, notesKey) {

    let tmp_titles = localStorage.getItem(titlesKey);
    let tmp_notes = localStorage.getItem(notesKey);

    if (tmp_titles && tmp_notes && titlesKey == "titles") {
        titles = JSON.parse(tmp_titles);
        notes = JSON.parse(tmp_notes);
    }

    if (tmp_titles && tmp_notes && titlesKey == "titlesTrash") {
        titlesTrash = JSON.parse(tmp_titles);
        notesTrash = JSON.parse(tmp_notes);
    }

    if (tmp_titles && tmp_notes && titlesKey == "titlesArchive") {
        titlesArchive = JSON.parse(tmp_titles);
        notesArchive = JSON.parse(tmp_notes);
    }
}


function deleteNote(i) {

    titlesTrash.splice(i, 1)
    notesTrash.splice(i, 1)

    saveNote();
    renderTrash();

}


function deleteAll() {

    titlesTrash = []
    notesTrash = []

    saveNote();
    renderTrash();
}


function resendNote(i) {
    const title = titlesTrash[i];
    const note = notesTrash[i];

    titles.push(title);
    notes.push(note);


    titlesTrash.splice(i, 1)
    notesTrash.splice(i, 1)

    saveNote();
    renderTrash();
}


function editNote(i) {

    document.getElementById(`mytitle${i}`).contentEditable = true;
    document.getElementById(`mynote${i}`).contentEditable = true;

    document.getElementById(`checkNote${i}`).classList.remove('d-none');
    document.getElementById(`editNote${i}`).classList.add('d-none');
}


function checkNote(i) {

    document.getElementById(`mytitle${i}`).contentEditable = false;
    document.getElementById(`mynote${i}`).contentEditable = false;

    document.getElementById(`checkNote${i}`).classList.add('d-none');
    document.getElementById(`editNote${i}`).classList.remove('d-none');

    let title = document.getElementById(`mytitle${i}`).innerHTML;
    let note = document.getElementById(`mynote${i}`).innerHTML;

    titles[i] = title;
    notes[i] = note;

    saveNote();
}


/*  HTML Templates */

function htmlHome(i, title, note) {
    return `
    <div class="note">
        <div class="content">
            <h2 id="mytitle${i}">${title}</h2> 
            <p id="mynote${i}">${note}</p>
        </div>
        <div class="buttons">
            <img onclick="checkNote(${i})" id="checkNote${i}" class="d-none" src="img/icons8-häkchen-30.png">
            <img onclick="editNote(${i})" id="editNote${i}" class="edit" src="img/icons8-bearbeiten-50.png">
            <img onclick="noteToArchive(${i})" class="archive" src="img/icons8-archiv-24.png">
            <img onclick="noteToTrash(${i})" class="trash" src="img/icons8-müll-24.png">
        </div>
    </div>
    `;
}


function htmlTrash(i, title, note) {
    return `
    <div class="note">
        <div class="content">
            <h2 id="mytitle${i}">${title}</h2> 
            <p id="mynote${i}">${note}</p>
        </div>
        <div class="buttons">
            <img onclick="trashToArchive(${i})" class="archive" src="img/icons8-archiv-24.png">
            <img onclick="resendNote(${i})" src="img/icons8-zurück-24.png">
            <img onclick="deleteNote(${i})" class="trash" src="img/icons8-müll-24.png">
        </div>
    </div>
    `;
}


function htmlArchive(i, title, note) {
    return `
    <div class="note">
        <div class="content">
            <h2 id="mytitle${i}">${title}</h2> 
            <p id="mynote${i}">${note}</p>
        </div>
        <div class="buttons">
            <img onclick="archiveResend(${i})" src="img/icons8-zurück-24.png">
            <img onclick="archiveToTrash(${i})" class="trash" src="img/icons8-müll-24.png">
        </div>
    </div>
    `;
}