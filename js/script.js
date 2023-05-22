const topBtn = document.getElementById("topBtn");

topBtn.addEventListener("click", function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
});