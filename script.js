// Récupérer les éléments
const modal = document.getElementById("cvModal");
const openModalBtn = document.getElementById("openCvBtn");
const closeModalBtn = document.getElementById("closeModal");

// Ouvrir la modale
openModalBtn.onclick = function() {
    modal.style.display = "flex";  // Afficher la modale
}

// Fermer la modale
closeModalBtn.onclick = function() {
    modal.style.display = "none";  // Cacher la modale
}

// Fermer la modale si l'utilisateur clique en dehors de la fenêtre modale
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";  // Cacher la modale si l'utilisateur clique à l'extérieur
    }
}





// Liste des projets organisés par catégorie
const projectsData = {
    selected: [
        { title: "Selected 1", desc: "Selected 1", img: "https://via.placeholder.com/600x300", link: "#" },
        { title: "Selected 2", desc: "Selected 2", img: "https://via.placeholder.com/600x300", link: "#" }
    ],
    web: [
        { title: "Animals Adoption Website", desc: "A project backend and frontend.", img: "images/web1-img-preview.png", link: "web1.html" },
        { title: "Portfolio", desc: "My modest Portfolio.", img: "images/web2-img-preview.png", link: "index.html" }
    ],
    games: [
        { title: "Space Adventure", desc: "Un jeu 2D en Unity.", img: "https://via.placeholder.com/600x300", link: "#" },
        { title: "Battle Arena", desc: "Un jeu de combat en Godot.", img: "https://via.placeholder.com/600x300", link: "#" },
        { title: "Puzzle Quest", desc: "Un jeu de réflexion en Pygame.", img: "https://via.placeholder.com/600x300", link: "#" }
    ],
    scripts: [
        { title: "Automatisation Linux", desc: "Script Shell pour gérer les serveurs.", img: "https://via.placeholder.com/600x300", link: "#" },
        { title: "Convertisseur JSON-CSV", desc: "Script Python de conversion.", img: "https://via.placeholder.com/600x300", link: "#" }
    ]
};

let activeCategory = null;

function toggleProjects(category) {
    const container = document.getElementById("projects-container");
    const buttons = document.querySelectorAll(".category-btn");

    // Si la catégorie est déjà active, on la ferme
    if (activeCategory === category) {
        // Fermer la catégorie actuelle
        removeOldProjects(() => {});
        activeCategory = null;

        // Enlever la classe active du bouton
        buttons.forEach(btn => btn.classList.remove("active"));
        return;
    }

    // Sinon, changer de catégorie
    const previous = activeCategory;
    activeCategory = category;

    // Mettre à jour l'état des boutons
    buttons.forEach(btn => {
        // Ajouter la classe active uniquement au bouton de la catégorie active
        if (btn.textContent.includes(categoryToLabel(category))) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Supprimer les anciens projets, puis ajouter les nouveaux projets
    removeOldProjects(() => {
        addProjects(container, category);
    });
}

function categoryToLabel(category) {
    switch (category) {
        case "selected": return "Selected";
        case "web": return "Websites";
        case "games": return "Applications";
        case "scripts": return "Scripts";
        default: return "";
    }
}

function addProjects(container, category) {
    let projects = projectsData[category];

    projects.forEach((project, index) => {
        let projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        projectCard.innerHTML = `
            <a href="${project.link}" class="project-item">
            <div class="left-project-content">
                <img src="${project.img}" alt="${project.title}">
            </div>  
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
            </div>
            </a>
        `;

        container.appendChild(projectCard);

        // Ajouter un délai progressif pour un effet fluide
        setTimeout(() => {
            projectCard.classList.add("visible");
        }, index * 100);
    });
}

function removeOldProjects(callback) {
    let container = document.getElementById("projects-container");
    let oldCards = container.querySelectorAll(".project-card");

    if (oldCards.length === 0) {
        callback(); // S'il n'y a pas de projets à supprimer, on ajoute les nouveaux directement
        return;
    }

    oldCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("removing");
        }, index * 100);

        setTimeout(() => {
            card.remove();
            if (index === oldCards.length - 1) {
                callback(); // Appeler la fonction d'ajout une fois toutes les cartes supprimées
            }
        }, 500);
    });
}

window.onload = function() {
    toggleProjects('selected'); // Ouvre la catégorie "selected" par défaut
};

