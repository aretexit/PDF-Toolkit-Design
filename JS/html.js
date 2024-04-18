const puppeteer = require('puppeteer');

async function convertHtmlToPdf(inputFilePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = fs.readFileSync(inputFilePath, 'utf8');

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ 
    printBackground: true, 
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' } 
  });

  await browser.close();

  return pdfBuffer;
}

let pdfBlob;
let inputHTMLFileName;

document.getElementById('htmlbtn').addEventListener('click', async () => {
    document.getElementById('htmlbtn').style.display = 'none';
    document.querySelector('.selected-file-html').style.display = 'none';

    document.getElementById('loaderHtml').style.display = 'block';

    const inputHTML = document.getElementById('file-input-html').files[0];
    const inputHTMLPath = inputHTML.path;
    inputHTMLFileName = inputHTML.name;

    pdfBlob = await convertHtmlToPdf(inputHTMLPath);
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Conversion Successful",
        showConfirmButton: false,
        timer: 1500
    });
    document.getElementById('loaderHtml').style.display = 'none';
    document.getElementById('dbtn-html').style.display = 'block';
    document.getElementById('backbtn-html').style.display = 'block';
});

document.getElementById('dbtn-html').addEventListener('click', () => {
    const blobUrl = URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = inputHTMLFileName.replace('.html', '.pdf'); 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})

document.getElementById("backbtn-html").addEventListener('click', () => {
  document.getElementById("file-input-html").value = "";
  document.getElementById("selected-file-info-html").innerHTML = "";
  document.getElementById('dbtn-html').style.display = 'none';
  document.getElementById('backbtn-html').style.display = 'none';
  document.getElementById('file-select-htmlbtn').style.display = 'block';
})