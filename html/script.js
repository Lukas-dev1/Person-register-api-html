// Global variable to store all people data
let allPeopleData;

// Function to make AJAX request to Flask API with sorting option
function fetchPeopleData(sortDirection) {
    let url = 'http://127.0.0.1:5000/people';

    // If sortDirection is provided, add it to the URL
    if (sortDirection) {
        url += `?sort=${sortDirection}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            allPeopleData = data; // Store all people data
            // Render people data
            renderPeople(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to render people data
function renderPeople(people) {
    const peopleList = document.getElementById('people-list');

    // Clear existing content
    peopleList.innerHTML = '';

    // Loop through each person and create HTML elements to display the information
    people.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person-profile'); // Add class for styling
        personDiv.innerHTML = `
            <img src="http://127.0.0.1:5000${person.profile_pic}" alt="Profile Picture"> 
            <h2>${person.name} ${person.lastname}</h2>
            <p class="hidden">Age: ${person.age} (${person.birth_date})</p>
            <p class="hidden">Gender: <span class="gender">${person.male ? 'Male' : 'Female'}</span></p>
            <p class="hidden">Occupation: <a href="https://sv.wikipedia.org/wiki/${person.yrke}" target="_blank">${person.yrke}</a></p>
            <p class="hidden">Phone: <a href="tel:${person.telephone}">${person.telephone}</a><h6>Don't call this random number!</h6></p>
        `;
        
        // Add event listener to the personDiv to toggle visibility of p elements
        personDiv.addEventListener('click', function() {
            const paragraphs = this.querySelectorAll('p.hidden');
            paragraphs.forEach(paragraph => {
                paragraph.classList.toggle('hidden');
            });
        });

        peopleList.appendChild(personDiv);
    });
}

// Function to sort people by first letter of name and age direction
function sortPeople(sortDirection) {
    fetchPeopleData(sortDirection);
}

// Function to search for people by name
function searchPeople() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredPeople = allPeopleData.filter(person => {
        const fullName = `${person.name} ${person.lastname}`.toLowerCase();
        return fullName.includes(searchInput);
    });
    renderPeople(filteredPeople);
}

// Add event listener to the search input field
document.getElementById('search-input').addEventListener('input', searchPeople);

// Call fetchPeopleData function when the page loads
window.onload = function() {
    fetchPeopleData(); // Default sorting
};
