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
