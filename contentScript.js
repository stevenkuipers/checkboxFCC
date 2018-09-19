
// Check if the current url is a key in our local storage objects
// we use the slug as a key in our storage object.
//
// So for this url:
// https://learn.freecodecamp.org/responsive-web-design/responsive-web-design-projects/build-a-product-landing-page/
// the key would be : build-a-product-landing-page

let url = location.href;
let key = url.split('/').filter((val) => val);
key = key[key.length -1];
let userStories = document.querySelectorAll('li strong');

function initialize() {
  // If page has not been visited before
  chrome.storage.sync.get([key], function(data){
    console.log(data);
    if(typeof data[key] === 'undefined'){
      // Add new key to storage with all userstories set to unchecked (empty string)
      storeChanges(createStorageObject(Array.from(userStories)));
    }
    else {
      for(let i = 0; i < userStories.length; i++){
        if(data[key][i] === 'done'){
            userStories[i].classList.add('done');
            userStories[i].parentElement.classList.add('strike');
        }
      }
    }
  })
}

initialize();
// We go thru the page, get all li's containing strong elements
// with the text User (story) and add event listeners to them

userStories.forEach(function(story){
  let text = story.textContent || story.innerText;
  if(text.substr(0,4) === "User"){
    story.addEventListener("click", function(){
      // when clicked, toggle classes and add changed state to storage
      this.parentElement.classList.toggle('strike');
      this.classList.toggle('done');
      storeChanges(createStorageObject(Array.from(userStories)));
    })
  }
})

function createStorageObject(arr){
  let storageObject = arr.map(function(node) {
    return node.className;
  })
  return storageObject;
}

function storeChanges(arr) {
    chrome.storage.sync.set({[key]: arr}, function() {
      console.log('Saved', key, arr);
    });
}
