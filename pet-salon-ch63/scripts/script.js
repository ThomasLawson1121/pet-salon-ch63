let pet1 = {
    name: "Bob",
    age: 6,
    gender: "Male",
    service: "Bath",
    breed: "Mixed"
};

let pet2 = {
    name: "Charlie",
    age: 5,
    gender: "Male",
    service: "Vaccination",
    breed: "Mixed"
};

let pet3 = {
    name: "Harlie",
    age: 5,
    gender: "Female",
    service: "Vaccination",
    breed: "Mixed"
};

// 2. Array of pets (rename it so it doesn't conflict with the HTML element)
let pets = [pet1, pet2, pet3];

// 3. Display pet count
function displayPetCount() {
    document.getElementById("petCount").innerText = pets.length;
}

// 4. Display pet names
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

// 5. Run functions when the page loads
displayPetCount();
displayPetNames();


