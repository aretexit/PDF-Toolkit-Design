//<==================================================ANIMATIONS=====================================================================>
function toggleSize(element) {
    var selectedFiles = document.querySelectorAll('.selected-file');
    var selectedFilesSplit = document.querySelectorAll('.selected-file-split');
    var selectedFilesImg = document.querySelectorAll('.selected-file-img');
    var selectedFilesDocs = document.querySelectorAll('.selected-file-docs');
    var selectedFilesExcel = document.querySelectorAll('.selected-file-excel');
    if (selectedFiles.length > 0 ||
        selectedFilesSplit.length > 0 ||
        selectedFilesImg.length > 0 ||
        selectedFilesDocs.length > 0 ||
        selectedFilesExcel.length > 0) {
        return;
    }

    var target = event.target;
    if (target.id === "file-select-btn" || 
    target.id === "file-input" || 
    target.id === "file-select-splitbtn" || 
    target.id === "file-input-split" || 
    target.id === "file-select-imgbtn" || 
    target.id === "file-input-img" || 
    target.id === "file-select-docsbtn" || 
    target.id === "file-input-docs" || 
    target.id === "file-select-excelbtn" || 
    target.id === "file-input-excel" ||
    target.classList.contains("remove-file-btn") ||
    target.classList.contains("selected-file-name") ||
    target.classList.contains("selected-file") ||
    target.classList.contains("file-name-container") ||
    target.classList.contains("fa-xmark") ||
    target.classList.contains("fileicon") ||
    target.classList.contains("remove-file-btn-split") ||
    target.classList.contains("selected-file-name-split") ||
    target.classList.contains("selected-file-split") ||
    target.classList.contains("file-name-container-split") ||
    target.classList.contains("remove-file-btn-img") ||
    target.classList.contains("selected-file-name-img") ||
    target.classList.contains("selected-file-img") ||
    target.classList.contains("file-name-container-img") ||
    target.classList.contains("remove-file-btn-docs") ||
    target.classList.contains("selected-file-name-docs") ||
    target.classList.contains("selected-file-docs") ||
    target.classList.contains("file-name-container-docs")||
    target.classList.contains("remove-file-btn-excel") ||
    target.classList.contains("selected-file-name-excel") ||
    target.classList.contains("selected-file-excel") ||
    target.classList.contains("file-name-container-excel")) {
        return;
    }

    var arrow = element.querySelector('.next');
    var lbldesc = element.querySelector('.lbldesc');
    var lbladd = element.querySelector('.lbladd');
    var btnselect = element.querySelector('.btnselect');
    
    if (element.classList.contains("enlarged")) {
        element.classList.remove("enlarged");
        arrow.classList.add('fadein')
        arrow.style.display = 'block';
        element.classList.add("shrunken");
        btnselect.classList.remove('fadein');
        lbldesc.classList.remove("fadein");
        lbladd.classList.remove("fadein")
        btnselect.style.display = 'none';
        lbladd.style.display = 'none';
        lbldesc.classList.add('fadeout');
    } else {
        element.classList.remove("shrunken");
        element.classList.add("enlarged");
        arrow.classList.add('fadeout');
        arrow.style.display = 'none';
        lbldesc.classList.add("fadein");
        lbladd.classList.add("fadein")
        btnselect.classList.add('fadein');
        btnselect.style.display = 'block';
        lbladd.style.display = 'block';
        lbldesc.classList.remove('fadeout');
    }
}

//<============================================================================================================================>

//<==================================================DATA=====================================================================>

