async function includeHTML() {
    let allW3 = document.querySelectorAll('[w3-include-html]');

    for (let i = 0; i < allW3.length; i++) {
        const element = allW3[i];
        
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);

        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'error 404 not found -__-';
        }
    }
}
