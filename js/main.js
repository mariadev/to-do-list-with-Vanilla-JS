'use strict';
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const buttonReset = document.querySelector('.button-reset');
const buttonSelect = document.querySelector('.button-select');
const buttonDeselect = document.querySelector('.button-deselect');
const items = JSON.parse(localStorage.getItem('items')) || [];


function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
    <li class='li-list'>
        <input class='li-input' type='checkbox' data-index=${i} id='item${i}' ${plate.done ? 'checked' : ''} />
        <label for='item${i}'>${plate.text}</label>
    </li>
    `;
  }).join('');
}
function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

//my functions
function resetStorage(){
  console.log('hola');
  const liListAll= document.querySelectorAll('.li-list');
  for (let i = 0; i < liListAll.length; i++) {
    itemsList.removeChild(liListAll[i]);
  }
  localStorage.clear();
}


function select (){
  for (let i = 0; i <  items.length; i++) {
    items[i].done= true;
  }
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}
function deselect (){
  for (let i = 0; i <  items.length; i++) {
    items[i].done= false;
  }
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
buttonReset.addEventListener('click',resetStorage);
buttonSelect.addEventListener('click',select);
buttonDeselect.addEventListener('click',deselect);
populateList(items, itemsList);