function displaySelectedFiles(files, mode) {
    var selectedFileContainer = document.getElementById(
        mode === 'merge' ? "selected-file-info" : 
        mode === 'split' ? "selected-file-info-split" :
        mode === 'img' ? "selected-file-info-img" :
        mode === 'docs' ? "selected-file-info-docs" :
        "selected-file-info-excel"
    );
    selectedFileContainer.innerHTML = '';
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var fileEntry = document.createElement('div');
            fileEntry.classList.add(
                mode === 'merge' ? 'selected-file' : 
                mode === 'split' ? 'selected-file-split' : 
                mode === 'img' ?    'selected-file-img' :
                mode === 'docs' ?  'selected-file-docs':
                'selected-file-excel');
            
            var fileNameContainer = document.createElement('span');
            fileNameContainer.classList.add(
                mode === 'merge' ? 'file-name-container' : 
                mode === 'split' ? 'file-name-container-split' :
                mode === 'img' ? 'file-name-container-img' :
                mode === 'docs' ?  'file-name-container-docs':
                'file-name-container-excel');
            
            var fileName = document.createElement('span');
            fileName.classList.add(
                mode === 'merge' ? 'selected-file-name' : 
                mode === 'split' ? 'selected-file-name-split' :
                mode === 'img' ? 'selected-file-name-img' :
                mode === 'docs' ?  'selected-file-name-docs' :
                'selected-file-name-excel');
            fileName.textContent = files[i].name;
            
            var iconSpan = document.createElement('span');
            iconSpan.classList.add('fileicon');
            if (mode === 'img') {
                iconSpan.innerHTML = '<i class="fa-solid fa-image"></i>';
            } else {
                iconSpan.innerHTML = '<i class="fa-solid fa-file-lines"></i> ';
            }
            
            var removeBtn = document.createElement('button');
            removeBtn.innerHTML = 'x';
            removeBtn.classList.add(
                mode === 'merge' ? 'remove-file-btn' : 
                mode === 'split' ? 'remove-file-btn-split' :
                mode === 'img' ? 'remove-file-btn-img' :
                mode === 'docs' ?  'remove-file-btn-docs' :
                'remove-file-btn-excel');

            fileNameContainer.appendChild(iconSpan);
            fileNameContainer.appendChild(fileName);
            
            fileEntry.appendChild(fileNameContainer);
            fileEntry.appendChild(removeBtn);
            
            selectedFileContainer.appendChild(fileEntry);
        }
        selectedFileContainer.style.display = "block";
        document.getElementById(
            mode === 'merge' ? 'mergebtn' : 
            mode === 'split' ? 'splitbtn' :
            mode === 'img' ?    'imgbtn' :
            mode === 'docs' ?  'docsbtn' :
            'excelbtn').style.display = "block"; 
    } else {
        selectedFileContainer.style.display = "none"; 
        document.getElementById(
            mode === 'merge' ? "mergebtn" : 
            mode === 'split' ? "splitbtn" :
            mode === 'img' ? "imgbtn" :
            mode === 'docs' ?  "docsbtn" :
            "excelbtn").style.display = "none"; 
        document.getElementById(
            mode === 'merge' ? "file-select-btn" : 
            mode === 'split' ? "file-select-splitbtn" :
            mode === 'img' ? "file-select-imgbtn" :
            mode === 'docs' ?  "file-select-docsbtn":
            "file-select-excelbtn").style.display = "block"; 
    }
}

//<============================================================================================================================>

//<==================================================MERGE=====================================================================>

var btnselect = document.getElementById('file-select-btn');
var btnmerge = document.getElementById('mergebtn');

document.getElementById("file-select-btn").addEventListener("click", function() {
    document.getElementById("file-input").click();
    btnselect.style.display = 'none';
});

document.getElementById("file-input").addEventListener("change", function(event) {
    if (event.target.files.length === 0) {
        document.getElementById("file-select-btn").style.display = "block";
    }
    displaySelectedFiles(event.target.files, 'merge');
});
   
document.getElementById("selected-file-info").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-file-btn")) {
        var fileEntry = event.target.parentElement;
        fileEntry.remove();
        var remainingFiles = document.querySelectorAll('.selected-file');
        if (remainingFiles.length === 0) {
            document.getElementById("selected-file-info").style.display = "none";
            document.getElementById("mergebtn").style.display = "none";
            document.getElementById("file-select-btn").style.display = "block";
        }
    }
});

//<============================================================================================================================>

//<==================================================SPLIT=====================================================================>

var splitbtnselect = document.getElementById('file-select-splitbtn');
var btnsplit = document.getElementById('splitbtn');

document.getElementById("file-select-splitbtn").addEventListener("click", function() {
    document.getElementById("file-input-split").click();
    splitbtnselect.style.display = 'none';
});

