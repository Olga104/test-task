const formGroup = document.querySelector('.form-group');
const addButton = document.querySelector('.form-group__btn');
export const groupList = document.querySelector('.form-group__list');
const contactsList = document.querySelector('.contacts-list__list');
const groupSaveButton = document.querySelector('.form-group__btn-save');
const textEmpty = document.querySelector('.contacts-book__note');
const listGroupDisplay = document.querySelector('.contacts-list');
const popup = document.querySelector('.popup-del');
const popupAgree = document.querySelector('.popup-del__btn-agree');
const popupDisagree = document.querySelector('.popup-del__btn-disagree');
const popupClose = document.querySelector('.popup-del__close');

import { addGroupInContacts } from './addContacts.js'
import { groupManagment } from './openCloseManagment.js'

export default function addGroup() {
  addButton.addEventListener('click', function (e) {
    e.preventDefault();
    addField('');
  });

  groupSaveButton.addEventListener('click', function (e) {
    e.preventDefault();
    saveToLocalStorage();
    displaySavedValues();
  });

  displaySavedValues();
}

export function addField(value) {
  const itemGroup = document.createElement('li');
  itemGroup.classList.add('form-group__item');

  itemGroup.innerHTML = `
      <div class="form-group__category">
        <div class="custom-input">
          <input type="text" class="custom-input__field" placeholder="Введите название" value="${value}">
        </div>
        <button class="form-group__btn-del btn" aria-label="Удалить категорию">
          <svg class="form-group__icon-del" width="16" height="20" viewBox="0 0 16 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path class="form-group__icon-basket" opacity="0.3"
              d="M1.66667 17.3889C1.66667 18.55 2.61667 19.5 3.77778 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66667V17.3889ZM4.26333 9.87333L5.75167 8.385L8 10.6228L10.2378 8.385L11.7261 9.87333L9.48833 12.1111L11.7261 14.3489L10.2378 15.8372L8 13.5994L5.76222 15.8372L4.27389 14.3489L6.51167 12.1111L4.26333 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36111L4.30556 1.55556H0.611111V3.66667H15.3889V1.55556H11.6944Z"
              fill="black" />
          </svg>
        </button>
      </div>
    `
  groupList.append(itemGroup);
  deleteFieldGroup()
}

function deleteFieldGroup() {
  const delButtons = document.querySelectorAll('.form-group__btn-del');

  delButtons.forEach(delButton => {
    delButton.addEventListener('click', function (e) {
      e.preventDefault();
      getPopup(this)
    });
  });
}

function saveToLocalStorage() {
  const groupInputs = formGroup.querySelectorAll('.custom-input__field');
  const groups = [];

  groupInputs.forEach(groupInput => {
    if (groupInput.value) {
      groups.push(groupInput.value);
    }

    if (groupInput.value == '') {
      groupInput.closest('li').remove()
    }
  });

  localStorage.setItem('groups', JSON.stringify(groups));
}

function displaySavedValues() {
  groupManagment.classList.remove('header__management-group--active');

  const savedValues = JSON.parse(localStorage.getItem('groups')) || [];

  contactsList.innerHTML = '';

  savedValues.forEach(value => {
    const item = document.createElement('li');
    item.classList.add('accordion__item');
    item.innerHTML = `
      <button class="accordion__group" type="button">
        <span class="accordion__group-text">${value}</span>
        <svg class="accordion__group-arrow" width="13" height="8" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-arrow"></use>
        </svg>
      </button>
    `
    contactsList.appendChild(item);
  });

  if (contactsList.children.length !== 0) {
    textEmpty.style.display = 'none';
    listGroupDisplay.style.display = 'block';
  } else {
    textEmpty.style.display = 'flex';
    listGroupDisplay.style.display = 'none';
  }

  addGroupInContacts(savedValues);
}

function getPopup(elem) {
  popup.classList.add('popup-del--active')
  groupManagment.classList.remove('header__management-group--active');

  popupClose.addEventListener('click', function (e) {
    e.preventDefault();
    cancelPopup()
  });

  popupAgree.addEventListener('click', function (e) {
    e.preventDefault();
    elem.closest('li').remove();
    cancelPopup()
  });

  popupDisagree.addEventListener('click', function (e) {
    e.preventDefault();
    cancelPopup()
  });
}

function cancelPopup() {
  popup.classList.remove('popup-del--active')
  groupManagment.classList.add('header__management-group--active');
}