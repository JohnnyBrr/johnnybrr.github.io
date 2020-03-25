var art = 0;
var apps = 0;
var tech = 0;

    function artFilter() {
        if (art === 0) {
            $('.artButt').css('background' , '#F12B44');
            $('.appsButt').css('background' , '#0D1B1E77');
            $('.techButt').css('background' , '#0D1B1E77');
            $('.art').removeClass('turnOff');
            $('.apps').addClass('turnOff');
            $('.tech').addClass('turnOff');
            art = 1;
            apps = 0;
            tech = 0;
        } else {
            $('.artButt').css('background' , '#0D1B1E77');
            $('.apps').removeClass('turnOff');
            $('.tech').removeClass('turnOff');
            art = 0;
        }
    }
    function appsFilter() {
        if (apps === 0) {
            $('.appsButt').css('background' , '#3ABCEF');
            $('.artButt').css('background' , '#0D1B1E77');
            $('.techButt').css('background' , '#0D1B1E77');
            $('.apps').removeClass('turnOff');
            $('.art').addClass('turnOff');
            $('.tech').addClass('turnOff');
            apps = 1;
            art = 0;
            tech = 0;
        } else {
            $('.appsButt').css('background' , '#0D1B1E77');
            $('.art').removeClass('turnOff');
            $('.tech').removeClass('turnOff');
            apps = 0;
        }
    }
    function techFilter() {
        if (tech === 0) {
            $('.techButt').css('background' , '#0D1B1E');
            $('.appsButt').css('background' , '#0D1B1E77');
            $('.artButt').css('background' , '#0D1B1E77');
            $('.tech').removeClass('turnOff');
            $('.apps').addClass('turnOff');
            $('.art').addClass('turnOff');
            tech = 1;
            apps = 0;
            art = 0;
        } else {
            $('.techButt').css('background' , '#0D1B1E77');
            $('.apps').removeClass('turnOff');
            $('.art').removeClass('turnOff');
            tech--;
        }
    }
    function arrowsReset() {
        art = 1;
        apps = 1;
        tech = 1;
        artFilter();
        appsFilter();
        techFilter();
    }