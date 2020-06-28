var pageNav = document.querySelector('.page-nav');
var hamburger = document.querySelector('.page-nav__hamburger');

pageNav.classList.add("page-nav--closed");
pageNav.classList.remove('page-nav--nomagic');

hamburger.addEventListener('click', function () {
  if (pageNav.classList.contains('page-nav--closed')) {
    pageNav.classList.remove('page-nav--closed');
    pageNav.classList.add('page-nav--opened');
  } else {
    pageNav.classList.add('page-nav--closed');
    pageNav.classList.remove('page-nav--opened');
  }
});
