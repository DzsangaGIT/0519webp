const container = document.querySelector(".container");
const postForm = document.getElementById("postForm");

function createPostCard(title, content) {
    const post = document.createElement("div");
    post.className = "post";

    const postTitle = document.createElement("h2");
    postTitle.innerText = title;

    const postContent = document.createElement("p");
    postContent.innerText = content;

    const postDate = document.createElement("div");
    postDate.className = "date";
    postDate.innerText = new Date().toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    post.appendChild(postTitle);
    post.appendChild(postContent);
    post.appendChild(postDate);

    post.style.opacity = '0';
    container.prepend(post);

    setTimeout(() => {
        post.style.transition = 'opacity 0.5s ease';
        post.style.opacity = '1';
    }, 10);
}

postForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    
    if (title && content) {
        createPostCard(title, content);
        
        postForm.reset();

        container.scrollIntoView({ behavior: 'smooth' });
    }
});

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    for (el in json) {
        createPostCard(json[el].title, json[el].body);
    }
  });