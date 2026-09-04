const urlInput = document.getElementById("url");
const generateBtn = document.getElementById("generateBtn");
const qrContainer = document.getElementById("qrContainer");

generateBtn.addEventListener("click", async () => {

    const url = urlInput.value;

    if (!url) {
        alert("Please enter a URL");
        return;
    }

    const response = await fetch("/generate-qr", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            url: url
        })
    });

    const data = await response.json();

    qrContainer.innerHTML = `
        <img src="${data.qr}" alt="QR Code">
    `;
});