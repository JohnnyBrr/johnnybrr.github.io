var serviceG = new Glide('.serviceGlide', {
        type: 'carousel',
        autoplay: 3000,
        gap: 20,
        startAt: 0,
        perView: 4,
        focusAt: 'center',
        keyboard: false
})

serviceG.on('swipe.end', function() {
        art = 1;
        apps = 1;
        tech = 1;
        artFilter();
        appsFilter();
        techFilter();
})

serviceG.mount()