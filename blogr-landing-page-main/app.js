$(document).ready(ready);

function ready(){
    $('.sub-menu').click(function(){
        $(this).find('.sub-menu-entries').toggleClass('hidden');
        const curr = $(this);
        setTimeout(() => {
            $(this).siblings().each(function(){
                $(this).find('.sub-menu-entries').addClass('hidden');
            });
            curr.focus().select();
        }, 10);
       
    });
}