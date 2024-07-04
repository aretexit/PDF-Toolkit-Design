const { PDFDocument } = require('pdf-lib');
const Swal = require('sweetalert2');

let pdfPaths = [];

const mergebtn = document.getElementById('mergebtn');
const downloadbtn = document.getElementById('download');
const backbtn = document.getElementById('backbtn');
const selectbtn = document.getElementById('file-select-btn');

mergebtn.addEventListener('click', async () => {
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
        document.getElementById("clear-all-btn").style.display = "none";
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
    downloadbtn.style.background = "gray";
    downloadbtn.disabled = true;
    document.getElementById("clear-all-btn").style.display = "none";

    pdfPaths = [];
});

document.getElementById('clear-all-btn').addEventListener('click', () => {
    document.getElementById("file-input").value = "";
    document.getElementById("clear-all-btn").style.display = "none";
    document.getElementById("selected-file-info").innerHTML = "";
    document.getElementById('download').style.display = 'none';
    document.getElementById('backbtn').style.display = 'none';
    document.getElementById('file-select-btn').style.display = 'block';
    document.getElementById('mergebtn').style.display = "none"
    downloadbtn.style.background = "#EA2929";
    downloadbtn.disabled = false;

    pdfPaths = [];
});

backbtn.addEventListener('click', () => {
    document.getElementById("file-input").value = "";
    document.getElementById("selected-file-info").innerHTML = "";
    document.getElementById('download').style.display = 'none';
    document.getElementById('backbtn').style.display = 'none';
    document.getElementById('file-select-btn').style.display = 'block';
    downloadbtn.style.background = "#EA2929";
    downloadbtn.disabled = false;
    document.getElementById("clear-all-btn").style.display = "none";

    pdfPaths = [];
});

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
