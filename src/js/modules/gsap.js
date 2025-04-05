import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from('.locations__map-pin', {
    scrollTrigger: {
        trigger: '.locations__map',
        start: 'top 70%',
    },

    scale: 0,
    stagger: 0.2
})
