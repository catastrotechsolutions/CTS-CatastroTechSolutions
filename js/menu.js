// mobile: first tap on the bureau menu opens its sub-menu, second tap follows the link
(function(){
  var menu=document.querySelector("nav .menu");
  if(!menu)return;
  var top=menu.querySelector("a");
  var mobile=window.matchMedia("(max-width:860px)");
  function set(open){
    menu.classList.toggle("open",open);
    top.setAttribute("aria-expanded",open?"true":"false");
  }
  set(false);
  top.addEventListener("click",function(e){
    if(!mobile.matches)return;
    var open=menu.classList.contains("open");
    if(open&&!top.hasAttribute("aria-current"))return;
    e.preventDefault();
    set(!open);
  });
  document.addEventListener("click",function(e){
    if(!menu.contains(e.target))set(false);
  });
})();
