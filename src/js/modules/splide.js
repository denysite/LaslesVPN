import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css';

document.addEventListener('DOMContentLoaded', () => {
    const partners = document.querySelector('.partners__splide');

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