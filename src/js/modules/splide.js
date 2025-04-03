import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css';

document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelector('.testimonials__splide');
    const partners = document.querySelector('.partners__splide');

    if (testimonials) {
        new Splide('.testimonials__splide', {
            type: 'slide',
            gap: '3.125rem',
            drag: false,
            focus: 0,

            classes: {
                arrows: 'splide__arrows',
                arrow: 'splide__arrow',
                prev: 'splide__arrow--prev',
                next: 'splide__arrow--next',
                pagination: 'splide__pagination your-class-pagination',
                page: 'splide__pagination__page your-class-page',
            },
        }).mount();
    }

    if (partners) {
        new Splide('.partners__splide', {
            type: 'loop',
            pagination: false,
            arrows: false,
            gap: '5.3vw',
            pauseOnFocus: false,
            pauseOnHover: false,
            autoScroll: {
                speed: 1,
            },
            perPage: 5,

            breakpoints: {
                991.98: {
                    perPage: 4,
                },
                767.98: {
                    perPage: 3,
                },
                479.98: {
                    perPage: 2,
                }
            }
        }).mount( { AutoScroll } );
    }
})