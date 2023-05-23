var postDetail = document.getElementById("postDetail");

var postId = new URLSearchParams(window.location.search).get("post");

if (postId !== null) {
    fetch(`https://osloironworks.andreasyager.no/wp-json/wp/v2/posts/${postId}`)
        .then((response) => response.json())
        .then(async (post) => {
            const imageUrl = await fetchImage(post.featured_media);
            var html = `
                <div class="post-specific">
                    <img src="${imageUrl}" alt="${post.title.rendered}" />
                    <h2>${post.title.rendered}</h2>
                    <p>${post.content.rendered}</p>
                </div>
            `;
            postDetail.innerHTML = html;
            document.title = post.title.rendered;
        })
        .catch((error) => console.error('Error fetching post:', error));
}

async function fetchImage(mediaId) {
    const response = await fetch(`https://osloironworks.andreasyager.no/wp-json/wp/v2/media/${mediaId}`);
    const media = await response.json();
    return media.source_url;
}
