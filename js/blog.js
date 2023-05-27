let currentPage = 1;

async function fetchPosts() {
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = 'Loading...';
    try {
        const response = await fetch(`https://osloironworks.andreasyager.no/wp-json/wp/v2/posts?page=${currentPage}&per_page=10`);
        if (!response.ok) { 
            throw new Error('No more posts');
        }
        const posts = await response.json();
        const imagePromises = posts.map(post => fetchImage(post.featured_media));
        const images = await Promise.all(imagePromises);

        posts.forEach((post, index) => {
            post.imageUrl = images[index];
        });

        displayPosts(posts);
        currentPage++;
        if (posts.length < 10) {
            document.getElementById('message').textContent = 'No more posts to load';
        }
        loadingText.textContent = '';
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'No more posts to load';
        loadingText.textContent = '';
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');

    posts.forEach(post => {
        const postElement = createPostElement(post, post.imageUrl);
        postsContainer.append(postElement); 
    });
}

async function fetchImage(mediaId) {
    const response = await fetch(`https://osloironworks.andreasyager.no/wp-json/wp/v2/media/${mediaId}`);
    const media = await response.json();
    return media.source_url;
}

function createPostElement(post, imageUrl) {
    const postElement = document.createElement('div');
    const postImage = document.createElement('img');
    const postTitle = document.createElement('h2');
    const postExcerpt = document.createElement('p');

    postTitle.textContent = post.title.rendered;
    postExcerpt.innerHTML = post.excerpt.rendered;
    postImage.src = imageUrl;
    postImage.alt = post.title.rendered;

    postElement.appendChild(postImage);
    postElement.appendChild(postTitle);
    postElement.appendChild(postExcerpt);

    postElement.addEventListener('click', () => {
        window.location.href = `post.html?post=${post.id}`;
    });

    return postElement;
}

document.addEventListener('DOMContentLoaded', fetchPosts);
document.getElementById('loadMoreBtn').addEventListener('click', fetchPosts);
