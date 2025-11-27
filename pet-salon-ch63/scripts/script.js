let petSalon = {
    pets: []
};

function Pet(name, age, breed, service) {
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.service = service;
}

function Service(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
}

let services = []; 


function registerService() {
    if (typeof jQuery === "undefined") return;
    let sName = $("#serviceName");
    let sPrice = $("#servicePrice");
    let sDesc = $("#serviceDesc");

    let inputs = [sName, sPrice, sDesc];
    let valid = true;

    inputs.forEach(i => i.removeClass("border-danger"));
    inputs.forEach(i => {
        if (i.val().trim() === "" || (i.attr('id') === 'servicePrice' && (isNaN(parseFloat(i.val())) || parseFloat(i.val()) <= 0))) {
            i.addClass("border-danger");
            valid = false;
        }
    });

    if (!valid) return;

    localStorage.setItem("lastServiceName", sName.val().trim());
    localStorage.setItem("lastServicePrice", parseFloat(sPrice.val()).toFixed(2));
    localStorage.setItem("lastServiceDesc", sDesc.val().trim());
    
    clearServiceForm();
    displayServices(); 

}

function displayServices() {
    if (typeof jQuery === "undefined") return;
    let table = $("#serviceTableBody");
    
    table.html("");

    const name = localStorage.getItem("lastServiceName");
    const price = localStorage.getItem("lastServicePrice");
    const description = localStorage.getItem("lastServiceDesc");

    if (name) {
        let formattedPrice = `$${parseFloat(price).toFixed(2)}`;
        let row = `
            <tr>
                <td>${escapeHtml(name)}</td>
                <td>${formattedPrice}</td>
                <td>${escapeHtml(description)}</td>
            </tr>
        `;
        table.append(row);
    } else {
        table.append('<tr><td colspan="3" class="text-center text-muted">No saved service data available.</td></tr>');
    }
}

function clearServiceForm() {
    if (typeof jQuery === "undefined") return;
    $("#serviceName").val("");
    $("#servicePrice").val("");
    $("#serviceDesc").val("");

    $("input, textarea").removeClass("border-danger");
}

function registerPet() {
    let name = document.getElementById("txtName")?.value.trim() || "";
    let age = document.getElementById("txtAge")?.value.trim() || "";
    let breed = document.getElementById("txtBreed")?.value.trim() || "";
    let service = document.getElementById("txtService")?.value.trim() || "";

    let inputs = ["txtName","txtAge","txtBreed","txtService"];
    let valid = true;
    inputs.forEach(id => {
        let el = document.getElementById(id);
        if(!el) return;
        if(el.value.trim() === "") {
            el.classList.add("border-danger");
            valid = false;
        } else {
            el.classList.remove("border-danger");
        }
    });
    if(!valid) return;

    let newPet = new Pet(name, age, breed, service);
    petSalon.pets.push(newPet);

    displayRow();
    clearForm();
}

function displayRow() {
    let tableBody = document.getElementById("petTableBody");
    if(!tableBody) return;
    tableBody.innerHTML = ""; 

    petSalon.pets.forEach((pet, index) => {
        let row = `
            <tr>
                <td>${escapeHtml(pet.name)}</td>
                <td>${escapeHtml(pet.age)}</td>
                <td>${escapeHtml(pet.breed)}</td>
                <td>${escapeHtml(pet.service)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deletePet(${index})">X</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function deletePet(index) {
    petSalon.pets.splice(index, 1);
    displayRow();
}

function clearForm() {
    let ids = ["txtName","txtAge","txtBreed","txtService"];
    ids.forEach(id => {
        let el = document.getElementById(id);
        if(el) {
            el.value = "";
            el.classList.remove("border-danger");
        }
    });
}



function escapeHtml(unsafe) {
    if (unsafe === undefined || unsafe === null) return "";
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function setDarkMode(enabled) {
    if(enabled){
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    try { localStorage.setItem("tommys_dark_mode", enabled ? "1" : "0"); } catch(e){}
    let btn = document.getElementById("darkToggle");
    if(btn){
        btn.innerText = enabled ? "Light" : "Dark";
    }
}

function toggleDarkMode(){
    let enabled = document.body.classList.contains("dark-mode");
    setDarkMode(!enabled);
}


document.addEventListener("DOMContentLoaded", function(){
    
    try {
        let saved = localStorage.getItem("tommys_dark_mode");
        if(saved === "1") setDarkMode(true);
    } catch(e){}

    let t = document.getElementById("darkToggle");
    if(t){
        t.addEventListener("click", function(e){
            e.preventDefault();
            toggleDarkMode();
        });
    }

    if(window.jQuery) {
        $(".faw-item").click(function() {
            $(this).find(".answer").toggle();
        });
        
        if(document.getElementById("serviceTableBody")) {
            displayServices(); 

 
            $("#retrieveServiceBtn").click(function(e) {
                e.preventDefault();

                const name = localStorage.getItem("lastServiceName");
                const price = localStorage.getItem("lastServicePrice");
                const description = localStorage.getItem("lastServiceDesc");

                $("#serviceName").val(name || "");
                $("#servicePrice").val(price || "");
                $("#serviceDesc").val(description || "");
                

            });

            $("#deleteServiceBtn").click(function(e) {
                e.preventDefault();
                
                localStorage.removeItem("lastServiceName");
                localStorage.removeItem("lastServicePrice");
                localStorage.removeItem("lastServiceDesc");

                clearServiceForm();
                displayServices(); 
                
            });
        }
    }
});