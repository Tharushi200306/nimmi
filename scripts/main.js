/* Dark Mode */
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

/* Projects */
const projects = [
    { title:"Personal Portfolio Website", desc:"My professional student portfolio using HTML, CSS, JS" },
    { title:"Simple Business Website", desc:"Static business site with responsive layout" },
    { title:"Landing Page", desc:"Front-end landing page demo project" },
    { title:"Contact Form", desc:"Functional form with validation and JS" }
];

const projectContainer = document.getElementById("projectContainer");
projects.forEach(p=>{
    const div=document.createElement("div");
    div.className="project";
    div.innerHTML=`<h3>${p.title}</h3><p>${p.desc}</p>`;
    projectContainer.appendChild(div);
});

/* Form Submission */
const form=document.getElementById("contactForm");
form.addEventListener("submit", e=>{
    e.preventDefault();
    alert("Message sent successfully ✅");
    form.reset();
});
