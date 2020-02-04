            let profilesDiv = document.getElementById('profilesDiv');
let myWindow = localStorage;

window.onload = function(e) {
    for(var i = 0; i < myWindow.length; i++) {
        let sKey = myWindow.key(i);
        loadArtistFromStorage(sKey, myWindow.getItem(sKey));       
    }
}

function showAddArtistForm() {
    let form = document.getElementById('inputForm');
    if(form.style.display == "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}

function addArtistButton() {
    
    let name = document.getElementById('addName').value;
    let about = document.getElementById('addAbout').value;
    let url = document.getElementById('addImageURL').value;
    let div = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let text = document.createTextNode(about);
    let br = document.createElement("br");
    let btn = document.createElement("button");

    div.classList.add("profile");
    btn.classList.add("deleteButton");
    btn.onclick = function() {deleteButton(this)};
    btn.textContent = "Delete";
    img.src = url;
    img.style.float = "left";
    img.style.padding = "0px 10px";
    div.appendChild(img);
    span.textContent = name;
    p.appendChild(span);
    p.appendChild(br);
    p.appendChild(text);
    p.appendChild(btn);
    div.appendChild(p);

    
    var keyname = name;
    myWindow.setItem(name.toString(), [about, url]);
    profilesDiv.appendChild(div);

}

function loadArtistFromStorage(key, value) {
    
    let name = key;
    let arrParam = value.split(",")
    let about = arrParam[0].toString();
    let url = arrParam[1].toString();

    console.log(about);
    console.log(url);

    let div = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let text = document.createTextNode(about);
    let br = document.createElement("br");
    let btn = document.createElement("button");

    div.classList.add("profile");
    btn.classList.add("deleteButton");
    btn.onclick = function() {deleteButton(this)};
    btn.textContent = "Delete";
    img.src = url;
    img.style.float = "left";
    img.style.padding = "0px 10px";
    div.appendChild(img);
    span.textContent = name;
    p.appendChild(span);
    p.appendChild(br);
    p.appendChild(text);
    p.appendChild(btn);
    div.appendChild(p);

    profilesDiv.appendChild(div);

}


function deleteButton(node) {
    let profiles = document.getElementById('profilesDiv');
    profiles.removeChild(node.parentNode.parentNode);
    myWindow.removeItem(node.parentNode.getElementsByTagName('span')[0].textContent);
}

function filterSearch() {
    let searchBarValue = document.getElementById('topInput').value.toLowerCase();

    console.log(searchBarValue);
    if(searchBarValue == "") {
        
        for(let i = 0; i < document.querySelectorAll("#profilesDiv div").length; i++) {
            document.querySelectorAll("#profilesDiv div")[i].style.display = "block";
        }
    }

    for(let i = 0; i < document.getElementById('profilesDiv').getElementsByTagName('div').length; i++) {
        let name = document.querySelectorAll("#profilesDiv div")[i].getElementsByTagName('span')[0].textContent;
        if(!name.toLowerCase().includes(searchBarValue)) {
            document.querySelectorAll("#profilesDiv div")[i].style.display = "none";
        }
    }
}
alert("To reset the search field, press search when the input is empty");