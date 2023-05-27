let currentPage = 1; // keeps track of the current page

// Fetch posts from Wordpress
function fetchPosts() {
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = 'Loading...'; 
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
            loadingText.textContent = '';
        })
        .catch(error => {
            console.error(error);
            document.getElementById('message').textContent = 'No more posts to load';
            loadingText.textContent = '';
        });
}

// Display posts on the webpage
function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');

    posts.forEach(async post => {
        const postElement = document.createElement('div');
        const postImage = document.createElement('img')
        const postTitle = document.createElement('h2');
        const postExcerpt = document.createElement('p');

        postTitle.textContent = post.title.rendered;
        postExcerpt.innerHTML = post.excerpt.rendered;

        const imageUrl = await fetchImage(post.featured_media);
        postImage.src = imageUrl;
        postImage.alt = post.title.rendered;

        postElement.appendChild(postImage);
        postElement.appendChild(postTitle);
        postElement.appendChild(postExcerpt);

        postElement.addEventListener('click', () => {
            window.location.href = `post.html?post=${post.id}`;
        });
        

        postsContainer.append(postElement); 
    });
}

async function fetchImage(mediaId) {
    const response = await fetch(`https://osloironworks.andreasyager.no/wp-json/wp/v2/media/${mediaId}`);
    const media = await response.json();
    return media.source_url;
}

// Call fetchPosts when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);

// Load more posts when the button is clicked
document.getElementById('loadMoreBtn').addEventListener('click', fetchPosts);
