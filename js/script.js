// 1. Logika Efek Fade-In saat Scroll (Intersection Observer)
const scrollObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            setTimeout(resizeCanvas, 300);
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=>scrollObserver.observe(el));

// 2. Logika Efek Sorot Lampu Kursor (Glow Cursor)
const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// 3. Logika Efek Partikel Bintang Bergerak Seluruh Halaman
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight,
        document.body.clientHeight, 
        document.documentElement.clientHeight
    );
}

window.addEventListener('resize', () => {
    resizeCanvas();
    init(); 
});
window.addEventListener('load', () => {
    resizeCanvas();
    init();
});

const particlesArray = [];
const numberOfParticles = 250; 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height; 
        this.size = Math.random() * 2 + 0.5; 
        this.speedY = Math.random() * 0.3 + 0.1; 
        this.opacity = Math.random() * 0.7 + 0.3;
    }

    update() {
        this.y -= this.speedY; 
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function init() {
    particlesArray.length = 0; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
init();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

resizeCanvas();
init();
animateParticles();

const bodyResizeObserver = new ResizeObserver(() => resizeCanvas());
bodyResizeObserver.observe(document.body);

// =========================================================
// LOGIKA MODAL POPUP JAVASCRIPT GLOBAL
// =========================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
}

// Memuat komponen Creative Industry Projects ke index.html
document.addEventListener("DOMContentLoaded", function () {
  fetch("component/creative-project.html")
    .then((response) => {
      if (!response.ok) throw new Error("File komponen tidak ditemukan");
      return response.text();
    })
    .then((data) => {
      document.getElementById("creative-project-container").innerHTML = data;
    })
    .catch((error) => console.error("Gagal memuat project kreatif:", error));
});

const skillsData = [
  { name: "Autodesk Inventor", image: "image-skills/inventor.png", badge: "3D CAD" },
  { name: "Microsoft Office", image: "image-skills/office.jpg", badge: "Productivity" },
  { name: "CapCut", image: "image-skills/cpcut.png", badge: "Video Editing" },
  { name: "Canva", image: "image-skills/canva.jpg", badge: "Graphic Design" },
  { name: "Lightroom", image: "image-skills/LR.png", badge: "Photo Editing" }
];

function renderSkills() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const cardsHTML = skillsData.map(skill => `
    <div class="skill-card">
      <div class="skill-icon-box">
        <img src="${skill.image}" alt="${skill.name}" class="skill-icon">
      </div>
      <h3 class="skill-title">${skill.name}</h3>
      <span class="skill-badge">${skill.badge}</span>
    </div>
  `).join('');

  skillsSection.innerHTML = `
    <div class="skills-container">
      <h2 class="section-title">Skills</h2>
      <p class="section-subtitle">Software & Alat Utama yang Saya Kuasai</p>
      <div class="skills-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderSkills);