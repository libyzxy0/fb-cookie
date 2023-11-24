const form = document.getElementById('cred');
const btnCopyCookie = document.getElementById('copy-cookie');
const btnCopyState = document.getElementById('copy-state');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let spinner = `<div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
    let btnSubmit = document.getElementById('submit');
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let data = { email: username, password };
    btnSubmit.setAttribute("disabled", true)
    btnSubmit.innerHTML = spinner;
    const sent = await fetch('https://fca-state.libyzxy0.repl.co/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const response = await sent.json()
        if (response.error) {
            btnSubmit.setAttribute("disabled", true);
            btnSubmit.classList.replace("btn-primary", "btn-danger");
            btnSubmit.innerHTML = 'Error Invalid Credentials';
            setTimeout(() => {
                btnSubmit.removeAttribute("disabled");
                btnSubmit.classList.replace("btn-danger", "btn-primary");
                btnSubmit.innerHTML = 'Get Cookie';
            }, 3000)
        } else {
        btnSubmit.setAttribute("disabled", true);
        btnSubmit.classList.replace("btn-primary", "btn-success");
        btnSubmit.innerHTML = 'Success';
        setTimeout(() => {
            btnSubmit.removeAttribute("disabled");
            btnSubmit.classList.replace("btn-success", "btn-primary");
            btnSubmit.innerHTML = 'Get Cookie';
        }, 3000)
            btn.removeAttribute("disabled");
            document.getElementById('cookie').removeAttribute("disabled");
        let appstate = JSON.stringify(response.appstate, null, 2) + '\n';
        let state = response.state;
        document.getElementById('cookie').value = appstate;
        document.getElementById('state').value = state;
       } 
    } catch (error) {
        console.log(error)
    }
})

btnCopyCookie.addEventListener('click', () => {
let cookie = document.getElementById('cookie').value; navigator.clipboard.writeText(cookie).then( function() {
        btnCopyCookie.setAttribute("disabled", true);
        btnCopyCookie.classList.replace("btn-primary", "btn-success");
        btnCopyCookie.innerHTML = 'Copied!';
        setTimeout(() => {
            btnCopyCookie.removeAttribute("disabled");
            btnCopyCookie.classList.replace("btn-success", "btn-primary");
            btnCopyCookie.innerHTML = 'Copy Cookie';
        }, 3000)
    })
})
btnCopyState.addEventListener('click', () => {
let cookie = document.getElementById('state').value; navigator.clipboard.writeText(cookie).then( function() {
        btnCopyState.setAttribute("disabled", true);
        btnCopyState.classList.replace("btn-primary", "btn-success");
        btnCopyState.innerHTML = 'Copied!';
        setTimeout(() => {
            btnCopyState.removeAttribute("disabled");
            btnCopyState.classList.replace("btn-success", "btn-primary");
            btnCopyState.innerHTML = 'Copy State';
        }, 3000)
    })
})
