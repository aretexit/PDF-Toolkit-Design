Daily Update:

○`03/18/2024`
  - Already Created UI (Electron.js)
  - Tried to develop a code for conversion of pdf to excel 
    (Found lots of python libraries but not accurate, found API accurate but must be paid).
  - Managed to develop a code for splitting PDF Pages.
  - Managed to develop a code for Merging PDF pages.
  - Next Plan - Switch to nodejs because python doesnt auto install libraries/modules when electronjs is packaged/built.
    ![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-latest/blob/main/update-images/home.png?raw=true)

○ `03/19/2024`
  - Developed a node.js code that converts pdf file into excel file using the API
    pdfrest(pdf to excel conversion API) for free without watermarks and no limitations
    on pages to be converted `test.js`.
  - Next Plan - Fix the merge Excel files to retain the formatting, Organize the codes and be ready for the finalization of the project
    
○ `03/20/2024`
  - Converted the split pdf code from python to node.js.
  - Designed and developed UI for the split pdf on electron js.
  - Added success and error tracking.
  - Next Plan - Do the same on merge pdf. Continue fixing the merge Excel files to retain the formatting.
  ![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-latest/blob/main/update-images/split%20pdf.png?raw=true)
  ![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-latest/blob/main/update-images/success%20tracking.png?raw=true)
  ![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-latest/blob/main/update-images/error%20tracking.png?raw=true)

○ `03/21/2024`
  - Created a simple ui for the pdf to excel conversion.
  - Created a dialog for downloading the coverted excel file.
  - (Ongoing) - Trying to merge the excel file while retaining the formatting.
  - Developed a node js code that will merge pdf pages into one.
  - Next plan - Design ui for the merge pdf functionality, Continue fixing the merge excel functionality to retain the formatting.

○ `03/26/2024`
  - Designed ui for merge pdf functionality.
  - Merge pdf functionality can determine what is the first page and last page as long as the name of the pdf was numbered.
  - Managed to convert pdf into excel without loosing formatting (with watermark because i am using free api and some cells has multiple values).
  - Created ui for pdf to excel.
  - Added a simple loading message when converting.
  - Added a function preventing the user to click the button or add a pdf file while converting.
  - Next Plan - Implement image to PDF conversion functionality.

○ `03/27/2024`
  - Used ConvertAPI to convert scanned pdf to excel (need enhancements).
  - Used tesseract to convert scanned pdf to editable pdf (inaccurate).
  - Developed Image to PDF (not editable) function.
  - Created UI for image to pdf function.
  - Integration of image to pdf function to the ui (On going).
  - Next Plan - Implement PDF to Docx Functionality.
    
○ `03/28/2024`
  -Integrated Image to PDF feature into the UI.
  -Developed PDF to Docx function along with the user interface.
  -Integrated PDF to Docx feature into the UI.
  -Implemented error tracking for PDF to Excel function.
  -Packaging PDF-Toolkit for testing purposes.

○ `04/03/2024`
  - Started developing code for the new design of PDF-Toolkit.
  - Drafting, positioning, and animating the design.
  - Next Plan - Add animations, and fix some design bugs.

○ `04/04/2024`
  - Added toggle size animations.
  - Added text animations.
  - Added In and Out Animations.
  - Added button animations.
    
○ `04/05/2024`
  - Added Selected File View/Scroll.
  - Added Select File button.
  - Added In and Out Functionality.
  - Test Built/Packaged the design to see if there's an error.
  - Created a test MSI installer for the PDF-Toolkit.
  - Next Plan - Continue the design, create a better msi installer if possible.

○ `04/08/2024`
  - Created file selection for Split PDF.
  - Fixed conflicts between merge pdf and split pdf.
  - Created file selection for Image to PDF.
  - Added new icon and logo.
  - Created file selection for PDF to Docs.
  - Added code dividers.

○ `04/09/2024`
  - Created file selection for PDF to Excel
  - Fixed PDF to Docs design bug.
  - Finished Initial Design with minimal bugs.
  - Meeting  with Mr. Reinier Silo for the finalization of PDF Toolkit Design.
  - Added download button and back button for Merge PDF.
  - Successfully integrated Merge PDF backend to the new Frontend.
  - Identifying bugs.
![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-Design/blob/main/IMAGES/Design%20p1.png?raw=true)
![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-Design/blob/main/IMAGES/Design%20p2.png?raw=true)
![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-Design/blob/main/IMAGES/Design%20p3.png?raw=true)
![Alt text](https://github.com/KuroKami2023/PDF-Toolkit-Design/blob/main/IMAGES/Design%20p5.png?raw=true)

○ `04/10/2024`
  - Fixed bugs and design errors/issues
  - Meeting with ma'am miki.
  - Integrating PDF to Excel Backend to Frontend without using renderer (Failed).
  - Managed to Integrate PDF to Excel Backend to Frontend
  - Added working loading animation during conversion
  - Found 2 bugs
      - Cant close div when clicked back button after conversion.
      - Select PDF files button is missing when input-select is cancelled.
  - Added function for PDF to Excel Conversion (Single Sheet or Multiple Sheets).

○ `04/11/2024`
  - Added Checkbox for Include Formatting.
  - Added in and out functions for the toggle.
  - Successfully integrated Split PDF Backend to the new Frontend.
  - Fixed Split PDF bug.
  - Fixed cancel select files bug.
  - Fixed back button bug.
  - Integrated Image to PDF Backend to the new Frontend.
  - Tried to package and build app and found bug on the PDF to Excel.

○ `04/12/2024`
  - Fixed Bugs on PDF to Excel after Built/Packaged.
  - Added Success prompts.
  - Added back Split PDF download.
  - Rebuilt the app to see if theres an error.
  - Added PDF to Docs Backend to the new Frontend.
  - Fixed bug on stacking (save as dialog box) on PDF to Excel and PDF to Word.
