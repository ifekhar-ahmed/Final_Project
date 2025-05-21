const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const studentid = document.getElementById('studentid');
const gender = document.getElementById('gender');
const profilepic = document.getElementById('profilepic');
const address = document.getElementById('address');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// ...existing showError, showSuccess, checkEmail, checkLength, getFieldName, checkPasswordMatch...

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        // For file input, check files length
        if(input.type === "file") {
            if(input.files.length === 0){
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSuccess(input);
            }
        }
        // For select (gender)
        else if(input.tagName === "SELECT") {
            if(input.value === ""){
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSuccess(input);
            }
        }
        // For textarea and other inputs
        else {
            if(input.value.trim() === ''){
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSuccess(input);
            }
        }
    })
}

// Update getFieldName for better labels
function getFieldName(input){
    if(input.id === "studentid") return "ID";
    if(input.id === "profilepic") return "Profile Picture";
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// ...rest of your validation functions...

form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([
        firstname, lastname, studentid, gender, profilepic, address,
        username, email, password, password2
    ]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});