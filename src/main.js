import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
const API_KEY = '42158298-7ee19009037b01d9fe650f472';
const URL = "https://pixabay.com/api/";
const formEl = document.querySelector(".form-inline");
const containerEl = document.querySelector(".card-container");
formEl.addEventListener("submit", handleSearch);
function showLoadingIndicator() {
    containerEl.innerHTML = '<div class="loader"></div>';
}
function hideLoadingIndicator() {
    const loadingElement = containerEl.querySelector('.loader');
    if (loadingElement) {
        loadingElement.remove();
    }
}
function createPictureMarkup({ webformatURL, likes, views, comments, downloads, largeImageURL }) {
    return `
        <a href="${largeImageURL}" class= "picture-link">
            <img src="${webformatURL}">
            <div class="picture-content">
                <div class="picture-text">
                    <span class="picture-title">Likes</span>
                    <span class="picture-sub-title">${likes}</span>
                </div>
                <div class="picture-text">
                    <span class="picture-title">Views</span>
                    <span class="picture-sub-title">${views}</span>
                </div>
                <div class="picture-text">
                    <span class="picture-title">Comments</span>
                    <span class="picture-sub-title">${comments}</span>
                </div>
                <div class="picture-text">
                    <span class="picture-title">Downloads</span>
                    <span class="picture-sub-title">${downloads}</span>
                </div>
            </div>
        </a>`;
}
function handleSearch(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const picture = form.elements.picture.value.trim();

    if (picture === "" || picture == null) {
        iziToast.error({
            message: `Sorry, there are no images matching your search query. Please, try again!`,
            position: 'topRight'
        })
        containerEl.innerHTML = "";
        return;
    }
    showLoadingIndicator();
    searchPicture(picture)
        .then((data) => {
            if (data.hits && data.hits.length > 0) {
                const hits = data.hits;
                let markup = "";
                for (const hit of hits) {
                    markup += createPictureMarkup(hit);
                }
                containerEl.innerHTML = markup;
                const lightbox = new SimpleLightbox('.card-container a', {
                    captionsData: 'alt',
                    captionPosition: 'bottom',
                    captionDelay: 250,
                });
                lightbox.refresh();
            } else {
                containerEl.innerHTML = "";
                iziToast.error({
                    message: `Sorry, there are no images matching your search query. Please, try again!`,
                    position: 'topRight'
                });
            }
        })
        .finally(() => {
            hideLoadingIndicator();
            form.reset();
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            iziToast.error({
                message: `An error occurred while fetching images. Please try again later.`,
                position: 'topRight'
            });
        });
}
function searchPicture(picture) {
    const urlParams = new URLSearchParams({
        key: API_KEY,
        q: picture,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });
    return fetch(`${URL}?${urlParams}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            iziToast.error({
                message: `An error occurred while fetching images. Please try again later.`,
                position: 'topRight'
            });
            return Promise.reject(error);
        });
}


