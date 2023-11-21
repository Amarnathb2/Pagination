
let currentPage = 1;
const itemsPerPage = 5;

const peopleContainer = document.getElementById('peopleContainer');
const paginationButtons = document.getElementById('paginationButtons');
const pageNumbersContainer = document.getElementById('pageNumbers');

function fetchData() {
    // Fetch data dynamically from the controller
    fetch('/People/GetPeopleData')
        .then(response => response.json())
        .then(data => {
            // Save the fetched data globally
            peopleData = data;

            // Display the initial page
            displayCurrentPage();
        })
        .catch(error => console.error('Error:', error));
}

function displayCurrentPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayedPeople = peopleData.slice(start, end);

    // Clear previous content
    peopleContainer.innerHTML = '';

    // Display people data
    displayedPeople.forEach(person => {
        const div = document.createElement('div');
        div.textContent = `Name: ${person.Name}, Age: ${person.Age}, City: ${person.City}`;
        peopleContainer.appendChild(div);
    });

    // Update pagination buttons
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(peopleData.length / itemsPerPage);

    // Clear previous page numbers
    pageNumbersContainer.innerHTML = '';

    // Display page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageNumberButton = document.createElement('button');
        pageNumberButton.textContent = i;
        pageNumberButton.onclick = function () {
            currentPage = i;
            displayCurrentPage();
        };
        pageNumbersContainer.appendChild(pageNumberButton);
    }

    // Enable/disable pagination buttons based on the current page
    paginationButtons.querySelector('[onclick="prevPage()"]').disabled = currentPage === 1;
    paginationButtons.querySelector('[onclick="nextPage()"]').disabled = currentPage === totalPages;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayCurrentPage();
    }
}

function nextPage() {
    const totalPages = Math.ceil(peopleData.length / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayCurrentPage();
    }
}

// Fetch data when the page loads
fetchData();
