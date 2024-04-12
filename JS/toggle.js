const fs = require('fs');
const convertapi = require('convertapi')('LSlAIiNjFSmmkxhW');
const path = require('path');

// Convert PDF to Excel using ConvertAPI with OCR
async function convertToExcelWithOCR(inputPath) {
    try {
        const inputFileName = path.basename(inputPath);
        const outputFileName = inputFileName.replace(/\.[^/.]+$/, "") + '.xlsx'; // Remove extension and add .xlsx
        const outputDir = path.dirname(inputPath);
        const outputPath = path.join(outputDir, outputFileName);

        const result = await convertapi.convert('xlsx', {
            File: inputPath,
            IncludeFormatting: 'true',
            EnableOCR: 'true',
            SingleSheet: 'true',
        });

        await result.saveFiles(outputPath);
        console.log("Conversion successful. Excel file saved at:", outputPath);
        return outputPath;
    } catch (error) {
        console.log('Error converting PDF to Excel with OCR:', error);
        return null;
    }
}

// Main Function
async function main(inputPDFPath, outputDir) {
    try {
        const excelPath = await convertToExcelWithOCR(inputPDFPath, outputDir);
        if (excelPath) {
            console.log("Conversion successful. Excel file saved at:", excelPath);
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
    main
};