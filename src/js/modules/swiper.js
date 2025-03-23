import Swiper from 'swiper';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const partners = new Swiper('.partners__slider', {
    modules: [Autoplay, FreeMode],
    slidesPerView: 'auto',
    spaceBetween: 100,
    speed: 2000,
    loop: true,
    freeMode: true,
    autoplay: {
        delay: 0,
    },
    
    // Брейкпоинты
    // breakpoints: {
    //     600: {
    //         slidesPerView: 3,
    //     },
    // },

    //touchRatio: 0,
    //simulateTouch: false,
    //loop: true,
    //preloadImages: false,
    //lazy: true,

    /*
    // Эффекты
    effect: 'fade',
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    */

    // Пагинация
    /*
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    */

    // Скроллбар
    /*
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    */

    // Кнопки "влево/вправо"
    /*
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
    */

    
    // События
    /*
    on: {

    }
    */
});

const testimonials = new Swiper('.testimonials__slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 50,
    speed: 800,
    loop: true,

    //touchRatio: 0,
    //simulateTouch: false,
    //loop: true,
    //preloadImages: false,
    //lazy: true,

    /*
    // Эффекты
    effect: 'fade',
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    */

    // Пагинация
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Скроллбар
    /*
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    */

    // Кнопки "влево/вправо"
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },

    
    // События
    /*
    on: {

    }
    */
});