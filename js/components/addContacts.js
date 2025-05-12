const name = document.querySelector('#name');
const phone = document.querySelector('#phone');
const group = document.querySelector('.form-contacts__note');
const btnSelect = document.querySelector('.form-contacts__select');
const formContactsList = document.querySelector('.form-contacts__sublist');
const formContacts = document.querySelector('.form-contacts');
const btnSave = document.querySelector('.form-contacts__btn-save');

import { contactManagment } from './openCloseManagment.js'

export function addGroupInContacts(arr) {
  formContactsList.innerHTML = '';

  arr.forEach(value => {
    const item = document.createElement('li');
    item.classList.add('form-contacts__subitem');
    item.innerHTML = `
      <button class="form-contacts__sublink" type="button">${value}</button>
    `
    formContactsList.append(item)
  });

  selectGroup()
}

function selectGroup() {
  btnSelect.addEventListener('click', function (e) {
    e.preventDefault();
    btnSelect.classList.add('form-contacts__select--active');
    getAllGroup()
  });
}

function getAllGroup() {
  const allGroup = document.querySelectorAll('.form-contacts__sublink');

  allGroup.forEach(elem => {
    elem.addEventListener('click', function (e) {
      e.preventDefault();
      group.textContent = elem.textContent;
      btnSelect.classList.remove('form-contacts__select--active');
    });
  });
}

function saveToLocalStorageContact() {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  const contact = {
    name: name.value,
    phone: phone.value,
    group: group.textContent,
  }

  contacts.push(contact);

  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export function addContact() {
  btnSave.addEventListener('click', function (e) {
    e.preventDefault();
    saveToLocalStorageContact();
    displaySavedContacts();
    formContacts.reset();
  });
}

function displaySavedContacts() {
  contactManagment.classList.remove('header__management-contacts--active');

  const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(accordionItem => {
    const listContacts = document.createElement('ul');
    listContacts.classList.add('accordion__contacts')

    listContacts.innerHTML = '';

    savedContacts.forEach((savedContact) => {
      const item = document.createElement('li');
      item.classList.add('accordion__contact');
      item.classList.add('contact');
      item.innerHTML = `
        <div class="contact__name">${savedContact.name}</div>
        <div class="contact__tel">${savedContact.phone}</div>
        <button class="contact__btn-edit btn" type="button" aria-label="Редактировать контакт">
          <svg class="contact__icon-edit" width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path class="contact__edit" opacity="0.3"
              d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.289998C14.98 -0.100002 14.35 -0.100002 13.96 0.289998L12.13 2.12L15.88 5.87L17.71 4.04Z"
              fill="black" />
          </svg>
        </button>
        <button class="contact__btn-del btn" type="button" aria-label="Удалить контакт">
          <svg class="contact__icon-del" width="16" height="20" viewBox="0 0 16 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path class="contact__icon-basket" opacity="0.3"
              d="M1.66667 17.3889C1.66667 18.55 2.61667 19.5 3.77778 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66667V17.3889ZM4.26333 9.87333L5.75167 8.385L8 10.6228L10.2378 8.385L11.7261 9.87333L9.48833 12.1111L11.7261 14.3489L10.2378 15.8372L8 13.5994L5.76222 15.8372L4.27389 14.3489L6.51167 12.1111L4.26333 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36111L4.30556 1.55556H0.611111V3.66667H15.3889V1.55556H11.6944Z"
              fill="black" />
          </svg>
        </button>
      `
      listContacts.append(item);
    });
    accordionItem.append(listContacts)
  })
}
