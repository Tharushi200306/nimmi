const events = [
   
    {
        title: "Opening Keynote: The Future of AI",
        type: "Keynote",
        date: "2025-11-20T09:00:00",
        description: "Join industry visionary Dr. Evelyn Reed as she unveils the next decade of AI innovation.",
        image: "WhatsApp Image 2025-11-13 at 21.11.03.jpeg"
    },
    {
        title: "Advanced JavaScript Workshop",
        type: "Workshop",
        date: "2025-11-20T10:30:00",
        description: "A 3-hour, hands-on deep-dive into asynchronous JavaScript, Promises, and modern ES6+ features.",
        image: "WhatsApp Image 2025-11-13 at 21.48.58.jpeg"
    },
     {
        title: "Cybersecurity in the Cloud Era",
        type: "Talk",
        date: "2025-11-20T11:00:00",
        description: "Nov 20, 2025, 11:00Am Cybersecurity in the Cloud Era",
        image: "WhatsApp Image 2025-11-13 at 21.21.49.jpeg"
    },
    {
        title: "Introduction to Quantum Computing",
        type: "Talk",
        date: "2025-11-20T14:00:00",
        description: " Introys with eachers, soddeson",
        image: "WhatsApp Image 2025-11-13 at 21.48.54.jpeg"
    },
     {
        title: "Notworking Mixer & Welcome Reception",
        type: "Social",
        date: "2025-11-20T17:00:00",
        description: "Networking miver & welcome reception",
        image: "WhatsApp Image 2025-11-13 at 22.04.33.jpeg"
    },
    {
        title: "The Ethics of Machine Learning",
        type: "Panel",
        date: "2025-11-21T09:00:00",
        description: " From cooling to tyour seolls",
        image: "WhatsApp Image 2025-11-13 at 22.04.31.jpeg"
    },
    
    // Add all other events here...
];

let filteredType = "All";
let searchQuery = "";

// Display events function
function displayEvents() {
    const container = document.getElementById("event-container");
    container.innerHTML = "";

    const filteredEvents = events.filter(event => {
        const matchType = filteredType === "All" || event.type === filteredType;
        const matchSearch = event.title.toLowerCase().includes(searchQuery) ||
                            event.description.toLowerCase().includes(searchQuery);
        return matchType && matchSearch;
    });

    filteredEvents.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-card-content">
                <h2>${highlightText(event.title, searchQuery)}</h2>
                <p><strong>Type:</strong> ${event.type}</p>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
                <p>${highlightText(event.description, searchQuery)}</p>
                <div class="countdown" data-date="${event.date}"></div>
                <button class="add-calendar">Add to Calendar</button>
            </div>
        `;
        container.appendChild(card);
    });

    updateCountdowns();
}

// Highlight search text
function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}

// Countdown logic
function updateCountdowns() {
    const countdowns = document.querySelectorAll(".countdown");
    countdowns.forEach(cd => {
        const eventDate = new Date(cd.dataset.date);
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            cd.textContent = "Event has ended";
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            cd.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    });
}

// Filters
document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        filteredType = btn.dataset.type;
        document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        displayEvents();
    });
});

// Search
document.getElementById("search").addEventListener("input", e => {
    searchQuery = e.target.value.toLowerCase();
    displayEvents();
});

// Dark/Light Mode with localStorage
const themeToggle = document.getElementById("theme-toggle");
const userPref = localStorage.getItem("theme");

if (userPref) {
    document.body.classList.toggle("dark", userPref === "dark");
    themeToggle.textContent = userPref === "dark" ? "☀️" : "🌙";
} else {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", darkMode);
    themeToggle.textContent = darkMode ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// Add to Google Calendar
document.addEventListener("click", function(e){
    if(e.target && e.target.classList.contains("add-calendar")){
        const card = e.target.closest(".event-card");
        const title = card.querySelector("h2").innerText;
        const dateStr = card.querySelector(".countdown").dataset.date;
        const start = new Date(dateStr).toISOString().replace(/-|:|\.\d+/g,"");
        const end = new Date(new Date(dateStr).getTime() + 60*60*1000).toISOString().replace(/-|:|\.\d+/g,""); // 1-hour event

        const gcalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(title)}&sf=true&output=xml`;
        window.open(gcalUrl, "_blank");
    }
});


// Initial display
document.addEventListener("DOMContentLoaded", () => {
    displayEvents();
    setInterval(updateCountdowns, 1000); // update countdown every second
});
