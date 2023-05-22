let currentPage = 1; // keeps track of the current page

// Fetch posts from Wordpress
function fetchPosts() {
    fetch(`https://osloironworks.andreasyager.no/wp-json/wp/v2/posts?page=${currentPage}&per_page=10`)
        .then(response => {
            if (!response.ok) { 
                throw new Error('No more posts');
            }
            return response.json();
        })
        .then(posts => {
            displayPosts(posts);
            currentPage++; // increment the page number
            if (posts.length < 10) {
                document.getElementById('message').textContent = 'No more posts to load';
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById('message').textContent = 'No more posts to load';
        });
}

// Display posts on the webpage
function displayPosts(posts) {
    const main = document.querySelector('main');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        const postTitle = document.createElement('h2');
        const postExcerpt = document.createElement('p');

        postTitle.textContent = post.title.rendered;
        postExcerpt.innerHTML = post.excerpt.rendered;

        postElement.appendChild(postTitle);
        postElement.appendChild(postExcerpt);

        main.appendChild(postElement);
    });
}

// Call fetchPosts when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);

// Load more posts when the button is clicked
document.getElementById('loadMoreBtn').addEventListener('click', fetchPosts);
