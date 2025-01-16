const collaboratorList = document.getElementById("collaborator-list");
const searchInput = document.getElementById("search");
const clearSearchButton = document.getElementById("clear-search");
const addCollaboratorInput = document.getElementById("add-collaborator");
const addButton = document.getElementById("add-button");

let collaborators = ["Ana Silva", "Bruno Souza", "Carla Mendes", "Diego Oliveira", "Eduarda Lima"];

function renderList(filter = "") {
    collaboratorList.innerHTML = "";

    const filteredCollaborators = collaborators.filter(name =>
        name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredCollaborators.forEach(name => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;

        const presenceButton = document.createElement("button");
        presenceButton.textContent = "Registrar Presença";
        presenceButton.classList.add("button");
        presenceButton.onclick = () => {
            const now = new Date();
            alert(`${name} registrou presença em: ${now.toLocaleDateString()} às ${now.toLocaleTimeString()}`);
        };

        listItem.appendChild(nameSpan);
        listItem.appendChild(presenceButton);

        collaboratorList.appendChild(listItem);
    });
}

searchInput.addEventListener("input", () => {
    renderList(searchInput.value);
});

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    renderList();
});

clearSearchButton.innerHTML = '<i class="fas fa-times"></i>';
addButton.innerHTML = '<i class="fas fa-plus"></i>';

addButton.addEventListener("click", () => {
    const newName = addCollaboratorInput.value.trim();
    if (newName) {
        collaborators.push(newName);
        addCollaboratorInput.value = "";
        renderList();
    } else {
        alert("Por favor, insira um nome válido!");
    }
});

renderList();