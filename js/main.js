import { openManagmentGroup, openManagmentContact, openManagmentContactMobile } from "./components/openCloseManagment.js";
import selectOpenGroup from "./components/selectGroup.js";
import addGroup from "./components/addGroup.js";
import { addContact } from "./components/addContacts.js";

window.addEventListener('DOMContentLoaded', () => {
  openManagmentGroup();
  openManagmentContact();
  openManagmentContactMobile();
  selectOpenGroup();
  addGroup();
  addContact();
});


