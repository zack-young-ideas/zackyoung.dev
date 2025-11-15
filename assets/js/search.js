/*
Defines function for filtering blog posts by keywords.
*/

window.onload = function() {
  /*
  Send an AJAX request to retrieve an object with information about
  the text contents of each blog post.
  */
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/posts.json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        window.youngideas = {
          posts: JSON.parse(xhr.responseText),
        }
      } else {
        throw Error('Unable to retrieve posts data');
      }
    }
    xhr.send();
  } catch {
    console.error('Unable to retrieve posts data');
  }
}

const search = function() {
  /*
  Filter the blog posts based on search terms entered by the user.
  */
  const inputField = document.getElementById('blog-search');
  const searchText = inputField.value.toUpperCase();

  const youngideasDefined = window.youngideas !== undefined;
  const postsDefined = window.youngideas.posts !== undefined;
  if (youngideasDefined && postsDefined) {
    const allPosts = window.youngideas.posts;

    for (let i = 0; i < allPosts.length; i++) {
      // For each post, if the search term entered by the user is in
      // either the title of the post, the subtitle, or the list of
      // keywords, the display of the DOM element should be "block".
      // Otherwise, display is set to "none" by default.
      let display = 'none';

      const title = allPosts[i].title;
      const subtitle = allPosts[i].subtitle;
      const keywords = allPosts[i].keywords;

      if (title.toUpperCase().indexOf(searchText) > -1) {
        display = 'block';
      }
      if (subtitle.toUpperCase().indexOf(searchText) > -1) {
        display = 'block';
      }
      if (keywords.includes(searchText)) {
        display = 'block';
      }

      const domElement = document.querySelector(
        `[data-uid="${allPosts[i].uid}"]`
      );
      domElement.style.display = display;
    }
  }
}

const button = document.getElementById('search-button');
button.addEventListener('click', search);

const searchField = document.getElementById('blog-search');
searchField.addEventListener('keydown', function(event) {
  // If the user presses "Enter", search for the text they've entered.
  if (event.key === 'Enter') {
    search();
  }
});

const clearSearch = () => {
  const youngideasDefined = window.youngideas !== undefined;
  const postsDefined = window.youngideas.posts !== undefined;
  if (youngideasDefined && postsDefined) {
    const allPosts = window.youngideas.posts;

    for (let i = 0; i < allPosts.length; i++) {
      // Display every post.
      const domElement = document.querySelector(
        `[data-uid="${allPosts[i].uid}"]`
      );
      domElement.style.display = 'block';
    }
  }
}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearSearch);
