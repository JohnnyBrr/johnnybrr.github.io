$(document).ready(function () {
    //MAGAZINE
    $( "#addStampa" ).hover(
        function() {
            $( "#addStampa > img" ).attr("src", "img/icons/Hadd_circle.svg" );
        }, function() {
            $( "#addStampa > img" ).attr("src", "img/icons/add_circle.svg" );
        }
    );
    $( "#delStampa" ).hover(
        function() {
            $( "#delStampa > img" ).attr("src", "img/icons/Hdelete.svg" );
        }, function() {
            $( "#delStampa > img" ).attr("src", "img/icons/delete.svg" );
        }
    );
    $( "#editStampa" ).hover(
        function() {
            $( "#editStampa > img" ).attr("src", "img/icons/Hedit.svg" );
        }, function() {
            $( "#editStampa > img" ).attr("src", "img/icons/edit.svg" );
        }
    );
    $( "#setStampa" ).hover(
        function() {
            $( "#setStampa > img" ).attr("src", "img/icons/Hsettings.svg" );
        }, function() {
            $( "#setStampa > img" ).attr("src", "img/icons/settings.svg" );
        }
    );
    $( "#magTitlePrev" ).hover(
        function() {
            $( "#magTitlePrev > img" ).attr("src", "img/icons/Hprev.svg" );
        }, function() {
            $( "#magTitlePrev > img" ).attr("src", "img/icons/prev.svg" );
        }
    );
    $( "#magTitleNext" ).hover(
        function() {
            $( "#magTitleNext > img" ).attr("src", "img/icons/Hnext.svg" );
        }, function() {
            $( "#magTitleNext > img" ).attr("src", "img/icons/next.svg" );
        }
    );
    $("#setStampa").click(function() {
        $(".loginContainer").fadeIn(600);
        $("main").hide();
    });

    //NEWS
    $( "#addNews" ).hover(
        function() {
            $( "#addNews > img" ).attr("src", "img/icons/Hadd_circle.svg" );
        }, function() {
            $( "#addNews > img" ).attr("src", "img/icons/add_circle.svg" );
        }
    );
    $( "#delNews" ).hover(
        function() {
            $( "#delNews > img" ).attr("src", "img/icons/Hdelete.svg" );
        }, function() {
            $( "#delNews > img" ).attr("src", "img/icons/delete.svg" );
        }
    );
    $( "#editNews" ).hover(
        function() {
            $( "#editNews > img" ).attr("src", "img/icons/Hedit.svg" );
        }, function() {
            $( "#editNews > img" ).attr("src", "img/icons/edit.svg" );
        }
    );
    $( "#hideNews" ).hover(
        function() {
            $( "#hideNews > img" ).attr("src", "img/icons/Hhide.svg" );
        }, function() {
            $( "#hideNews > img" ).attr("src", "img/icons/hide.svg" );
        }
    );
    $( "#showNews" ).hover(
        function() {
            $( "#showNews > img" ).attr("src", "img/icons/Hshow.svg" );
        }, function() {
            $( "#showNews > img" ).attr("src", "img/icons/show.svg" );
        }
    );
    $( "#setNews" ).hover(
        function() {
            $( "#setNews > img" ).attr("src", "img/icons/Hsettings.svg" );
        }, function() {
            $( "#setNews > img" ).attr("src", "img/icons/settings.svg" );
        }
    );

    //SITO WEB
    $( "#addSito" ).hover(
        function() {
            $( "#addSito > img" ).attr("src", "img/icons/Hadd_circle.svg" );
        }, function() {
            $( "#addSito > img" ).attr("src", "img/icons/add_circle.svg" );
        }
    );
    $( "#delSito" ).hover(
        function() {
            $( "#delSito > img" ).attr("src", "img/icons/Hdelete.svg" );
        }, function() {
            $( "#delSito > img" ).attr("src", "img/icons/delete.svg" );
        }
    );
    $( "#editSito" ).hover(
        function() {
            $( "#editSito > img" ).attr("src", "img/icons/Hedit.svg" );
        }, function() {
            $( "#editSito > img" ).attr("src", "img/icons/edit.svg" );
        }
    );
    $( "#hideSito" ).hover(
        function() {
            $( "#hideSito > img" ).attr("src", "img/icons/Hhide.svg" );
        }, function() {
            $( "#hideSito > img" ).attr("src", "img/icons/hide.svg" );
        }
    );
    $( "#showSito" ).hover(
        function() {
            $( "#showSito > img" ).attr("src", "img/icons/Hshow.svg" );
        }, function() {
            $( "#showSito > img" ).attr("src", "img/icons/show.svg" );
        }
    );
    $( "#setSito" ).hover(
        function() {
            $( "#setSito > img" ).attr("src", "img/icons/Hsettings.svg" );
        }, function() {
            $( "#setSito > img" ).attr("src", "img/icons/settings.svg" );
        }
    );

    //FOOTER
    $(".navPanel__scheda").click(function() {
        if( $(this).hasClass("magPanel") ) {
            $(".navPanel__scheda").removeClass("activePanel");
            $(this).addClass("activePanel");
            $(".totalsPanel__parziale").removeClass("activeParziale");
            $(".magParz").addClass("activeParziale");
            $(".containerSection").css("display", "none");
            $(".stampaContainer").fadeIn(400);
        } else if( $(this).hasClass("newsPanel") ) {
            $(".navPanel__scheda").removeClass("activePanel");
            $(this).addClass("activePanel");
            $(".totalsPanel__parziale").removeClass("activeParziale");
            $(".newsParz").addClass("activeParziale");
            $(".containerSection").css("display", "none");
            $(".newsContainer").fadeIn(400);
        } else if( $(this).hasClass("sitePanel") ) {
            $(".navPanel__scheda").removeClass("activePanel");
            $(this).addClass("activePanel");
            $(".totalsPanel__parziale").removeClass("activeParziale");
            $(".siteParz").addClass("activeParziale");
            $(".containerSection").css("display", "none");
            $(".sitoContainer").fadeIn(400);
        }
    })
})