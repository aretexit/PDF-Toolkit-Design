const fse = require('fs-extra');

async function splitPDF(inputPDFPath, outputFolder, inputFileName) {
    const inputFile = await fse.readFile(inputPDFPath);
    const pdfDoc = await PDFDocument.load(inputFile);
    
    for (let pageNumber = 0; pageNumber < pdfDoc.getPageCount(); pageNumber++) {
        const pdfWriter = await PDFDocument.create();
        const [copiedPage] = await pdfWriter.copyPages(pdfDoc, [pageNumber]);
        pdfWriter.addPage(copiedPage);

        const outputPagePath = `${outputFolder}/${inputFileName}_page_${pageNumber + 1}.pdf`;
        await fse.ensureDir(outputFolder);
        await fse.writeFile(outputPagePath, await pdfWriter.save());
    }

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Split PDF Successful",
        showConfirmButton: false,
        timer: 1500
      });
}

document.getElementById('splitbtn').addEventListener('click', async () => {
    const inputPDF = document.getElementById('file-input-split').files[0];
    if (inputPDF) {
        const inputPDFPath = inputPDF.path;

        document.getElementById('dbtn-split').style.display = 'block';
        document.getElementById('backbtn-split').style.display = 'block';
        document.getElementById('selected-file-info-split').style.display = 'none';
        document.getElementById('splitbtn').style.display = 'none';
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Split PDF Successful",
            showConfirmButton: false,
            timer: 1500
          });
    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "No file chosen",
            showConfirmButton: false,
            timer: 1500
          });
    }
});

document.getElementById('dbtn-split').addEventListener('click', () => {
    document.getElementById('dbtn-split').style.background = 'gray';
    document.getElementById('dbtn-split').disabled = true;
    ipcRenderer.send('open-save-dialog', { defaultPath: '' });
    ipcRenderer.on('selected-directory', async (event, filePath) => {
        const outputFolder = filePath;
    
        try {
            const inputPDF = document.getElementById('file-input-split').files[0];
            const inputPDFPath = inputPDF.path;
            console.log(inputPDFPath);
    
            const inputFileName = inputPDF.name.replace(/\.[^/.]+$/, ''); 
            await splitPDF(inputPDFPath, outputFolder, inputFileName);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully saved " + inputFileName,
                showConfirmButton: true,
                });
        } catch (error) {
        }
    });
    
})

document.getElementById('backbtn-split').addEventListener('click', () => {
    document.getElementById("file-input-split").value = "";
    document.getElementById("selected-file-info-split").innerHTML = "";
    document.getElementById('dbtn-split').style.display = 'none';
    document.getElementById('backbtn-split').style.display = 'none';
    document.getElementById('file-select-splitbtn').style.display = 'block';
    document.getElementById('dbtn-split').style.background = '#EA2929';
    document.getElementById('dbtn-split').disabled = false;

})
