// Initialize the current page to 1 for pagination
let currentPage = 1;

// Number of posts to fetch per page
const postPerPage = 9; // Fetch 9 posts per page

// Get the HTML container where posts will be displayed
const postContainer = document.getElementById('post-container');

// A flag to prevent multiple fetches at the same time
let isLoading = false;

// Function to fetch posts from the API for the given page
function fetchHomeData(page) {
  // API endpoint with pagination parameters (_page and _limit)
  const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postPerPage}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then(response => {
      // Check if the response status is OK, otherwise throw an error
      if (!response.ok) {
        throw new Error("Error with the status: " + response.status);
      }
      // Parse the JSON response
      return response.json();
    })
    .then(posts => {
      // Iterate through the fetched posts and display them in the DOM
      posts.forEach(post => {
        // Create an article element for each post
        const article = document.createElement("article");

        // Create and set the post title inside an h2 element
        const title = document.createElement("h2"); // Changed to h2 for better semantic structure
        title.textContent = post.title;

        // Create and set the post body inside a paragraph element
        const body = document.createElement("p");
        body.textContent = post.body;

        // Append the title and body to the article element
        article.appendChild(title);
        article.appendChild(body);

        // Append the article to the main post container in the DOM
        postContainer.appendChild(article);

        // Clearfix: After every 3 posts, create a clearfix element to clear floats (for layout purposes)
        if (postContainer.childElementCount % 3 === 0) {
          const clearfix = document.createElement("div");
          clearfix.setAttribute("class", "clearfix"); // Add the "clearfix" class for styling
          postContainer.appendChild(clearfix);
        }
      });

      // Reset the loading state to allow more posts to be fetched later
      isLoading = false;
    })
    .catch(error => {
      // Log any errors encountered during the fetch
      console.error("Error fetching posts: ", error.message);
    });
}

// Function to load posts with pagination
function loadPosts() {
  // If a fetch is already in progress, prevent another one from starting
  if (isLoading) return;
  isLoading = true; // Set loading to true to block further fetches

  // Fetch posts for the current page and increment the page counter for the next fetch
  fetchHomeData(currentPage);
  currentPage++; // Move to the next page after fetching posts
}

// Function to handle scrolling and detect when the user has reached the bottom of the page
function handleScroll() {
  // Calculate the total scrollable height (content height minus the visible window height)
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Get the current scroll position
  const scrolled = window.scrollY;

  // Check if the user has scrolled near the bottom of the page (within 10px) and not already loading
  if (scrolled >= scrollableHeight - 10 && !isLoading) {
    console.log('Loading more posts...');
    loadPosts(); // Trigger loading more posts
  }
}

// Attach an event listener to the window for the scroll event to trigger loading more posts
window.addEventListener('scroll', handleScroll);

// Load the initial set of posts when the page first loads
loadPosts();
