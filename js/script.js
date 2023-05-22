/*Back to top*/

const topBtn = document.getElementById("topBtn");

topBtn.addEventListener("click", function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

/*Scroll to mailing list*/
document.getElementById("mail").addEventListener("click", function() {
  var emailElement = document.getElementById("email");
  emailElement.scrollIntoView({behavior: "smooth"});
  // Use setTimeout to delay focus, allowing for the scroll to happen
  setTimeout(function(){
      emailElement.focus();
  }, 500);
});
