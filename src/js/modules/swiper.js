import Swiper from 'swiper';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

const swiper = new Swiper('.partners__slider', {
    modules: [Autoplay, FreeMode],
    observer: true,
    observeParents: true,
    slidesPerView: "auto",
    spaceBetween: 200,
    speed: 500,
    loop: true,
    autoplay: {
        delay: 500,
        disableOnInteraction: false,
    },
    

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

    // Брейкпоинты
    /*
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1268: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
    */
    // События
    /*
    on: {

    }
    */
});