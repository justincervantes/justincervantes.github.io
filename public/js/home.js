let profilesDiv = document.getElementById('profilesDiv');


window.onload = function(e) {
    fetch('/artists/load', {
        method : 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }})    
        .then((response) => response.json())
        .then((data) => {
            for(let i = 0; i < data["profiles"].length; i++) {
                this.loadArtistFromServer(
                    data["profiles"][i].name,
                    data["profiles"][i].about,
                    data["profiles"][i].url)
            }
        })
        .catch((err) => console.log(err));
}

function showAddArtistForm() {
    let form = document.getElementById('inputForm');
    if(form.style.display == "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}

async function addArtistButton() {
    
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

    
    // var keyname = name;
    // myWindow.setItem(name.toString(), [about, url]);
    profilesDiv.appendChild(div);

    let user = {
        name: name,
        about : about,
        url : url
    };

    fetch('/artist/add', {
    method : 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(user)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err));

}

function deleteButton(node) {

    let udata = {
        data : node.parentNode.querySelectorAll('span')[0].textContent
    };
   

    fetch('/artist/delete', {
        method : 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(udata)
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.log(err));

        document.getElementById('profilesDiv').removeChild(node.parentNode.parentNode);
}

function filterSearch() {
    
    let searchBarValue = {
        data : document.getElementById('topInput').value.toLowerCase()
    }

    fetch('/artist/search', {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(searchBarValue)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            profilesDiv.innerHTML = '';
            for(let i = 0; i < data["profiles"].length; i++) {
                loadArtistFromServer(data["profiles"][i].name,
                    data["profiles"][i].about,
                    data["profiles"][i].url)    
            }
        })
        .catch((err) => console.log(err));
}

function loadArtistFromServer(passedname, passedabout, passedurl) {
    
    let name = passedname;
    let about = passedabout;
    let url = passedurl;

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

alert("To reset the search field, press search when the input is empty");