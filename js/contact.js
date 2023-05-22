const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError")
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const submitButton = document.querySelector("button");


function validateForm(event) {
    event.preventDefault();
    if (checkLength(firstName.value, 0) === true) {
        firstNameError.style.display = "none";
    } else {
        firstNameError.style.display = "block";
    }

    if (checkLength(subject.value, 10) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";

    } if (
        checkLength(firstName.value, 0) &&
        checkLength(subject.value, 10) &&
        validateEmail(email.value) 
    ) {
        document.querySelector("#successMessage").style.display = "block";
        form.reset();
    }
    

}

form.addEventListener("submit", validateForm) 


function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}