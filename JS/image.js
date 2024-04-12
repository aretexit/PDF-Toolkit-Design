const PDFDocumentimg = require('pdfkit');
const sizeOf = require('image-size');
const { Buffer } = require('buffer');

function imageToPDF(imageData) {
    return new Promise((resolve, reject) => {
        const dimensions = sizeOf(imageData);
        const isLandscape = dimensions.width > dimensions.height;

        const doc = new PDFDocumentimg({
            size: isLandscape ? [dimensions.width, dimensions.height] : [dimensions.height, dimensions.width],
            autoFirstPage: false
        });

        doc.addPage();

        const x = (doc.page.width - dimensions.width) / 2;
        const y = (doc.page.height - dimensions.height) / 2;

        const scale = Math.min(doc.page.width / dimensions.width, doc.page.height / dimensions.height);
        const scaledWidth = dimensions.width * scale;
        const scaledHeight = dimensions.height * scale;

        const scaledX = (doc.page.width - scaledWidth) / 2;
        const scaledY = (doc.page.height - scaledHeight) / 2;

        doc.image(imageData, scaledX, scaledY, { width: scaledWidth, height: scaledHeight });

        const chunks = [];
        let pdfData = null;

        doc.on('data', function(chunk) {
            chunks.push(chunk);
        });

        doc.on('end', function() {
            pdfData = Buffer.concat(chunks);
            resolve(pdfData);
        });

        doc.end();
    });
}

document.getElementById('imgbtn').addEventListener('click', () => {
    document.getElementById('dbtn-img').style.display = 'block';
    document.getElementById('backbtn-img').style.display = 'block';
    document.getElementById('imgbtn').style.display = 'none';
    document.getElementById('selected-file-info-img').style.display = 'none';
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Image converted successfully",
        showConfirmButton: true,
        });
});

document.getElementById('dbtn-img').addEventListener('click', () => {
    const imageInput = document.getElementById('file-input-img');
    const imageFile = imageInput.files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const arrayBuffer = event.target.result;
            const buffer = Buffer.from(arrayBuffer);

            const pdfData = await imageToPDF(buffer);

            const blob = new Blob([pdfData], { type: 'application/pdf' });
            const link = document.createElement('a');

            const fileName = imageFile.name;
            link.download = fileName.substring(0, fileName.lastIndexOf('.')) + '.pdf';

            link.href = URL.createObjectURL(blob);
            link.click();
        };

        reader.readAsArrayBuffer(imageFile);
    } else {
        alert("Please select an image file.");
    }
})


document.getElementById('backbtn-img').addEventListener('click', () => {
    document.getElementById('dbtn-img').style.display = 'none';
    document.getElementById('backbtn-img').style.display = 'none';
    document.getElementById("selected-file-info-img").innerHTML = "";
    document.getElementById("file-input-img").value = ""; 
})