document.getElementById("file-input-split").addEventListener("change", function(event) {
    if (event.target.files.length === 0) {
        document.getElementById("file-select-splitbtn").style.display = "block";
    }
    displaySelectedFiles(event.target.files, 'split');
});
   

document.getElementById("selected-file-info-split").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-file-btn-split")) {
        var fileEntrySplit = event.target.parentElement;
        fileEntrySplit.remove();
        var remainingFilesSplit = document.querySelectorAll('.selected-file-split');
        if (remainingFilesSplit.length === 0) {
            document.getElementById("selected-file-info-split").style.display = "none";
            document.getElementById("splitbtn").style.display = "none";
            document.getElementById("file-select-splitbtn").style.display = "block";
        }
    }
});


//<==========================================================================================================================>

//<==================================================IMG=====================================================================>

var imgbtnselect = document.getElementById('file-select-imgbtn');
var btnimg = document.getElementById('imgbtn');

document.getElementById("file-select-imgbtn").addEventListener("click", function() {
    document.getElementById("file-input-img").click();
    imgbtnselect.style.display = 'none';
});

document.getElementById("file-input-img").addEventListener("change", function(event) {
    if (event.target.files.length === 0) {
        document.getElementById("file-select-imgbtn").style.display = "block";
    }
    displaySelectedFiles(event.target.files, 'img');
});
   

document.getElementById("selected-file-info-img").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-file-btn-img")) {
        var fileEntryImg = event.target.parentElement;
        fileEntryImg.remove();
        var remainingFilesImg = document.querySelectorAll('.selected-file-img');
        if (remainingFilesImg.length === 0) {
            document.getElementById("selected-file-info-img").style.display = "none";
            document.getElementById("imgbtn").style.display = "none";
            document.getElementById("file-select-imgbtn").style.display = "block";
        }
    }
});

//<============================================================================================================================>

//<==================================================DOCS=====================================================================>

var docsbtnselect = document.getElementById('file-select-docsbtn');
var btndocs = document.getElementById('docsbtn');

document.getElementById("file-select-docsbtn").addEventListener("click", function() {
    document.getElementById("file-input-docs").click();
    docsbtnselect.style.display = 'none';
});

document.getElementById("file-input-docs").addEventListener("change", function(event) {
    if (event.target.files.length === 0) {
        document.getElementById("file-select-docsbtn").style.display = "block";
    }
    displaySelectedFiles(event.target.files, 'docs');
});
   

document.getElementById("selected-file-info-docs").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-file-btn-docs")) {
        var fileEntryDocs = event.target.parentElement;
        fileEntryDocs.remove();
        var remainingFilesDocs = document.querySelectorAll('.selected-file-docs');
        if (remainingFilesDocs.length === 0) {
            document.getElementById("selected-file-info-docs").style.display = "none";
            document.getElementById("docsbtn").style.display = "none";
            document.getElementById("file-select-docsbtn").style.display = "block";
        }
    }
});

//<============================================================================================================================>

//<==================================================EXCEL=====================================================================>

var excelbtnselect = document.getElementById('file-select-excelbtn');
var btnexcel = document.getElementById('excelbtn');

document.getElementById("file-select-excelbtn").addEventListener("click", function() {
    document.getElementById("file-input-excel").click();
    excelbtnselect.style.display = 'none';
});

document.getElementById("file-input-excel").addEventListener("change", function(event) {
    if (event.target.files.length === 0) {
        document.getElementById("file-select-excelbtn").style.display = "block";
    }
    displaySelectedFiles(event.target.files, 'excel');
});
   

document.getElementById("selected-file-info-excel").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-file-btn-excel")) {
        var fileEntryExcel = event.target.parentElement;
        fileEntryExcel.remove();
        var remainingFilesExcel = document.querySelectorAll('.selected-file-excel');
        if (remainingFilesExcel.length === 0) {
            document.getElementById("selected-file-info-excel").style.display = "none";
            document.getElementById("excelbtn").style.display = "none";
            document.getElementById("file-select-excelbtn").style.display = "block";
        }
    }
});

//<============================================================================================================================>