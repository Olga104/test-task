const groupButton = document.querySelector('.header__btn-groups');
export const groupManagment = document.querySelector('.header__management-group');
const closeButtonGroup = document.querySelector('.management-group__close');
const closeButtonContacts = document.querySelector('.management-contacts__close');
export const contactManagment = document.querySelector('.header__management-contacts');
const contactButton = document.querySelector('.header__btn-contacts');
const contactMobileButton = document.querySelector('.contacts-book__btn-contacts');

import { addField, groupList } from "./addGroup.js"

export function openManagmentGroup() {
  groupButton.addEventListener('click', function (e) {
    groupManagment.classList.add('header__management-group--active');

    const savedValues = JSON.parse(localStorage.getItem('groups')) || [];

    groupList.innerHTML = '';

    if (groupList) {
      savedValues.forEach(element => {
        addField(element)
      });
    }
  });

  closeManagment()
}

function closeManagment() {
  closeButtonGroup.addEventListener('click', function (e) {
    groupManagment.classList.remove('header__management-group--active')
  });
}

export function openManagmentContact() {
  contactButton.addEventListener('click', function (e) {
    contactManagment.classList.add('header__management-contacts--active')
  });

  closeManagmentContact()
}

function closeManagmentContact() {
  closeButtonContacts.addEventListener('click', function (e) {
    contactManagment.classList.remove('header__management-contacts--active')
  });
}

export function openManagmentContactMobile() {
  contactMobileButton.addEventListener('click', function (e) {
    contactManagment.classList.add('header__management-contacts--active')
  });

  closeManagmentContactMobile()
}

function closeManagmentContactMobile() {
  closeButtonContacts.addEventListener('click', function (e) {
    contactManagment.classList.remove('header__management-contacts--active')
  });
}