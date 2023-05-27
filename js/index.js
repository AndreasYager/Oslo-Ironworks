let posts = [];
let sliderIndex = 0;

async function fetchPosts() {
    const response = await fetch(`https://osloironworks.andreasyager.no/wp-json/wp/v2/posts?page=1&per_page=100`);
    posts = await response.json();
    displayFeaturedPost();
    displaySliderPosts();
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


async function displayFeaturedPost() {
    const featuredPostContainer = document.getElementById('featuredPostContainer');
    const post = posts[0];
    const imageUrl = await fetchImage(post.featured_media);

    const postElement = createPostElement(post, imageUrl);
    featuredPostContainer.appendChild(postElement);
}

async function displaySliderPosts() {
    const sliderPostsContainer = document.getElementById('sliderPostsContainer');
    const previousHeight = sliderPostsContainer.offsetHeight; 
    sliderPostsContainer.style.minHeight = `${previousHeight}px`; 
    sliderPostsContainer.innerHTML = '';

    const start = sliderIndex * 3 + 1;
    const end = start + 3;

    for (let i = start; i < end; i++) {
        if (i < posts.length) {
            const post = posts[i];
            const imageUrl = await fetchImage(post.featured_media);

            const postElement = createPostElement(post, imageUrl);
            sliderPostsContainer.appendChild(postElement);
        }
    }

    sliderPostsContainer.style.minHeight = '0'; 
}


document.getElementById('prevBtn').addEventListener('click', () => {
    if (sliderIndex > 0) {
        sliderIndex--;
        displaySliderPosts();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (sliderIndex < (posts.length - 1) / 3) {
        sliderIndex++;
        displaySliderPosts();
    }
});

document.addEventListener('DOMContentLoaded', fetchPosts);
