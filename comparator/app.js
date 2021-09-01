/*jshint esversion: 9 */
$(document).ready(() => {

    $('#settings-btn').click(() => {
        const dialog = document.getElementById('dialog');
        dialog.showModal();
    });

    // $(window).on('beforeunload', function(){
    //     // your logic here
    //     console.log("reload");
    // });

    $('#preview-slider-btn').draggable({
        axis: 'x',
        containment: "parent",
        zIndex: 100,
        grid: [5, 1],
        iframeFix: true,
        drag: (e, ui) => {
            if (e.offsetX >= 0) {
                const parent = ui.helper.parent();
                const min = parent.offset().left + ui.helper.width();
                const max = parent.offset().left + parent.outerWidth() - ui.helper.width();
                const curr = ui.helper.offset().left;
                var clampOffsetX;
                if (curr < min) {
                    clampOffsetX = min;
                } else if (curr > max) {
                    clampOffsetX = max;
                } else {
                    clampOffsetX = curr;
                }
                const perc = (clampOffsetX - min) / (max - min) * 100;
                $('#preview-pane').width(`${perc}%`);
            }
        }
    });


    // setTimeout(() => {
    //     $('#solution-pane').height($('#preview-image').height());
    //     $('#solution-pane').width($('#preview-image').width());
    //     $('.ui-widget-content').width($('#preview-image').width());
    //     $('main').width($('#preview-image').width());
    //     $('main').height($('#preview-image').height());
    //     $('#preview-image').attr("style", "opacity:0.5; -moz-opacity:0.5; filter:alpha(opacity=50)");
    // }, 500);

    $("#preview-image").one("load", function() {
        console.log("Image w:" + $('#preview-image').width());
        $('#solution-pane').height($('#preview-image').height());
        // $('#solution-pane').width($('#preview-image').width());
        // $('#preview-pane').width($('#preview-image').width());
        // // $('iframe').width($('#preview-image').width());
        // // $('.ui-widget-content').width($('#preview-image').width());
        // $('main').width($('#preview-image').width());
        // $('main').height($('#preview-image').height());
        $('#preview-image').attr("style", "opacity:0.5; -moz-opacity:0.5; filter:alpha(opacity=50)");
        $("#preview-slider-btn").css({top: '50%', left: '90%'});
      }).each(function() {
        if(this.complete) {
            $(this).trigger('load'); 
        }
      });

    $('#preview-image-opacity-slider').on('input', function () {
        const v = $(this).val();
        $('#preview-image').attr("style", `opacity:${v / 100}; -moz-opacity:${v / 100}; filter:alpha(opacity=${v})`);
    });
    $(window).resize(function () {
        const seed = Math.random();
        if($(window).width() <= 375){
            $('#preview-image').attr('src', `../sunnyside-agency-landing-page-main/design/mobile-design.jpg?r=${seed}`);
            $('iframe').width(375);
        }else{
            $('#preview-image').attr('src', `../sunnyside-agency-landing-page-main/design/desktop-design.jpg?r=${seed}`);
            $('iframe').width(1440);
        }
    });
});