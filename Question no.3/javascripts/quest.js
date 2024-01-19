document.addEventListener('DOMContentLoaded', () => {
    fetchCafes();
});

function fetchCafes() {
    // Fetch cafes from the API endpoint
    fetch('https://api.example.com/cafes')
        .then(response => response.json())
        .then(cafes => {
            fetchPlaces().then(places => {
                displayCafes(cafes, places);
            });
        })
        .catch(error => console.error('Error fetching cafes:', error));
}

function fetchPlaces() {
    // Fetch places from the API endpoint
    return fetch('https://api.example.com/places')
        .then(response => response.json())
        .catch(error => console.error('Error fetching places:', error));
}

function displayCafes(cafes, places) {
    const cafeList = document.getElementById('cafeList');
    cafeList.innerHTML = ''; // Clear existing content

    cafes.forEach(cafe => {
        const place = places.find(p => p.id === cafe.place_id);
        if (place) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cafe.name}</td>
                <td>${place.street_no}</td>
                <td>${place.locality}</td>
                <td>${place.postal_code}</td>
                <td>${place.lat}</td>
                <td>${place.long}</td>
            `;
            cafeList.appendChild(row);
        }
    });
}

function searchCafes() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const cafeTable = document.getElementById('cafeTable');
    const cafeList = document.getElementById('cafeList');

    fetchCafes().then(cafes => {
        const filteredCafes = cafes.filter(cafe => cafe.name.toLowerCase().includes(searchTerm));
        displayCafes(filteredCafes, places);

        // Hide the table if there are no results
        cafeTable.style.display = filteredCafes.length === 0 ? 'none' : 'table';
    });
}