import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
const testimonials = new Swiper('.testimonials__swiper', {
    modules: [Navigation, Pagination],
    spaceBetween: 50,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    // autoHeight: true,

    pagination: {
        el: '.testimonials__pagination',
        clickable: true,
    },

    navigation: {
        prevEl: '.testimonials__button-prev',
        nextEl: '.testimonials__button-next'
    },

    breakpoints: {
        920: {
            slidesPerGroup: 2
        }
    }
});