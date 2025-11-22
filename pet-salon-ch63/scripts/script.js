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

// Register function
function registerPet() {
    let name = document.getElementById("txtName").value;
    let age = document.getElementById("txtAge").value;
    let breed = document.getElementById("txtBreed").value;
    let service = document.getElementById("txtService").value;

    if(name === "") {
        alert("Please enter a name");
        return;
    }

    let newPet = new Pet(name, age, breed, service);
    petSalon.pets.push(newPet);

    displayRow();
    clearForm();
}

// Display function (table rows)
function displayRow() {
    let tableBody = document.getElementById("petTableBody");
    tableBody.innerHTML = ""; // Clear table

    petSalon.pets.forEach((pet, index) => {
        let row = `
            <tr>
                <td>${pet.name}</td>
                <td>${pet.age}</td>
                <td>${pet.breed}</td>
                <td>${pet.service}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deletePet(${index})">X</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Delete function
function deletePet(index) {
    petSalon.pets.splice(index, 1);
    displayRow();
}

// Clear form inputs
function clearForm() {
    document.getElementById("txtName").value = "";
    document.getElementById("txtAge").value = "";
    document.getElementById("txtBreed").value = "";
    document.getElementById("txtService").value = "";
}


// Service constructor
function Service(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
}

// Array to store services
let services = [];

function registerService() {
    // Grab fields using jQuery
    let sName = $("#serviceName");
    let sPrice = $("#servicePrice");
    let sDesc = $("#serviceDesc");

    let inputs = [sName, sPrice, sDesc];
    let valid = true;

    // Remove previous red borders
    inputs.forEach(i => i.removeClass("border-danger"));

    // Validate
    inputs.forEach(i => {
        if (i.val().trim() === "") {
            i.addClass("border-danger");
            valid = false;
        }
    });

    if (!valid) return;

    // Create service object
    let newService = new Service(sName.val(), sPrice.val(), sDesc.val());
    services.push(newService);

    displayServices();
    clearServiceForm();
}

function displayServices() {
    let table = $("#serviceTableBody");
    table.html("");

    services.forEach(service => {
        let row = `
            <tr>
                <td>${service.name}</td>
                <td>${service.price}</td>
                <td>${service.description}</td>
            </tr>
        `;
        table.append(row);
    });
}

function clearServiceForm() {
    $("#serviceName").val("");
    $("#servicePrice").val("");
    $("#serviceDesc").val("");

    $("input, textarea").removeClass("border-danger");
}
