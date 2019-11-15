let signInform = document.querySelector('.sign-in-form');
let registerform = document.querySelector('.register-form');
let message = document.getElementById('register_message');
let signin_message = document.getElementById('sign-in_message');

signInform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;
    
    fetch('http://localhost:3000/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then((resp)=>{
        if(resp.status === 400){
            throw new Error();
        }
        return resp.json();
        })
    .then((data) => {
            window.location.href = data.redirectURL;
    }).catch(() => signin_message.textContent ="Wrong email or password");
});

registerform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.getElementById('register-password').value;
    let rePassword = document.getElementById('register-re-enter-password').value;
    
    if(password !== rePassword){
        message.textContent ="Password does not match";
        return;
    }

    fetch('http://localhost:3000/users/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    }).then((resp)=>resp.text())
    .then((data) => alert(data));
})