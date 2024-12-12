//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

var taskInput=document.getElementById("main__element-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("task__incomplete-list");//ul of #task__incomplete-list
var completedTasksHolder=document.getElementById("task__completed-list");//completed-tasks

//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    //input (checkbox)
    var checkBox=document.createElement("input");
    //label
    var label=document.createElement("label");
    //input (text)
    var editInput=document.createElement("input");
    //button.edit
    var editButton=document.createElement("button");
    //button.delete
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.className='task__name';
    listItem.className='list-item';

    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task__name";

    editButton.innerText="Edit";
    editButton.className="task__btn-edit";

    deleteButton.className="task__btn-delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

//Edit an existing task.
var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem=this.parentNode;
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".task__btn-edit");
    var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if(containsClass){
        //switch to .editmode
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};

//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.task__btn-edit");
    var deleteButton=taskListItem.querySelector("button.task__btn-delete");
    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to task__btn-delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
