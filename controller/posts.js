document.addEventListener('DOMContentLoaded', function () {
    let postIndex = 0;  // Start index for fetching posts
    const postsPerLoad = 20; // Number of posts to load each time
    let isLoading = false; // Flag to prevent multiple simultaneous loads

    // Function to load posts from the API and display them
    function loadPosts() {
        if (isLoading) return; // Prevent multiple loads at once
        isLoading = true; // Set loading flag to true

        // Fetch posts from the API
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${postIndex}&_limit=${postsPerLoad}`)
            .then(response => response.json())
            .then(posts => {
                if (posts.length === 0) {
                    // If no more posts are available, stop the event listener
                    window.removeEventListener('scroll', onScroll);
                    return;
                }

                const postsContainer = document.getElementById('posts-container');

                // Loop through posts and append them to the container
                posts.forEach(post => {
                    const postLabel = document.createElement('div');
                    postLabel.classList.add('post-label');
                    postLabel.innerHTML = `
                        <strong>Title:</strong> ${post.title}<br>
                        <strong>Body:</strong> ${post.body}
                    `;
                    postsContainer.appendChild(postLabel);
                });

                // Update the postIndex for the next load
                postIndex += postsPerLoad;
                isLoading = false; // Reset the loading flag
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                isLoading = false; // Reset the loading flag even on error
            });
    }

    // Infinite scrolling - Load more posts when reaching the bottom of the page
    function onScroll() {
        const scrollTop = window.scrollY; // Scroll position from top
        const windowHeight = window.innerHeight; // Height of the visible window
        const documentHeight = document.body.offsetHeight; // Total height of the document

        // Check if the user is near the bottom of the page
        if (scrollTop + windowHeight >= documentHeight - 100) {
            loadPosts(); // Load more posts
        }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', onScroll);

    // Initial load of posts when the page first loads
    loadPosts();
});
