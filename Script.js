const taskList = document.querySelector(".tasksList");
const button = document.querySelector(".taskButton");
const taskText = document.querySelector(".taskObject");
const taskTemplate = `<li  class = "taskItem">
<div class="hideForAlting">
    taskObject
    <button class="deleteTask">
        <ion-icon name="trash-outline" class="taskIcon"></ion-icon>
    </button>
    <button class="altTask">
        <ion-icon name="pencil-outline" class="taskIcon"></ion-icon>
    </button>
</div>
<div class="showForAlting">
    <textarea class="altTaskObject" name="Text" cols="30" rows="1"></textarea>
    <button class="acceptTaskAlting">
        <ion-icon name="checkmark-outline" class="taskIcon"></ion-icon>
    </button>
    
</div>

</li>`

const taskAltTemplate = 0


let  makeTask = (target) => {
    return (event) => {
        taskObject = taskText.value;
        taskText.value = "";
        task = taskTemplate;
        task = task.replace('taskObject', taskObject);
        if (taskObject != "") {
            target.insertAdjacentHTML("beforeend", task);
        }
        
    }
};

let  makeTaskWithEnter = (target) => {
    return (event) => {
        taskObject = taskText.value;
        task = taskTemplate;
        task = task.replace('taskObject', taskObject);
        if (taskObject != "" && event.code == "Enter") {
            event.preventDefault()
            target.insertAdjacentHTML("beforeend", task);
            taskText.value = "";
        }
        
    }
};

let makeFirstTask = () => {
    if (taskText.value != "") {
        taskList.innerHTML = "";
        button.addEventListener("click", makeTask(taskList));
        taskText.addEventListener("keydown", makeTaskWithEnter(taskList))
        makeTask(taskList)();
        button.removeEventListener("click", makeFirstTask)
        taskText.removeEventListener("keydown", makeFirstTaskWithEnter)
    }
}

let makeFirstTaskWithEnter = (event) => {
    if (event.code == "Enter") {
        event.preventDefault()
        makeFirstTask()
        taskText.removeEventListener("keydown", makeFirstTaskWithEnter)
        button.removeEventListener("click", makeFirstTask)
    }
}

// taskList.nextElementSibling
let deleteTask = (event) => {
    event.target.closest(".deleteTask").parentElement.parentElement.remove()
}

let altTask = (event) => {
    let altElement = event.target.closest(".altTask").parentElement.parentElement;
    let hideForAlting = altElement.firstElementChild
    let showForAlting = altElement.lastElementChild
    let acceptButton = showForAlting.lastElementChild
    let altingArea = hideForAlting.nextElementSibling.firstElementChild

    let oldTask = hideForAlting.childNodes[0].data.trim()
    let temp = altElement.innerHTML;
    // altElement.childNodes[0].data = "ssssssssss"
    console.log(acceptButton);
    hideForAlting.style.display = "none"
    showForAlting.style.display = "flex"
    altingArea.value = oldTask


    let altTaskWithEnter = (event) => {
        if(event.code == "Enter") {
            hideForAlting.childNodes[0].data = event.currentTarget.value
            hideForAlting.style.display = "flex"
            showForAlting.style.display = "none"
            altingArea.removeEventListener("keydown",  altTaskWithEnter)
        }
    }

    let altTask = (event) => {

        hideForAlting.childNodes[0].data = altingArea.value
        hideForAlting.style.display = "flex"
        showForAlting.style.display = "none"
        altingArea.removeEventListener("click",  altTask)
    }
    acceptButton.addEventListener("click",  altTask)
    altingArea.addEventListener("keydown",  altTaskWithEnter)
}


taskList.addEventListener("click", altTask)
taskList.addEventListener("click", deleteTask)
button.addEventListener("click", makeFirstTask);
taskText.addEventListener("keydown", makeFirstTaskWithEnter)
