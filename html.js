const puppeteer = require('puppeteer');
const fs = require('fs');

async function convertHtmlToPdf(inputFilePath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = fs.readFileSync(inputFilePath, 'utf8');

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({ 
    path: outputPath, 
    printBackground: true, 
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' } 
  });

  await browser.close();
}

const inputHTML = document.getElementById('file-input-html').files[0];
const inputHTMLPath = inputHTML.path;

const inputFilePath = 'testing.html';
const outputPath = 'output4.pdf';

convertHtmlToPdf(inputFilePath, outputPath)
  .then(() => console.log('PDF generated successfully'))
  .catch((error) => console.error('Error generating PDF:', error));
