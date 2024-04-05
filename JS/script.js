function toggleSize(element) {
    var selectedFiles = document.querySelectorAll('.selected-file');
    if (selectedFiles.length > 0) {
        return;
    }

    var target = event.target;
    if (target.id === "file-select-btn" || 
    target.id === "file-input" || 
    target.classList.contains("remove-file-btn") ||
    target.classList.contains("selected-file-name") ||
    target.classList.contains("selected-file") ||
    target.classList.contains("file-name-container") ||
    target.classList.contains("remove-file-btn") ||
    target.classList.contains("fa-xmark") ||
    target.classList.contains("fileicon")) {
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


var btnselect = document.getElementById('file-select-btn');
var btnmerge = document.getElementById('mergebtn');

document.getElementById("file-select-btn").addEventListener("click", function() {
    console.log("ehhhh");
    document.getElementById("file-input").click();
    btnselect.style.display = 'none';
});

document.getElementById("file-input").addEventListener("change", function(event) {
    if (event.target.files.length === 0) {
        document.getElementById("file-select-btn").style.display = "block";
    }
    displaySelectedFiles(event.target.files);
});
   

function displaySelectedFiles(files) {
    var selectedFileContainer = document.getElementById("selected-file-info");
    selectedFileContainer.innerHTML = '';
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var fileEntry = document.createElement('div');
            fileEntry.classList.add('selected-file');
            
            var fileNameContainer = document.createElement('span');
            fileNameContainer.classList.add('file-name-container');
            
            var fileName = document.createElement('span');
            fileName.classList.add('selected-file-name');
            fileName.textContent = files[i].name;
            
            var iconSpan = document.createElement('span');
            iconSpan.innerHTML = '<i class="fa-solid fa-file-lines fileicon"></i>';
            
            var removeBtn = document.createElement('button');
            removeBtn.innerHTML = 'x';
            removeBtn.classList.add('remove-file-btn');

            fileNameContainer.appendChild(iconSpan);
            fileNameContainer.appendChild(fileName);
            
            fileEntry.appendChild(fileNameContainer);
            fileEntry.appendChild(removeBtn);
            
            selectedFileContainer.appendChild(fileEntry);
        }
        selectedFileContainer.style.display = "block";
        document.getElementById("mergebtn").style.display = "block"; 
    } else {
        selectedFileContainer.style.display = "none"; 
        document.getElementById("mergebtn").style.display = "none"; 
        document.getElementById("file-select-btn").style.display = "block"; 
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