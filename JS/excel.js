const fs = require('fs');
const os = require('os');
let apiKey;

function setApiKey(apiKeyReceived) {
    apiKey = apiKeyReceived;
}

const path = require('path');

// Convert PDF to Excel using ConvertAPI with OCR
async function convertToExcelWithOCR(inputPath) {
    const convertapi = require('convertapi')(apiKey); 
    try {
        const inputFileName = path.basename(inputPath);
        const outputFileName = inputFileName.replace(/\.[^/.]+$/, "") + '.xlsx';

        const tempDir = os.tmpdir();

        const tempFilePath = path.join(tempDir, outputFileName);

        const result = await convertapi.convert('xlsx', {
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
async function main(inputPDFPath) {
    try {
        const excelPath = await convertToExcelWithOCR(inputPDFPath);
        if (excelPath) {
            console.log("Conversion successful. Excel file saved as temporary file:", excelPath);
            return excelPath;
        } else {
            console.log("Conversion failed. No Excel file was generated.");
            return null;
        }
    } catch (error) {
        console.log("An error occurred during conversion:", error);
        return null;
    }
}

module.exports = {
    setApiKey,
    main
};
