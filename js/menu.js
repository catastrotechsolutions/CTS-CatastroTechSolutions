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

// footer mail link: also copy the address, since mailto: does nothing on a device with no default mail app
(function(){
  var a=document.querySelector('footer .footer-contact a[href^="mailto:"]');
  if(!a)return;
  var addr=a.getAttribute("href").slice(7),label=a.textContent,timer;
  function done(){
    a.textContent="주소 복사됨 · Copied";
    clearTimeout(timer);
    timer=setTimeout(function(){a.textContent=label;},1600);
  }
  function legacy(){
    var t=document.createElement("textarea"),ok=false;
    t.value=addr;t.setAttribute("readonly","");
    t.style.cssText="position:fixed;left:-9999px;top:0;opacity:0";
    document.body.appendChild(t);t.select();
    try{ok=document.execCommand("copy");}catch(e){}
    document.body.removeChild(t);
    return ok;
  }
  a.addEventListener("click",function(){
    if(legacy()){done();return;}
    function pick(){var r=document.createRange();r.selectNodeContents(a);var g=window.getSelection();g.removeAllRanges();g.addRange(r);}
    if(navigator.clipboard)navigator.clipboard.writeText(addr).then(done,pick);else pick();
  });
})();
