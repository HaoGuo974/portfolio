// Gestion de la modale
const openCvBtn = document.getElementById('openCvBtn');
const cvModal = document.getElementById('cvModal');
const closeModal = document.getElementById('closeModal');
const body = document.body;

function toggleModal(open) {
  if (open) {
    cvModal.style.display = 'block';
    body.classList.add('modal-open'); // Ajoute une classe au body
  } else {
    cvModal.style.display = 'none';
    body.classList.remove('modal-open');
  }
}

openCvBtn.addEventListener('click', () => toggleModal(true));
closeModal.addEventListener('click', () => toggleModal(false));

// Fermer en cliquant à l'extérieur
cvModal.addEventListener('click', (e) => {
  if (e.target === cvModal) toggleModal(false);
});


// Liste des projets organisés par catégorie
const projectsData = {
    academic: [
        { title: "Senior Sport App", desc: "Web platform for health professionnals to create customized exercise programs. Patients have access to their plans and track progress.", img: "images/6150-img-preview.png", link: "web1.html", techs: ["Node.js - PostgreSQL - React"] },
        { title: "Binary Research Trees", desc: "Implementation of binary search trees with core functions (insertion, deletion, search) and operation visualization on shell. Academic project on data structures.", img: "images/binary-img-preview.png", link: "web1.html", techs: ["C++"] },
        { title: "Contract Reimbursement", desc: "Automated script processing contract reimbursements from JSON files. Analyzes clauses, calculates eligible amounts, and generates reports.", img: "images/json-img-preview.png", link: "#", techs: ["Java - SQL"]  },
        { title: "Find Lost Documents App", desc: "Document recovery system where users can locate misplaced files by querying metadata (filename, date, type) stored in a relational database.", img: "images/oracle-img-preview.png", link: "web1.html", techs: ["Java - Oracle"]  },
        { title: "A project in C", desc: "", img: "images/", link: "web1.html", techs: ["C"]}

    ],
    personal: [
        { title: "Portfolio", desc: "Second take interactive portfolio showcasing my technical projects. It highlights my back-end and front-end development skills .", img: "images/web2-img-preview.png", link: "index.html",  techs: ["HTML - CSS - JS"] },
        { title: "Bidding Website", desc: "Online bidding platform with working user authentication, real-time bidding system, and profile management.", img: "images/", link: "web1.html",  techs: ["HTML - Python - Django"] },
        { title: "Object Detection Video", desc: "Real-time object detection application for video streams using OpenCV and YOLO. Identifies and returns tracked objects with dynamic annotations.", img: "images/detection-img-preview.png", link: "#",  techs: ["Python - APIs"] },
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
        case "academic": return "Academic";
        case "personal": return "Personal";
        default: return "";
    }
}

