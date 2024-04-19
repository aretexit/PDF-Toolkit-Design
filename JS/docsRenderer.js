const { text } = require("pdfkit");

const loaderDocs = document.getElementById('loaderDocs');
const convertBtnDocs = document.getElementById('docsbtn');
const fileDocs = document.getElementById('selected-file-info-docs');
const backbtnDocs = document.getElementById('backbtn-docs');
const selectBtnDocs = document.getElementById('file-select-docsbtn');
const dbtnDocs = document.getElementById('dbtn-docs');
const fileInputDocs = document.getElementById('file-input-docs');

convertBtnDocs.addEventListener('click', async () => {
    const file = fileInputDocs.files[0];
    const outputDir = '';

    if (file && !convertBtn.disabled) {
        fileDocs.style.display = 'none';
        loaderDocs.style.display = 'block';
        convertBtnDocs.style.display = 'none';
        fileInputDocs.disabled = true;
        convertBtnDocs.disabled = true;

        ipcRenderer.send('docx-conversion', { filePath: file.path, outputDir, fileName: file.name }); 
    }
});

ipcRenderer.on('getApiKey', (event, apiKey) => {
    ipcRenderer.send('apiKey', apiKey);
});


ipcRenderer.on('docx-complete', async (event, path) => {
    if (path){
    convertedFilePath = path;
    loaderDocs.style.display = 'none';
    dbtnDocs.style.display = 'block';
    dbtnDocs.disabled = false;
    backbtnDocs.style.display = 'block';
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Conversion Successful",
        showConfirmButton: false,
        timer: 1500
    });
    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "ERROR",
            text: "Conversion Failed",
            showConfirmButton: true,
        });
        loaderDocs.style.display = 'none';
        dbtnDocs.style.display = 'block';
        dbtnDocs.disabled = true;
        dbtnDocs.style.background = 'gray';
        backbtnDocs.style.display = 'block';
    }
    document.getElementById("file-input-docs").value = "";
    document.getElementById("file-input-docs").disabled = false; 
});


dbtnDocs.addEventListener('click', async () => {
    dbtnDocs.style.background = 'gray';
    if (!convertedFilePath) return; 
    const response = await ipcRenderer.invoke('save-docx', convertedFilePath);
    dbtnDocs.disabled = true;

    fileInputDocs.disabled = false;
    convertBtn.disabled = false;

    if (response && response.filePath) {
        const { filePath } = response;
        fs.rename(convertedFilePath, filePath, (err) => {
            if (err) {
                dbtnDocs.disabled = true;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "File Saved Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                dbtnDocs.disabled = true;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "File Saved Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log('File moved successfully');
            }
        });
    } else {
        fileInputDocs.disabled = false;
        convertBtnDocs.disabled = false;
    }
});

backbtnDocs.addEventListener('click', () => {
    document.getElementById("file-input-docs").disabled = false; 
    document.getElementById("file-input-docs").value = ""; 
    convertBtnDocs.disabled = false;
    document.getElementById("selected-file-info-docs").innerHTML = "";
    backbtnDocs.style.display = 'none';
    dbtnDocs.style.display = 'none';
    dbtnDocs.style.background = '#EA2929';
    dbtnDocs.disabled = 'false';
});