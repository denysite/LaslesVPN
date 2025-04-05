/* ============= Dynamic Adaptive ============= */
import "./modules/dynamicAdapt";

/* ============= Swiper ============= */
// import "./modules/splide";
import "./modules/swiper";

/* ============= Spollers ============= */
import { spollers } from "./modules/spollers";
spollers();

/* ============= GSAP ============= */
import "./modules/gsap";

/* ============= Script ============= */

function ChangeAboutItemsAfter() {
    const grid = document.querySelector('.about-list');
    const items = Array.from(grid.children);
    const columnCount = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const aboutWrappers = document.querySelectorAll('.about-item-wrapper');

    if (Math.ceil(items.length / columnCount) > 1) {
        aboutWrappers.forEach(item => {
            item.style = `justify-content: start;`
        })
    }
    else {
        aboutWrappers.forEach(item => {
            item.style = `justify-content: center;`
        })
    }

    items.forEach((item, index) => {
        item.classList.remove('last-in-row');
        if ((index + 1) % columnCount === 0) {
            item.classList.add('last-in-row');
        }
    });
}

document.addEventListener('DOMContentLoaded', (e) => {
    ChangeAboutItemsAfter();

    document.querySelectorAll('.menu__list-link').forEach(link => {
        link.addEventListener('click', () => {
            const burgerInput = document.querySelector('.burger-input');

            if (burgerInput && burgerInput.checked) {
                burgerInput.checked = false;
                document.body.style.overflow = '';
            }
        });
    });
})

window.addEventListener('resize', (e) => {
    ChangeAboutItemsAfter();
})