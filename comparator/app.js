/*jshint esversion: 9 */
$(document).ready(() => {

    $('#settings-btn').click(() => {
        const dialog = document.getElementById('dialog');
        dialog.showModal();
    });

    var start = 0;
    $('#preview-slider-btn').draggable({
        axis: 'x',
        containment: "parent",
        zIndex: 100,
        grid: [ 5, 1 ],
        iframeFix: true,
        drag: (e, ui) => {
            if (e.offsetX >= 0) {
                const parent = ui.helper.parent();
                const min = parent.offset().left;
                const max =  parent.offset().left + parent.outerWidth();
                const curr = ui.helper.offset().left;
               var clampOffsetX;
              if(curr < min){
                clampOffsetX = min;
              }else if(curr >  max ){
                  clampOffsetX =  max;
              }else{
                  clampOffsetX = curr;
              }
              const perc = (clampOffsetX -  min) / (max - min) * 100;
              $('#preview-pane').width(`${perc }%`);
            }
        }
    });

    // $('#preview-slider-btn')
    //     .mousedown(function (e) {
    //         $(this).on('mousemove', function (e) {
    //             var x = e.pageX;
    //             var oldX = $(this).data('x') || x;
    //             var diff = x - oldX;
    //             var currLeft = $(this).offset().left;
    //             $(this).offset({ left: currLeft + diff }); //revert the way
    //             $('#preview-pane').width($('#preview-pane').width() + diff);
    //             $(this).data('x', x); //store
    //         });
    //     })
    //     .mouseup(function () {
    //         $(this).off('mousemove');
    //         $(this).removeData('x');
    //     });

    // $('#preview-pane > img').width($('#preview-pane').parent().width());//revert the way
    // $('#preview-image').width($('main').width()); // Units are assumed to be pixels
    // $('#preview-image').height($('main').height());
    $('#solution-pane').height($('#preview-image').height());
    $('#solution-pane').width($('#preview-image').width());
    $('#ui-widget-content').width($('#preview-image').width());
    $('main').width($('#preview-image').width());
    $('main').height($('#preview-image').height());
    // $('#ui-widget-content')
});