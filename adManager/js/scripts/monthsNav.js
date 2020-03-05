var month = "";

function nav() {
    $.scrollify.move("#" + month);
}

function fun() {
    var ddl = document.getElementById("monthsMenu");
    var selectedValue = ddl.options[ddl.selectedIndex].value;
        if (selectedValue == "gen") {
            month = "gen";
            nav();
        } else if (selectedValue == "feb") {
            month = "feb";
            nav();
        } else if (selectedValue == "mar") {
            month = "mar";
            nav();
        } else if (selectedValue == "apr") {
            month = "apr";
            nav();
        } else if (selectedValue == "may") {
            month = "may";
            nav();
        } else if (selectedValue == "jun") {
            month = "jun";
            nav();
        } else if (selectedValue == "jul") {
            month = "jul";
            nav();
        } else if (selectedValue == "aug") {
            month = "aug";
            nav();
        } else if (selectedValue == "sep") {
            month = "sep";
            nav();
        } else if (selectedValue == "oct") {
            month = "oct";
            nav();
        } else if (selectedValue == "nov") {
            month = "nov";
            nav();
        } else {
            month = "dec";
            nav();
        }
}

$(function() {
    $.scrollify({
        section : ".pamScroll",
        after:function() {
            if($.scrollify.current().is('.bigScroll__jan')) {
                $.scrollify.move('#gen');
            }
        }
    });
});