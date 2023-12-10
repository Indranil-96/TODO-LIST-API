
let tasks=[];
const tasklist=document.getElementById('list');
const addtask=document.getElementById('add');
const taskcounter=document.getElementById('task-counter');


function fetchtodos(){
    // Get request
fetch('https://jsonplaceholder.typicode.com/todos') // returns a promise
    .then(function(response){
        console.log(response);
        return response.json() // Json return another promise that will give us the data
            .then(function(data){ // again we are using .then() on returned data of json
                console.log(data); // now we will get the actual data of 200 objects
                tasks=data.slice(0,10); // Taking only 10 items
                renderList();
            })
            .catch(function(error){
                console.log(error);
            })
})
}

function addtask2DOM(task){
let li=document.createElement('li');
li.innerHTML=`
<input type="checkbox" id="${task.id}" ${task.completed ? 'checked' :' '} class="custom-checkbox">
<label for="${task.id}">${task.title}</label>
<img src="Icon/trash.svg" class="delete" id="${task.id}">
`

tasklist.append(li);
}

console.log("Code is Running Success-Fully");

function renderList(){
    tasklist.innerHTML='';

    for(let i=0;i<tasks.length;i++){
        addtask2DOM(tasks[i]);
    }
                                                                                                                                                                                                      
}

function toggleTask(taskID){
const newtasks=tasks.filter(function(task){
        return task.id == taskID;
    });

    if(newtasks.length>0){
        const currentTask=newtasks[0];

        currentTask.completed= !currentTask.completed;
        renderList();
        showNotification("Task Toggled SuccessFully");
        return;
    }else{
    showNotification("Task can not be Toggled ");
    }
}

function deleteTask(taskID){
    let newtasks=tasks.filter(function(task){
        return task.id!=taskID;
    })
    console.log(newtasks);
    tasks=newtasks;
    renderList()
    showNotification("Task deleted successfully");
}

function addTask(task) {
if(task){
    tasks.push(task);
    renderList();
    showNotification('Task added SuccessFully');
    return;
}
else{
    showNotification('Task Can not be added');
}
}

function showNotification(text){
    alert(text);
}

function handeledInput(e){
    
    if(e.key=='Enter'){ // .key attribute is used to fetch the pressed key.
        const text=e.target.value; // target.value is used to fetch the value from event e.
        // console.log(text);
        if(!text){
            showNotification('Task Can not be empty ');
            return;
        }

        const task={
            title: text,
            id: Date.now().toString(),
            completed: false
        }

        e.target.value=' ';
        addTask(task);
    }

}

function handleClick(event){
    const target=event.target; // to fetch the target element from the event.
    if(target.className=='delete'){
        const taskid=target.id; // use to fetch data-id from html attribute.
        console.log(taskid);
        deleteTask(taskid); 
    }
    else if(target.className=='custom-checkbox'){
        const taskid=target.id;
        toggleTask(taskid);
    }
}

function initializeApp(){
    fetchtodos();
    addtask.addEventListener('keyup',handeledInput); 
    document.addEventListener('click',handleClick);
}
initializeApp();