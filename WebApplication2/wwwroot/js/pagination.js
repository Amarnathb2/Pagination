let currentPage = 1;
let postsPerPage = 5;
let posts;

const postContainer = document.getElementById('postContainer');
const postsPerPageSelect = document.getElementById('postsPerPage');
const paginationButtons = document.getElementById('paginationButtons');
const pageNumbersContainer = document.getElementById('pageNumbers');

function displayCurrentPage() {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const displayedPosts = posts.slice(start, end);

    // Clear previous content
    postContainer.innerHTML = '';

    // Create an unordered list element
    const ul = document.createElement('ul');

    // Iterate through the displayed posts and create list items
    displayedPosts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = `Title: ${post.title}, Body: ${post.body}`;
        ul.appendChild(li);
    });

    // Append the unordered list to the container
    postContainer.appendChild(ul);

    // Update pagination buttons
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

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
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayCurrentPage();
    }
}

// Your fetch code here
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        // Save the fetched posts globally
        posts = data;

        // Display the initial page
        displayCurrentPage();
    })
    .catch(error => console.error('Error:', error));