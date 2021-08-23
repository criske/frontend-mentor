/*jshint esversion: 9 */
$(document).ready(() => {

    $('#settings-btn').click(() => {
        const dialog = document.getElementById('dialog');
        dialog.showModal();
    });



    $('#preview-slider-btn')
        .mousedown(function (e) {
            $(this).on('mousemove', function (e) {
                var x = e.pageX;
                var oldX = $(this).data('x') || x;
                var diff = x - oldX;
                var currLeft = $(this).offset().left;
                $(this).offset({ left: currLeft + diff }); //revert the way
                $('#preview-pane').width($('#preview-pane').width() + diff);
                $(this).data('x', x); //store
            });
        })
        .mouseup(function () {
            $(this).off('mousemove');
            $(this).removeData('x');
        });

        // $('#preview-pane > img').width($('#preview-pane').parent().width());//revert the way
        $('#preview-image').width($('main').width()); // Units are assumed to be pixels
        $('#preview-image').height($('main').height());
});