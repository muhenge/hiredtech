const key = window.location.href.split('?')[1];
if (key ) {
    document.getElementById('Textarea').value = `<script id="seo-plugin" src="https://cdn.jsdelivr.net/gh/muhenge/seo-globexcam-plugin/index.js?${key}"></script>`;
    document.getElementById('execCopy').addEventListener('click',  () => execCopy(), false);
    const execCopy = async(e)=> {
        let text = document.querySelector("#Textarea").value;
        await navigator.clipboard.writeText(text);
        document.getElementById('execCopy').innerText = 'Copied!';
    }
}
else {
    document.getElementById('Textarea').value = "No key, go to your project list and click on App key button";
}



