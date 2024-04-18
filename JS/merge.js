const { PDFDocument } = require('pdf-lib');
const Swal = require('sweetalert2');

const pdfPaths = [];

const mergebtn = document.getElementById('mergebtn');
const files = document.getElementById('mergeFiles');
const downloadbtn = document.getElementById('download');
const backbtn = document.getElementById('backbtn');
const selectbtn = document.getElementById('file-select-btn');

mergebtn.addEventListener('click', async () => {
    const pdfFilesInput = document.getElementById('file-input');
    const pdfFiles = pdfFilesInput.files;

    for (const file of pdfFiles) {
        const filePath = URL.createObjectURL(file);
        pdfPaths.push(filePath);
    }

    try {
        await mergePdfPages(pdfPaths);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Merging Successful",
            showConfirmButton: false,
            timer: 1500
        });

        mergebtn.style.display = 'none';
        document.getElementById('selected-file-info').style.display = 'none';
        downloadbtn.style.display = 'block';
        backbtn.style.display = 'block';
    } catch (error) {
        console.error('Error occurred during merging:', error);
    }
});

downloadbtn.addEventListener('click', async () => {
    const mergedPdf = await mergePdfPages(pdfPaths);
    const blob = new Blob([mergedPdf], { type: 'application/pdf' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Merged.pdf';
    a.click();
    URL.revokeObjectURL(a.href); 
});

backbtn.addEventListener('click', () => {
    document.getElementById("file-input").value = "";
    document.getElementById("selected-file-info").innerHTML = "";
    document.getElementById('download').style.display = 'none';
    document.getElementById('backbtn').style.display = 'none';
    document.getElementById('file-select-btn').style.display = 'block';
})


async function mergePdfPages(pdfPaths) {
    const mergedPdf = await PDFDocument.create();

    for (const pdfPath of pdfPaths) {
        const pdfBytes = await fetch(pdfPath).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
        });
    }

    const mergedPdfBytes = await mergedPdf.save();
    return mergedPdfBytes;
}
