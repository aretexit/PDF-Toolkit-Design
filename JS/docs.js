const osDocs = require('os');
const pathDocs = require('path');

function setApiKey(apiKeyReceived) {
    apiKey = apiKeyReceived;
}
// Convert PDF to Docx using ConvertAPI
async function convertDocx(inputPath) {
    const convertapiDocs = require('convertapi')(apiKey);
    try {
        const inputFileName = pathDocs.basename(inputPath);
        const outputFileName = inputFileName.replace(/\.[^/.]+$/, "") + '.docx'; 
       
        const tempDir = osDocs.tmpdir();

        const tempFilePath = pathDocs.join(tempDir, outputFileName);

        const result = await convertapiDocs.convert('docx', {
            File: inputPath,
            IncludeFormatting: 'false',
            EnableOCR: 'true',
            SingleSheet: 'true',
            StoreFile: 'false',
        });

        await result.saveFiles(tempFilePath);
        return tempFilePath;
    } catch (error) {
        return null;
    }
}

// Main Function
async function mainDocx(inputPDFPath) {
    try {
        const docxPath = await convertDocx(inputPDFPath);
        if (docxPath) {
            console.log("Conversion successful. Docs file saved at:", docxPath);
            return docxPath;
        } else {
            console.log("Conversion failed. No Docs file was generated.");
            return null;
        }
    } catch (error) {
        console.log("An error occurred during conversion:", error);
        return null;
    }
}



module.exports = {
    mainDocx,
    setApiKey
};
