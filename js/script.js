/*Back to top*/

const topBtn = document.getElementById("topBtn");

topBtn.addEventListener("click", function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

/*Scroll to mailing list*/
document.getElementById("mail").addEventListener("click", function() {
  var emailElement = document.getElementById("footerEmail");
  emailElement.scrollIntoView({behavior: "smooth"});
  setTimeout(function(){
      emailElement.focus();
  }, 500);
});

 /*Mail validation */
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const successMessage = document.querySelector("#successMessage");
const submitButton = document.querySelector("#submitBtn");

submitButton.addEventListener("click", validateForm);

function validateForm(event) {
    event.preventDefault();

    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
        emailError.style.display = "none";
        successMessage.style.display = "block";
        successMessage.textContent = "Success! Your email was added to the mailing list.";
        emailInput.value = "";
    } else {
        emailError.style.display = "block";
        emailError.textContent = "Please enter a valid email address.";
        successMessage.style.display = "none";
    }
}


