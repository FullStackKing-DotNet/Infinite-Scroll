const imageContainer = document.getElementById('image-container');
const infoContainer = document.getElementById('info-container');
const loadedImages = document.getElementById('loadedImages');
const windowInnerHeight = document.getElementById('windowInnerHeight');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Get photos from Unsplash API
const count = 30;
const apiKey = 'BmAzdXChcWjPLTGJVlnc2MPTSY4LFjYdph5dKwOICCc'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//check if all the images are loaded
function imageLoaded(){
    console.log(imagesLoaded);
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        loader.hidden = true;
        ready = true;
        console.log('ready =', ready);
    }
}

//Helper function to set attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
//Create elements for links and phots, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
//Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        //Note: Set attrubute is called from a helper function above.
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, Check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, the put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get Photos from API using async and fetch
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        loadedImages.innerText = 'Images Loaded = '+imagesLoaded;
        windowInnerHeight.innerText = 'Window Height = '+window.window.scrollY;
        displayPhotos();
        console.log(photosArray);
    } catch (error) {
        //Catch Errors
    }
}
// Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        console.log('load more');
    }
    
});

//On Load
getPhotos();