
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
        const outputDir = pathDocs.dirname(inputPath);
        const outputPath = pathDocs.join(outputDir, outputFileName);

        const result = await convertapiDocs.convert('docx', {
            File: inputPath,
            IncludeFormatting: 'false',
            EnableOCR: 'true',
            SingleSheet: 'true',
            StoreFile: 'false',
        });

        await result.saveFiles(outputPath);
        console.log("Conversion successful. Excel file saved at:", outputPath);
        return outputPath;
    } catch (error) {
        console.log('Error converting PDF to Docs:', error);
        return null;
    }
}

// Main Function
async function mainDocx(inputPDFPath, outputDir) {
    try {
        const docxPath = await convertDocx(inputPDFPath, outputDir);
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
