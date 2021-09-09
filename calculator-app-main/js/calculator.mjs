export default class Calculator {

    static #INITIAL_STATE = {
        value: '0',
        prevValue: '0',
        hasInputStarted: false,
        currentMathOp: -1,
        hasMathOpStarted: false
    };

    #state = Calculator.#INITIAL_STATE;

    #listener = (state) => { }

    constructor(state) {
        this.#state = { ...this.#state, ...state };
    }

    get state() {
        return this.#state;
    }

    get listener() {
        return this.#listener;
    }

    op(type, value) {
        switch (type) {
            case 3: {
                this.#opDel();
                break;
            }
            case 7:
            case 11:
            case 14:
            case 15: {
                this.#opMath(type);
                break;
            }
            case 16: {
                this.#opReset();
                break;
            }
            case 17: {
                this.#opEq();
                break;
            }
            case 12: {
                this.#opDecimal();
                break;
            }
            default: {
                this.#opInput(value);
            }
        }
    }

    setListener(listener) {
        this.#listener = listener;
        this.#notify();
    }

    #opDel() {
        if (this.#state.hasInputStarted) {
            const value = this.#state.value;
            let next = value.substring(0, value.length - 1);
            let hasInputStarted = this.#state.hasInputStarted;
            if (next === '' || next === '-') {
                next = '0';
                hasInputStarted = false;
            }
            this.#state = { ...this.#state, hasInputStarted, value: next };
            this.#notify();
        }
    }

    #opMath(type) {
        const prevValue = this.#state.hasMathOpStarted && this.state.hasInputStarted
            ? this.#calculate().toString()
            : this.#state.value;
        this.#state = {
            ...this.#state,
            value: prevValue,
            prevValue: this.#state.value,
            currentMathOp: type,
            hasInputStarted: false,
            hasMathOpStarted: true
        }
        this.#notify();
    }

    #opReset() {
        this.#state = Calculator.#INITIAL_STATE;
        this.#notify();
    }

    #opDecimal() {
        const hasDecimal = this.#hasDecimal(this.#state.value);
        if (!hasDecimal) {
            let next;
            if (!this.#state.hasInputStarted) {
                next = '0.';
            } else {
                next = this.#state.value + ".";
            }
            this.#state = { ...this.#state, value: next };
            this.#notify();
        }
    }

    #opInput(value) {
        if (!this.#state.hasInputStarted) {
            this.#state = { ...this.#state, hasInputStarted: true, value };
        } else {
            const next = this.#state.value + value;
            this.#state = { ...this.#state, value: next };
        }
        this.#notify();
    }

    #opEq() {
        const next = this.#calculate();
        this.#state = {
            ...this.#state,
            prevValue: this.#state.value,
            value: next.toString(),
            hasInputStarted: false,
            hasMathOpStarted: false
        }
        this.#notify();
    }

    #calculate() {
        const prevValue = this.#convertToNum(this.#state.prevValue);
        const value = this.#convertToNum(this.#state.value);
        let next;
        switch (this.#state.currentMathOp) {
            case 7: {
                next = prevValue + value;
                break;
            }
            case 11: {
                next = prevValue - value;
                break;
            }
            case 14: {
                next = value > 0.0 ? prevValue / value : 0;
                break;
            }
            case 15: {
                next = prevValue * value;
                break;
            }
            default: {
                next = value;
            }
        }
        return next;
    }

    #notify() {
        this.#listener(this.#state.value);
    }

    #hasDecimal(value) {
        return value.indexOf('.') !== -1;
    }

    #convertToNum(value) {
        return this.#hasDecimal(value) ? parseFloat(value) : parseInt(value);
    }

}