const selectButton = document.querySelector('.form-contacts__select');
const selectList = document.querySelector('.form-contacts__select');


export default function selectOpenGroup() {
  selectButton.addEventListener('click', function () {
    selectList.classList.toggle('form-contacts__select--active');
  });
}