function addProjects(container, category) {
    let projects = projectsData[category];

    projects.forEach((project, index) => {
        let projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        // Génération des badges de technologies
        const techBadges = project.techs 
            ? project.techs.map(tech => `<span class="tech-badge">${tech}</span>`).join("")
            : "";

        projectCard.innerHTML = `
            <a href="${project.link}" class="project-item">
                <div class="left-project-content">
                    <img src="${project.img}" alt="${project.title}">
                </div>  
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <button class="tech-stack">${techBadges}</button>
                </div>
            </a>
        `;

        container.appendChild(projectCard);
        setTimeout(() => projectCard.classList.add("visible"), index * 100);
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
    toggleProjects('academic'); // Ouvre la catégorie "selected" par défaut
};



// NOUVEAU DESIGN
const writings = document.querySelectorAll(".writing");
let currentIndex = 0;

function showWriting(newIndex, direction = "right") {
    if (newIndex === currentIndex) return;

    const current = writings[currentIndex];
    const next = writings[newIndex];

    current.classList.remove("active");
    current.classList.add(direction === "right" ? "exit-left" : "exit-right");

    next.classList.remove("exit-left", "exit-right");
    next.classList.add("active");

    setTimeout(() => {
        current.classList.remove("exit-left", "exit-right");
    }, 500);

    currentIndex = newIndex;
}

function showPrev() {
    showWriting((currentIndex - 1 + writings.length) % writings.length, "left", "writing");
}

function showNext() {
    showWriting((currentIndex + 1) % writings.length, "right", "writing");
}


// --------- Project Cards Scroll ---------
const projectsContainer = document.getElementById("projects-container");
const prevProjectBtn = document.getElementById("projects-prev");
const nextProjectBtn = document.getElementById("projects-next");

if (prevProjectBtn && nextProjectBtn && projectsContainer) {
    prevProjectBtn.addEventListener("click", () => {
        projectsContainer.scrollBy({ left: -600, behavior: "smooth" });
    });

    nextProjectBtn.addEventListener("click", () => {
        projectsContainer.scrollBy({ left: 600, behavior: "smooth" });
    });
}


const mappings = {
    timeline1: { content: 'automn23', date: 'date-aut23' },
    timeline2: { content: 'winter24', date: 'date-win24' },
    timeline3: { content: 'summer24', date: 'date-sum24' },
    timeline4: { content: 'automn24', date: 'date-aut24' },
    timeline5: { content: 'winter25', date: 'date-win25' }
};

Object.entries(mappings).forEach(([timelineClass, { content: contentClass, date: dateClass }]) => {
    const timeline = document.querySelector(`.${timelineClass}`);
    const content = document.querySelector(`.${contentClass}`);
    const date = document.querySelector(`.${dateClass}`);

    // Quand tu survoles .timeline, affiche la date avec transition
    timeline.addEventListener('mouseenter', () => {
        if (!content.classList.contains('active')) {
            content.style.border = '3px solid';
            content.style.borderImage = 'linear-gradient(to right, #CFBAE1, #EDE7F6, #B3E5FC) 1';
        }

        if (date) {
            date.style.opacity = 1;  // Rendre visible avec une transition
        }
    });

    // Quand tu quittes le survol de .timeline, cache la date en douceur
    timeline.addEventListener('mouseleave', () => {
        if (!content.classList.contains('active')) {
            content.style.borderImage = 'none';
            content.style.borderColor = 'black';
        }

        if (!content.classList.contains('active') && date) {
            date.style.opacity = 0;  // Cacher avec une transition douce
        }
    });

    // Lors du clic, toggle l'état "active" et garder la date affichée
    timeline.addEventListener('click', () => {
        // Ne pas désactiver les autres timelines
        content.classList.toggle('active');
        timeline.classList.toggle('active');

        // Gérer l'affichage de la bordure et de la date pour chaque élément
        if (content.classList.contains('active')) {
            content.style.border = '3px solid';
            content.style.borderImage = 'linear-gradient(to right, #CFBAE1, #EDE7F6, #B3E5FC) 1';
            if (date) date.style.opacity = 1;  // Afficher la date avec transition
        } else {
            content.style.borderImage = 'none';
            content.style.borderColor = 'black';
            if (date) date.style.opacity = 0;  // Cacher la date si non active
        }
    });
});

let lastScrollTime = 0;
const SCROLL_COOLDOWN = 800; // ms entre chaque scroll

window.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastScrollTime < SCROLL_COOLDOWN) {
        e.preventDefault();
        return;
    }

    // Ignore les petits déplacements de molette
    if (Math.abs(e.deltaY) < 30) return;

    const direction = Math.sign(e.deltaY);
    const sections = Array.from(document.querySelectorAll('section[id$="-section"], footer'));
    const currentSection = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight * 0.3;
    });

    if (!currentSection) return;

    const currentIndex = sections.indexOf(currentSection);
    let targetIndex = currentIndex + direction;

    // Vérifie les limites
    if (targetIndex < 0 || targetIndex >= sections.length) {
        return;
    }

    lastScrollTime = now;
    sections[targetIndex].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });

}, { passive: false });
