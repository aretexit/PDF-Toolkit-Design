const fs = require('fs');
const convertapi = require('convertapi')('H01hq9IR9LKCRNah');

// Convert PDF to Excel using ConvertAPI with OCR
async function convertToExcelWithOCR(inputPath, outputPath) {
    try {
        await convertapi.convert('xlsx', {
            File: inputPath,
            IncludeFormatting: 'true',
            EnableOCR: 'true',
            SingleSheet: 'true',
        }).then(function (result) {
            return result.saveFiles(outputPath);
        });
        return outputPath;
    } catch (error) {
        console.log('Error converting PDF to Excel with OCR:', error);
        return null;
    }
}

// Main Function
async function main(inputPDFPath, outputDir) {
    const outputPath = `${outputDir}/output.xlsx`;
    const excelPath = await convertToExcelWithOCR(inputPDFPath, outputPath);
    if (excelPath) {
        console.log("Conversion successful. Excel file saved at:", excelPath);
        return excelPath;
    } else {
        console.log("Conversion failed. No Excel file was generated.");
        return null;
    }
}

module.exports = {
    main
};
