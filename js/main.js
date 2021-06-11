'use strict';

const burger = document.querySelector('.burger');
const burgerButton = document.querySelector('.burger__image');

burger.style.display = 'none';

burgerButton.addEventListener('click', () => {
  if (burger.style.display === 'none') {
    burger.style.display = 'block';
  } else {
    burger.style.display = 'none';
  }
});
