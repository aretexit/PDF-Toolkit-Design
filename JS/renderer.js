const { ipcRenderer } = require('electron');

const loader = document.getElementById('loader');
const convertBtn = document.getElementById('excelbtn');
const convertBtn2 = document.getElementById('excelbtn2');
const fileExcel = document.getElementById('selected-file-info-excel');
const backbtnExcel = document.getElementById('backbtn-excel');
const selectBtnExcel = document.getElementById('file-select-excelbtn');
const dbtn = document.getElementById('download-excel');
const checkbox = document.getElementById("_checkbox-26");
const toggle = document.getElementById("toggle");

convertBtn.addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input-excel');
    const file = fileInput.files[0];
    const outputDir = "./";

    if (file && !convertBtn.disabled) {
        fileExcel.style.display = 'none'; 
        loader.style.display = 'block';
        convertBtn.style.display = 'none'; 
        fileInput.disabled = true;
        convertBtn.disabled = true;
        convertBtn2.style.display = 'none'; 
        convertBtn2.disabled = true;
        toggle.disabled = true;
        toggle.style.display = 'none';


        if (checkbox.checked) {
            convertBtn2.style.display = 'none';
            ipcRenderer.send('start-conversion-formatting', { filePath: file.path, outputDir, fileName: file.name }); 
        } else {
            ipcRenderer.send('start-conversion', { filePath: file.path, outputDir, fileName: file.name }); 
        }
    }
});

convertBtn2.addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input-excel');
    const file = fileInput.files[0];
    const outputDir = "./";

    if (file && !convertBtn2.disabled) {
        fileExcel.style.display = 'none'; 
        loader.style.display = 'block';
        convertBtn2.style.display = 'none'; 
        fileInput.disabled = true;
        convertBtn2.disabled = true; 
        convertBtn.style.display = 'none'; 
        convertBtn.disabled = true;
        toggle.disabled = true;
        toggle.style.display = 'none';

        ipcRenderer.send('start-conversion2', { filePath: file.path, outputDir, fileName: file.name }); 
    }
});

let convertedFilePath; 

ipcRenderer.on('conversion-complete', async (event, path) => {
    convertedFilePath = path; 
    loader.style.display = 'none';
    dbtn.style.display = 'block';
    dbtn.disabled = false;
    backbtnExcel.style.display = 'block';
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Conversion Successful",
        showConfirmButton: false,
        timer: 1500
    });
    document.getElementById("file-input-excel").value = "";
    document.getElementById("file-input-excel").disabled = false; 
});

dbtn.addEventListener('click', async () => {
    if (!convertedFilePath) return; 
    const response = await ipcRenderer.invoke('save-excel', convertedFilePath);
    dbtn.disabled = true;
    const fileInput = document.getElementById('file-input-excel');
    const convertBtn = document.getElementById('excelbtn');
    const convertBtn2 = document.getElementById('excelbtn2');

    fileInput.disabled = false;
    convertBtn.disabled = false;
    convertBtn2.disabled = false;

    if (response && response.filePath) {
        const { filePath } = response;
        fs.rename(convertedFilePath, filePath, (err) => {
            if (err) {
                dbtn.disabled = true;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "File Saved Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById("file-input-excel").value = ""; 
            } else {
                dbtn.disabled = true;
                document.getElementById("file-input-excel").value = ""; 
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
        // Handle the case when response or response.filePath is falsy
        const fileInput = document.getElementById('file-input-excel');
        const convertBtn = document.getElementById('excelbtn');
        const convertBtn2 = document.getElementById('excelbtn2');
        fileInput.disabled = false;
        convertBtn2.disabled = false;
    }
});

backbtnExcel.addEventListener('click', () => {
    dbtn.style.display = 'none';
    backbtnExcel.style.display = 'none';
    selectBtnExcel.style.display = 'block';
    document.getElementById("file-input-excel").disabled = false; 
    document.getElementById("file-input-excel").value = ""; 
    convertBtn.disabled = false;
    convertBtn2.disabled = false;
    document.getElementById("selected-file-info-excel").innerHTML = "";
});

function toggleCode() {
    var checkbox = document.getElementById("_checkbox-26");
    if (checkbox.checked) {
        convertBtn2.style.display = 'none';
        Swal.fire({
        position: "center",
        icon: "info",
        title: "Please take note that Include Formatting only works on single sheet.",
        showConfirmButton: true,
        });
    } else {
        convertBtn2.style.display = 'block';
    }
}