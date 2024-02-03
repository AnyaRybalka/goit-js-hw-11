// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
const API_KEY = '42158298-7ee19009037b01d9fe650f472';
const URL = "https://pixabay.com/api/";
const formEl = document.querySelector(".form-inline");
const containerEl = document.querySelector(".card-container");
formEl.addEventListener("submit", handleSearch);
function showLoadingIndicator(){
    containerEl.innerHTML = '<div class="loader"></div>';
}
function hideLoadingIndicator() {
    const loadingElement = containerEl.querySelector('.loader');
    if (loadingElement) {
        loadingElement.remove();
    }
}
function handleSearch(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const picture = form.elements.picture.value.trim();
    if (picture === "" || picture == null) {
        iziToast.error({
            title: "Помилка!",
            message:"За вашим запитом нічого не знайдено! Спробуйте знов!"
        })
        containerEl.innerHTML = "";
        return;
    }
    showLoadingIndicator()
    searchPicture(picture)
        .then(data) => {
        if(data.hits && data.hits.length > o) {
            const hits = data.hits;
            let markup = "";
            for (const hit of hits) {
                markup+=create
            }
        }
    }
}