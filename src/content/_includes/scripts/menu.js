(function(){

  const MenuButton = document.getElementsByClassName('lhb-nav-menu-control')[0];
  if (MenuButton) {
    MenuButton.addEventListener('click', function() {
      document.body.classList.toggle('menu-is-active');
    });
  }
  const Scrim = document.getElementsByClassName('lhb-scrim')[0];
  if (Scrim) {
    Scrim.addEventListener('click', function() {
      document.body.classList.remove('menu-is-active');
    });
  }

})();