function toggleSize(element) {
    var selectedFiles = document.querySelectorAll('.selected-file');
    var selectedFilesSplit = document.querySelectorAll('.selected-file-split');
    var selectedFilesImg = document.querySelectorAll('.selected-file-img');
    if (selectedFiles.length > 0 ||
        selectedFilesSplit.length > 0 ||
        selectedFilesImg.length > 0) {
        return;
    }

    var target = event.target;
    if (target.id === "file-select-btn" || 
    target.id === "file-input" || 
    target.id === "file-select-splitbtn" || 
    target.id === "file-input-split" || 
    target.id === "file-select-imgbtn" || 
    target.id === "file-input-img" || 
    target.classList.contains("remove-file-btn") ||
    target.classList.contains("selected-file-name") ||
    target.classList.contains("selected-file") ||
    target.classList.contains("file-name-container") ||
    target.classList.contains("remove-file-btn") ||
    target.classList.contains("fa-xmark") ||
    target.classList.contains("fileicon") ||
    target.classList.contains("remove-file-btn-split") ||
    target.classList.contains("selected-file-name-split") ||
    target.classList.contains("selected-file-split") ||
    target.classList.contains("file-name-container-split") ||
    target.classList.contains("remove-file-btn-split") ||
    target.classList.contains("remove-file-btn-img") ||
    target.classList.contains("selected-file-name-img") ||
    target.classList.contains("selected-file-img") ||
    target.classList.contains("file-name-container-img") ||
    target.classList.contains("remove-file-btn-img")) {
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
   

function displaySelectedFiles(files, mode) {
    var selectedFileContainer = document.getElementById(
        mode === 'merge' ? "selected-file-info" : 
        mode === 'split' ? "selected-file-info-split" :
        "selected-file-info-img"
    );
    selectedFileContainer.innerHTML = '';
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var fileEntry = document.createElement('div');
            fileEntry.classList.add(
                mode === 'merge' ? 'selected-file' : 
                mode === 'split' ? 'selected-file-split' : 
                'selected-file-img');
            
            var fileNameContainer = document.createElement('span');
            fileNameContainer.classList.add(
                mode === 'merge' ? 'file-name-container' : 
                mode === 'split' ? 'file-name-container-split' :
                'file-name-container-img');
            
            var fileName = document.createElement('span');
            fileName.classList.add(
                mode === 'merge' ? 'selected-file-name' : 
                mode === 'split' ? 'selected-file-name-split' :
                'selected-file-name-img');
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
                'remove-file-btn-img');

            fileNameContainer.appendChild(iconSpan);
            fileNameContainer.appendChild(fileName);
            
            fileEntry.appendChild(fileNameContainer);
            fileEntry.appendChild(removeBtn);
            
            selectedFileContainer.appendChild(fileEntry);
        }
        selectedFileContainer.style.display = "block";
        document.getElementById(
            mode === 'merge' ? "mergebtn" : 
            mode === 'split' ? "splitbtn" :
            "imgbtn").style.display = "block"; 
    } else {
        selectedFileContainer.style.display = "none"; 
        document.getElementById(
            mode === 'merge' ? "mergebtn" : 
            mode === 'merge' ? "splitbtn" :
            "imgbtn").style.display = "none"; 
        document.getElementById(
            mode === 'merge' ? "file-select-btn" : 
            mode === 'merge' ? "file-select-splitbtn" :
            "file-select-imgbtn").style.display = "block"; 
    }
}

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
