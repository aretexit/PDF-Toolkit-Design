const { ipcRenderer } = require('electron');

const loader = document.getElementById('loader');
const convertBtn = document.getElementById('excelbtn');
const fileExcel = document.getElementById('selected-file-info-excel');
const backbtnExcel = document.getElementById('backbtn-excel');
const selectBtnExcel = document.getElementById('file-select-excelbtn');
const dbtn = document.getElementById('download-excel');

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
        ipcRenderer.send('start-conversion', { filePath: file.path, outputDir, fileName: file.name }); 
    }
});

ipcRenderer.on('conversion-complete', async (event, convertedFilePath) => {
    loader.style.display = 'none';
    dbtn.style.display = 'block';
    backbtnExcel.style.display = 'block';
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Conversion Successful",
        showConfirmButton: false,
        timer: 1500
    });
    dbtn.addEventListener('click', async () => {
        try {
            const response = await ipcRenderer.invoke('save-excel', convertedFilePath);
    
            const fileInput = document.getElementById('file-input-excel');
            const convertBtn = document.getElementById('excelbtn');
    
            fileInput.disabled = false;
            convertBtn.disabled = false;
    
            if (response && response.filePath) {
                const { filePath } = response;
                fs.rename(convertedFilePath, filePath, (err) => {
                    if (err) {
                        console.error('Error moving file:', err);
                    } else {
                        console.log('File moved successfully');
                    }
                });
            } else {
            }
        } catch (error) {
            console.error('Error during conversion:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Conversion Failed',
                text: 'Error converting PDF to Excel. Some Scanned PDF is not working.'
            });
            const fileInput = document.getElementById('file-input-excel');
            const convertBtn = document.getElementById('excelbtn');
            fileInput.disabled = false;
            convertBtn.disabled = false;
        }
        document.getElementById("file-input-excel").value = "";
        document.getElementById("file-input-excel").disabled = false; 
    });
    document.getElementById("file-input-excel").value = "";
    document.getElementById("file-input-excel").disabled = false; 
});

backbtnExcel.addEventListener('click', () => {
    dbtn.style.display = 'none';
    backbtnExcel.style.display = 'none';
    selectBtnExcel.style.display = 'block';
    document.getElementById("file-input-excel").disabled = false; 
    document.getElementById("file-input-excel").value = ""; 
    convertBtn.disabled = false;
});

