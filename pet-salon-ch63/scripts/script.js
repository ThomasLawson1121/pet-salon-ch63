


// Pet array
let petSalon = {
    pets: []
};

// Constructor
function Pet(name, age, breed, service) {
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.service = service;
}

// Service constructor
function Service(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
}

// Arrays
let services = [];

/* ====== Pet registration ====== */
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

/* ====== Services registration  ====== */

function registerService() {
    
    if (typeof jQuery === "undefined") return;
    let sName = $("#serviceName");
    let sPrice = $("#servicePrice");
    let sDesc = $("#serviceDesc");

    let inputs = [sName, sPrice, sDesc];
    let valid = true;

    
    inputs.forEach(i => i.removeClass("border-danger"));

    
    inputs.forEach(i => {
        if (i.val().trim() === "") {
            i.addClass("border-danger");
            valid = false;
        }
    });

    if (!valid) return;

    
    let newService = new Service(sName.val().trim(), sPrice.val().trim(), sDesc.val().trim());
    services.push(newService);

    displayServices();
    clearServiceForm();
}

function displayServices() {
    if (typeof jQuery === "undefined") return;
    let table = $("#serviceTableBody");
    table.html("");

    services.forEach(service => {
        let row = `
            <tr>
                <td>${escapeHtml(service.name)}</td>
                <td>${escapeHtml(service.price)}</td>
                <td>${escapeHtml(service.description)}</td>
            </tr>
        `;
        table.append(row);
    });
}

function clearServiceForm() {
    if (typeof jQuery === "undefined") return;
    $("#serviceName").val("");
    $("#servicePrice").val("");
    $("#serviceDesc").val("");

    $("input, textarea").removeClass("border-danger");
}

/* ====== Utilities ====== */

function escapeHtml(unsafe) {
    if (unsafe === undefined || unsafe === null) return "";
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* ====== Dark Mode Toggle ====== */

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

/* ====== Init on load ====== */

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
    }
}); 
