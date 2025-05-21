const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const container = document.querySelector(".container");



const sections = {
    dashboard: document.getElementById('dashboard-section'),
    profile: document.getElementById('profile-section'),
    settings: document.getElementById('settings-section'),
    map: document.getElementById("map-section")
};

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
    // container.classList.add('sidebar-open');
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
    // container.classList.remove('sidebar-open');
});


const sidebarLinks = document.querySelectorAll('.sidebar a');
const main = document.querySelector('main');

// sidebarLinks.forEach(link => {
//     link.addEventListener('click', function(e){
//         e.preventDefault();
//         sidebarLinks.forEach(l => l.classList.remove('active'));
//         this.classList.add('active');
//         const section = this.getAttribute('data-section');
//         switch(section){
//             case 'dashboard':
//                 main.innerHTML = '<h1>Dashboard</h1><p>This is the dashboard section.</p>';
//                 break;
//             case 'profile':
//                 main.innerHTML = '<h1>Profile</h1><p>This is the profile section.</p>';
//                 break;
//             case 'settings':
//                 main.innerHTML = '<h1>Settings</h1><p>This is the settings section.</p>';
//                 break;
//             case 'radar':
//                 main.innerHTML = '<h1>Radar</h1><p>This is the radar section.</p>';
//                 break;
//             case 'notifications':
//                 main.innerHTML = '<h1>Notifications</h1><p>This is the notifications section.</p>';
//                 break;
//             case 'logout':
//                 main.innerHTML = '<h1>Logout</h1><p>You have been logged out.</p>';
//                 break;
//             default:
//                 main.innerHTML = '<h1>Dashboard</h1><p>This is the dashboard section.</p>';
//         }
//     })
// })


sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e){
        const section = this.getAttribute('data-section');
        if (section) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // Hide all sections
            Object.values(sections).forEach(sec => sec.style.display = 'none');
            // Show the selected section
            if(sections[section]) sections[section].style.display = 'block';
        }
        // If no data-section, let the link work normally (e.g., logout)
    });
});




// --- Weather Map for #map-section ---
let map, currentLayer;
const radarLayers = {};

function initWeatherMap() {
    if (map) return; // Prevent re-initialization

    map = L.map('map').setView([23.8103, 90.4125], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    radarLayers.rain = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY');
    radarLayers.snow = L.tileLayer('https://tile.openweathermap.org/map/snow_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY');
    radarLayers.satellite = L.tileLayer('https://tile.openweathermap.org/map/satellite_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY');

    map.on('click', function (e) {
        alert(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
    });
}

window.toggleLayer = function(type) {
    if (!map) initWeatherMap();
    if (currentLayer) map.removeLayer(currentLayer);
    currentLayer = radarLayers[type];
    currentLayer.addTo(map);
};

window.playRadar = function() {
    if (!map) initWeatherMap();
    let frames = ['01', '02', '03', '04', '05'];
    let i = 0;
    let interval = setInterval(() => {
        if (currentLayer) map.removeLayer(currentLayer);
        currentLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/${frames[i]}/{z}/{x}/{y}.png?appid=YOUR_API_KEY`);
        currentLayer.addTo(map);
        i++;
        if (i >= frames.length) clearInterval(interval);
    }, 500);
};

// Optionally, initialize the map when the section is shown:
const mapSection = document.getElementById('map-section');
const observer = new MutationObserver(() => {
    if (mapSection.style.display !== 'none') {
        setTimeout(initWeatherMap, 100); // Delay to ensure #map is visible
    }
});
observer.observe(mapSection, { attributes: true, attributeFilter: ['style'] });


document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
});