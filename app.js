const clear=document.querySelector('.clear');
const date=document.getElementById('date');
const input=document.getElementById('input');
const list=document.getElementById('list');
const Check="fa-check-circle";
const Uncheck='fa-circle-thin';
const Linethrough='lineThrough';
let List,id;
//get item from localStorage
let data=localStorage.getItem("TODO");
if(data){
  List=JSON.parse(data);
  id=List.length;
  loadList(List);
}
else
{
  List=[];
  id=0;
}
// function to load the page
function loadList(array){
  array.forEach(function(item){
    addtodo(item.name,item.id,item.done,item.trash);
  })
}
// function to clear the ToDo List
clear.addEventListener("click",function(){
  localStorage.clear();
  location.reload();//to reload the current document
});
// Set the date
const options={ weekday: 'long', month: 'short', day: 'numeric'};
const today=new Date();
date.innerHTML=today.toLocaleDateString('en-US',options);
// Create A add To-Do Function
function addtodo(toDo,id,done,trash){
  if(trash){return;}
  const Done=done?Check:Uncheck;
  const Line=done?Linethrough:"";
  const item=`<li class='item'>
                 <i class="fa ${Done} co" job="complete" id="${id}"></i>
                 <p class="text ${Line}">${toDo}</p>
                 <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
              </li>`;
const position="beforeend";
list.insertAdjacentHTML(position,item);
}
// Function when the enter key is pressed
document.addEventListener("keyup",function(even){
   if(event.keyCode==13)
   {
     const toDo=input.value;
     if(toDo){
       addtodo(toDo,id,false,false);
       List.push({
         name:toDo,
         id:id,
         done:false,
         trash:false
       });
         localStorage.setItem("TODO",JSON.stringify(List));
       id++;
     }
     input.value="";
   }
});
// Function when the user clicks complete
function completeToDo(element){
  element.classList.toggle(Check);
  element.classList.toggle(Uncheck);
  element.parentNode.querySelector(".text").classList.toggle(Linethrough);
  List[element.id].done=  List[element.id].done?false:true;
}
// Function when the user clicks delete
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  List[element.id].trash=true;
}
// Function to target the element dynamically
list.addEventListener("click",function(event){
  const element=event.target;
  const elementJob=element.attributes.job.value;
  if(elementJob=="complete")
  {
    completeToDo(element);
  }
  else if(elementJob=="delete")
  {
    removeToDo(element);
  }
  localStorage.setItem("TODO",JSON.stringify(List));
});
