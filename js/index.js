//create markup 
import gallery from '../gallery-items.js';
     
const galleryMarkupItem = gallery.reduce(
    (string, item) => string +
        `<li class="gallery__item">
         <a class="gallery__link" href="${item.original}">
         <img class="gallery__image" src="${item.preview}"
            data-source="${item.original}" alt="${item.description}" />
         </a>
         </li>`,
  ""
);

//addes markup DOM
const listEl = document.querySelector("ul");
listEl.innerHTML = galleryMarkupItem;