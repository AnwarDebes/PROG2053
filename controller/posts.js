// Wait for the DOM content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables for fetching posts
    let postIndex = 0;  // Start index for fetching posts
    const postsPerLoad = 20; // Number of posts to load each time
    const totalPosts = 100; // Total number of posts available in the API
    let isLoading = false; // Flag to prevent multiple simultaneous loads

    // Function to load posts from the API and display them on the page
    function loadPosts() {
        // If a load operation is already in progress, exit the function
        if (isLoading) return; // Prevent multiple loads at once

        isLoading = true; // Set loading flag to true to indicate a load is in progress

        // Fetch posts from the API with pagination parameters (_start and _limit)
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${postIndex}&_limit=${postsPerLoad}`)
            .then(response => response.json()) // Parse the response as JSON
            .then(posts => {
                // If no posts are returned, exit the function
                if (posts.length === 0) {
                    return; // If no more posts, do nothing
                }

                // Get the container element where posts will be displayed
                const postsContainer = document.getElementById('posts-container');

                // Loop through each post and create HTML elements to display them
                posts.forEach(post => {
                    // Create a div element for each post
                    const postLabel = document.createElement('div');
                    postLabel.classList.add('post-label'); // Add CSS class for styling

                    // Set the inner HTML of the post label with the post's title and body
                    postLabel.innerHTML = `
                        <strong>Title:</strong> ${post.title}<br>
                        <strong>Body:</strong> ${post.body}
                    `;

                    // Append the post label to the posts container
                    postsContainer.appendChild(postLabel);
                });

                // Update the postIndex for the next load
                postIndex += postsPerLoad;

                // If we've reached the total number of posts, reset the index to start over
                if (postIndex >= totalPosts) {
                    postIndex = 0; // Reset to start from the first post again
                }

                isLoading = false; // Reset the loading flag to allow new loads
            })
            .catch(error => {
                // Log any errors to the console
                console.error('Error fetching posts:', error);
                isLoading = false; // Reset the loading flag even on error
            });
    }

    // Function to handle infinite scrolling
    // Loads more posts when the user scrolls near the bottom of the page
    function onScroll() {
        const scrollTop = window.scrollY; // Current scroll position from the top
        const windowHeight = window.innerHeight; // Height of the visible window
        const documentHeight = document.body.offsetHeight; // Total height of the document content

        // Check if the user has scrolled near the bottom (100px from the bottom)
        if (scrollTop + windowHeight >= documentHeight - 100) {
            loadPosts(); // Load more posts
        }
    }

    // Attach the scroll event listener to the window
    window.addEventListener('scroll', onScroll);

    // Initial load of posts when the page first loads
    loadPosts();
});
