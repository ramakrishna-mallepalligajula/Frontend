import express from "express";
import qr from "qr-image";
import fs from "fs";

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/generate-qr", (req, res) => {

    const url = req.body.url;

    if (!url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    const qrPng = qr.imageSync(url, {
        type: "png"
    });

    fs.writeFileSync("qr_img.png", qrPng);

    fs.writeFileSync("url.txt", url);

    const base64QR = qrPng.toString("base64");

    res.json({
        qr: `data:image/png;base64,${base64QR}`
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});