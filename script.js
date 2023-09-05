const form = document.getElementById('cred');
const btn = document.getElementById('copy');
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
        let appstate = JSON.stringify(response, null, 2) + '\n';
        document.getElementById('cookie').value = appstate;
       } 
    } catch (error) {
        console.log(error)
    }
})

btn.addEventListener('click', () => {
let cookie = document.getElementById('cookie').value; navigator.clipboard.writeText(cookie).then( function() {
        btn.setAttribute("disabled", true);
        btn.classList.replace("btn-primary", "btn-success");
        btn.innerHTML = 'Copied!';
        setTimeout(() => {
            btn.removeAttribute("disabled");
            btn.classList.replace("btn-success", "btn-primary");
            btn.innerHTML = 'Copy Cookie';
        }, 3000)
    })
})
