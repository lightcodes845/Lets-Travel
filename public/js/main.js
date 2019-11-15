
let callMeForm = document.querySelector('.call-me-form');
let contactUsForm = document.querySelector('.contact-us-form');

document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = "";
    posts.forEach((post) => {
        let postHtml = `
        <div class="col-4">
				<div class="card">
					<img src="${post.imageUrl}" alt="${post.title}" class="card-img-top">

					<div class="card-body">
						<h4 class="card-title">${post.title}</h4>
						<p class="class-text">${post.description}</p>
						<a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
					</div>
				</div>
			</div>`;
        articles.insertAdjacentHTML('beforeend', postHtml);

    });
});

callMeForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	let phoneInp = callMeForm.querySelector('input');
	fetch('http://localhost:3000/callback-requests',
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			phoneNumber: phoneInp.value
		})
	}).then((resp) => resp.text())
	.then(()=> alert('We will call you back as soon as possible!'));
});

contactUsForm.addEventListener("submit", (e) =>{
	e.preventDefault();
	let nameInp = contactUsForm.querySelector("#name");
	let emailInp = contactUsForm.querySelector("#email");
	let messageInp = contactUsForm.querySelector("#message");

	fetch('http://localhost:3000/emails',
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: nameInp.value,
			email: emailInp.value,
			message: messageInp.value
		})
	}).then((resp) => resp.text())
	.then((data)=> data);

});