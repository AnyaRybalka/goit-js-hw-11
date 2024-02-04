import{i as c,S as u}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const p="42158298-7ee19009037b01d9fe650f472",d="https://pixabay.com/api/",f=document.querySelector(".form-inline"),s=document.querySelector(".card-container");f.addEventListener("submit",y);function h(){s.innerHTML='<div class="loader"></div>'}function m(){const i=s.querySelector(".loader");i&&i.remove()}function g({webformatURL:i,likes:n,views:r,comments:o,downloads:e,largeImageURL:t}){return`
        <a href="${t}" class= "picture-link">
            <img src="${i}">
            <div class="picture-content">
                <div class="picture-text">
                    <span class="picture-title">Likes</span>
                    <span class="picture-sub-title">${n}</span>
                </div>
                <div class="picture-text">
                    <span class="picture-title">Views</span>
                    <span class="picture-sub-title">${r}</span>
                </div>
                <div class="picture-text">
                    <span class="picture-title">Comments</span>
                    <span class="picture-sub-title">${o}</span>
                </div>
                <div class="picture-text">
                    <span class="picture-title">Downloads</span>
                    <span class="picture-sub-title">${e}</span>
                </div>
            </div>
        </a>`}function y(i){i.preventDefault();const n=i.currentTarget,r=n.elements.picture.value.trim();if(r===""||r==null){c.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"}),s.innerHTML="";return}h(),v(r).then(o=>{if(o.hits&&o.hits.length>0){const e=o.hits;let t="";for(const l of e)t+=g(l);s.innerHTML=t,new u(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}else s.innerHTML="",c.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"})}).finally(()=>{m(),n.reset()}).catch(o=>{console.error("Fetch error:",o),c.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight"})})}function v(i){const n=new URLSearchParams({key:p,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${d}?${n}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()}).catch(r=>(console.error("Fetch error:",r),c.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight"}),Promise.reject(r)))}
//# sourceMappingURL=commonHelpers.js.map
