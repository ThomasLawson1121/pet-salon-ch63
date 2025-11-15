let salon = {
    name: "The Fashion Pet",
    address: {
        street: "123 Main St",
        city: "San Diego",
        zip: "92101"
    },
    phone: "555-555-1234"
};


let pets = [pet1, pet2, pet3];


function displayPetCount() {
    document.getElementById("petCount").innerText = pets.length;
}


function displayPetNames() {
    let list = document.getElementById("petList");
    list.innerHTML = ""; 

    for (let i = 0; i < pets.length; i++) {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = pets[i].name;
        list.appendChild(li);
    }
}

function Pet(name, age, gender, breed, service, type) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.breed = breed;
    this.service = service;
    this.type = type;
}

let pet1 = new Pet("Bob", 6, "Male", "Mixed", "Bath", "Dog");
let pet2 = new Pet("Charlie", 5, "Male", "Mixed", "Vaccination", "Dog");
let pet3 = new Pet("Harlie", 5, "Female", "Mixed", "Hair Cut", "Cat");

displayPetCount();
displayPetNames();


function displaySalonInfo() {
    document.getElementById("salonInfo").innerHTML =
        `${salon.name} – Located at ${salon.address.street}, ${salon.address.city}, ${salon.address.zip}. 
         Phone: ${salon.phone}`;
}

displaySalonInfo();