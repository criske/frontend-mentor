import State from './state.mjs';

class App {

    #tips = [5, 10, 15, 25, 50];

    #state;

    constructor(state) {
        this.#state = state;

        //select all on input focus
        $("input").focus(function () { $(this).select();});

        //listen to state changes and update view;
        this.#state.onUpdate(this.#updateView.bind(this));

        //listen to tip taps and custom tip tap;
        this.#tips.forEach(tip => $(`#tip-${tip}`).click(this.#onTipPressed.bind(this)(tip)));
        $('#tip-custom').click(() => {
            $('#tip-custom-input').show();
            $('#tip-custom-input').focus();
            $('#tip-custom').hide();
        });
       
        //listen to inputs, data is validated and state updated on "ENTER" or focus lost;
        $('#bill').on('keypress', this.#onInputEnter.bind(this)(false));
        $('#bill').on('blur', this.#onInputBlur.bind(this)(false));
        $('#people').on('keypress', this.#onInputEnter.bind(this)(false));
        $('#people').on('blur', this.#onInputBlur.bind(this)(false));
        $('#tip-custom-input').on('keypress', this.#onInputEnter.bind(this)(true));
        $('#tip-custom-input').on('blur', this.#onInputBlur.bind(this)(true));

        //listen to resest
        $('#reset').click(this.#state.reset.bind(this.#state));
       
    }

    #onTipPressed(tip) {
        return () => {
            this.#state.update({ tip: { isCustom: false, value: tip } })
        };
    }

    #onInputEnter(isCustomTip) {
        return (e) => {
            if (e.which == 13) {
                const target = $(e.target);
                this.#onInput(isCustomTip, target);
            }
        };
    }

    #onInputBlur(isCustomTip){
        return (e) => {
            const target = $(e.target);
            this.#onInput(isCustomTip, target);
        };
    }

    #onInput(isCustomTip, target){
        const input = parseFloat(target.val());
        const id = target.attr('id');
        if (input > 0.0) {
            if (isCustomTip && input > 50) {
                $(`#${id}-error`).text("Tip must be at most 50%");
                $(`#${id}-error`).show();
                $('#tip-custom-input').parent().addClass('input-section-control-error');
            } else {
                const data = {};
                const key = isCustomTip ? "tip" : id;
                data[key] = isCustomTip ? { isCustom: true, value: input } : input;
                this.#state.update(data);
                $(`#${id}-error`).hide();
                $(`#${id}`).parent().removeClass('input-section-control-error');
                if (isCustomTip) {
                    $('#tip-custom').show();
                    $('#tip-custom').text(`${input}%`);
                    $('#tip-custom-input').hide();
                    $('#tip-custom-input').parent().removeClass('input-section-control-error');
                }
            }
        } else {
            $(`#${id}-error`).text("Must be a positive value");
            $(`#${id}-error`).show();
            $(`#${id}`).parent().addClass('input-section-control-error');
        }
    }

    #isStateComplete(state) {
        return state.bill > 0.0 && state.people > 0 && state.tip.value > 0;
    }

    #updateView(state) {

        $('#bill').val(state.bill);
        $('#people').val(state.people);

        this.#tips.forEach(tip => {
            if (tip === state.tip.value && !state.tip.isCustom) {
                $(`#tip-${tip}`).addClass('input-section-tips-btn-active');
            } else {
                $(`#tip-${tip}`).removeClass('input-section-tips-btn-active');
            }
        });
        if (state.tip.isCustom) {
            $('#tip-custom').addClass('input-section-tips-btn-active');
            $('#tip-custom').text(`\$${state.tip.value}`);
            $('#tip-custom-input').val(state.tip.value);
        } else {
            $('#tip-custom').removeClass('input-section-tips-btn-active');
            $('#tip-custom').text('Custom');
            $('#tip-custom').show();
            $('#tip-custom-input').val(0);
            $('#tip-custom-input').hide();
            $('#tip-custom-input-error').hide();
            $('#tip-custom-input').parent().removeClass('input-section-control-error');
        }

        //calculate if state is ready (bill, people and tip are set)
        const isStateComplete = this.#isStateComplete(state);
        $('#reset').attr('disabled', !isStateComplete);
        if (isStateComplete) {
            const tipPerson = (state.bill * (state.tip.value / 100)) / state.people;
            const totalPerson = (state.bill / state.people) + tipPerson;
            $(`#tip-person`).text(`\$${tipPerson.toFixed(2)}`);
            $(`#total-person`).text(`\$${totalPerson.toFixed(2)}`);
        } else {
            $(`#tip-person`).text(`\$0.00`);
            $(`#total-person`).text(`\$0.00`);
        }
    }
}

$(document).ready(() => {
    new App(new State(
        {
            bill: 0,
            people: 0,
            tip: {
                isCustom: false,
                value: 0
            }
        }
    ));
});