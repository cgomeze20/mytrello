
const crearTarea = document.getElementById('btn');
    crearTarea.addEventListener('click',()=>{
    const tarea = document.getElementById('tareaInput').value
    console.log('clicked');
     if(tarea) addtask(tarea)
     document.getElementById('tareaInput').value = ''
})

const inputTarea = document.getElementById('tareaInput');
inputTarea.addEventListener('keypress',(e)=>{
  if(e.key === 'Enter'){
    const tarea = document.getElementById('tareaInput').value;
    if(tarea) addtask(tarea)
    document.getElementById('tareaInput').value = ''
  }
})



const addtask = (tarea) =>{
    let newRow = document.createElement('div')
    newRow.classList.add('item')
    newRow.setAttribute('draggable','true')
    newRow.addEventListener('dragstart',dragStart)
    newRow.addEventListener('dragend',dragEnd)

    let contenidoTarea = document.createElement('div')
    contenidoTarea.classList.add('contenido')
    contenidoTarea.innerText = tarea;

     let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = "✔";
    trash.addEventListener('click', removeTask);

    newRow.appendChild(contenidoTarea)
    newRow.appendChild(trash)

    let tasks = document.getElementById('task-added')
    tasks.insertBefore(newRow,tasks.childNodes[0])

}

const removeTask = (e)=>{
    let tasks = e.target.parentNode.parentNode;
    let task = e.target.parentNode;
    tasks.removeChild(task)
}

//Drag n Drp
let task

const dragStart = (e) =>{
    // e.target.className += ' hold'
    task = e.target
    console.log('dragStart');
    setTimeout(() => {
        e.target.className = 'invisible'
    }, 0);

}

const dragEnd = (e) =>{
    console.log('dragEnd');
    e.target.className = 'fill'
}

const zones = document.querySelectorAll('.dropzone')

const dragEnter =(e)=>{
    e.preventDefault();
    if(e.target.className === '.column dropzone'){
        e.target.className += ' hovered'
    }
}

const dragOver = (e) => {
    // console.log("OVER");
    e.preventDefault();
}

const dragLeave = (e) => {
    // console.log("LEAVE");
    if(e.target.className === "column dropzone hovered") {
        e.target.className = "column dropzone"
    }
}

const dragDrop = (e) => {
    if(e.target.className === "column dropzone hovered") {
        e.target.className = "column dropzone sombra"
    }
    e.target.append(task)
}

for(const zone of zones) {
    zone.addEventListener('dragenter', dragEnter);
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('dragleave', dragLeave);
    zone.addEventListener('drop', dragDrop);
}

const darkMode = document.getElementById('dark-mode')
darkMode.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme')
    if(document.body.className === 'dark-theme'){
        darkMode.innerHTML = `
      
        <i class="fas fa-sun"></i>
        `
    }else{
        darkMode.innerHTML = `

        <i class="fas fa-moon"></i>
        `
    }
    //Save LocalStorage

    if(document.body.classList.contains("dark-theme")){
        localStorage.setItem("dark-theme","true")
    }else{
        localStorage.setItem("dark-theme","false")
    }

})

//oBTENER mODO ACTUAL
if(localStorage.getItem('dark-theme') === 'true'){
    document.body.classList.add('dark-theme');
    darkMode.innerHTML = `
        <i class="fas fa-sun"></i>
        `
}else{
    document.body.classList.remove("dark-theme");
  darkMode.innerHTML = `
    <i class="fas fa-moon"></i>
  `
}

