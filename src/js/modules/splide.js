import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const testimonials = new Splide('.testimonials__splide', {
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
		page      : 'splide__pagination__page your-class-page',
    },
});

testimonials.mount();