const container = document.querySelector(".container");
const postForm = document.getElementById("postForm");

function createUserCard(userData) {
    const card = document.createElement("div");
    card.className = "user-card new-card";

    const lat = 47.1625 + (Math.random() * 4 - 2);
    const lng = 19.5033 + (Math.random() * 4 - 2);
    
    card.innerHTML = `
        <h2 class="user-name">${userData.name}</h2>
        <p class="username">@${userData.username}</p>
        <div class="contact-info">
            <p><i class="fas fa-envelope"></i> ${userData.email}</p>
            <p><i class="fas fa-phone"></i> ${userData.phone}</p>
            <p><i class="fas fa-globe"></i> ${userData.website}</p>
            <p><i class="fas fa-home"></i> ${userData.address.street}, ${userData.address.city}<br>
            ${userData.address.zipcode}</p>
        </div>
        <div class="map-container" id="map-${Date.now()}"></div>
        <div class="company">
            <p><i class="fas fa-building"></i> ${userData.company.name}</p>
            <p>"${userData.company.catchPhrase}"</p>
            <p>${userData.company.bs}</p>
        </div>
    `;
    
    container.prepend(card);

    setTimeout(() => {
        const map = L.map(card.querySelector('.map-container').id).setView([lat, lng], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${userData.name}</b><br>${userData.address.city}`)
            .openPopup();
    }, 100);
}

postForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById("postName").value,
        username: document.getElementById("postUsername").value,
        email: document.getElementById("postEmail").value,
        phone: document.getElementById("postNumber").value,
        website: document.getElementById("postWeb").value,
        address: {
            street: document.getElementById("postStreet").value,
            city: document.getElementById("postCity").value,
            zipcode: document.getElementById("postZipcode").value,
            geo: {
                lat: "",
                lng: ""
            }
        },
        company: {
            name: document.getElementById("postCompany").value,
            catchPhrase: document.getElementById("postCatchPhrase").value,
            bs: document.getElementById("postBs").value
        }
    };
    
    createUserCard(userData);
    postForm.reset();

    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            
            card.innerHTML = `
                <h2 class="user-name">${user.name}</h2>
                <p class="username">@${user.username}</p>
                <div class="contact-info">
                    <p><i class="fas fa-envelope"></i> ${user.email}</p>
                    <p><i class="fas fa-phone"></i> ${user.phone}</p>
                    <p><i class="fas fa-globe"></i> ${user.website}</p>
                    <p><i class="fas fa-home"></i> ${user.address.street}, ${user.address.suite}<br>
                    ${user.address.city}, ${user.address.zipcode}</p>
                </div>
                <div class="map-container" id="map-${user.id}"></div>
                <div class="company">
                    <p><i class="fas fa-building"></i> ${user.company.name}</p>
                    <p>"${user.company.catchPhrase}"</p>
                    <p>${user.company.bs}</p>
                </div>
            `;
            
            container.appendChild(card);
            
            setTimeout(() => {
                const lat = parseFloat(user.address.geo.lat);
                const lng = parseFloat(user.address.geo.lng);
                
                const map = L.map(`map-${user.id}`).setView([lat, lng], 12);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                
                L.marker([lat, lng]).addTo(map)
                    .bindPopup(`<b>${user.name}</b><br>${user.address.city}`)
                    .openPopup();
            }, 0);
        });
    });