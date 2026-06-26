(function(){function ready(f){if(document.readyState!="loading")f();else document.addEventListener("DOMContentLoaded",f);}
ready(function(){
 var t=document.querySelector(".cart-toggle"),d=document.getElementById("cartDrawer"),o=document.getElementById("cartOverlay"),c=document.getElementById("cartClose");
 function close(){d.classList.remove("open");d.setAttribute("aria-hidden","true");if(o)o.classList.remove("show");document.body.style.overflow="";if(t)t.focus();}
 function open(){d.classList.add("open");d.setAttribute("aria-hidden","false");if(o)o.classList.add("show");document.body.style.overflow="hidden";if(c)c.focus();}
 if(t&&d){t.addEventListener("click",open);if(c)c.addEventListener("click",close);if(o)o.addEventListener("click",close);document.addEventListener("keydown",function(e){if(e.key=="Escape"&&d.classList.contains("open"))close();});}
 var toast=document.querySelector(".addon-toast");
 document.querySelectorAll("form[data-demo]").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();if(toast){toast.classList.add("show");clearTimeout(toast._t);toast._t=setTimeout(function(){toast.classList.remove("show");},3200);}f.reset();});});
});})();
