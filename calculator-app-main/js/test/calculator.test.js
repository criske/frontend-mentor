import Calculator from "../calculator.mjs";

describe('Calculator', (function () {

    const newCalculator = (initialState) => {
        const calculator = new Calculator(initialState);
        const listener = this.spy((state) => { });
        calculator.setListener(listener);
        return calculator;
    }

    describe('Inputs', () => {
        it('should return initial state', () => {
            const calculator = newCalculator();
            this.expect(calculator.listener).to.have.been.called.with.exactly('0');
        });

        it('should input simple digits', () => {
            const calculator = newCalculator();
            calculator.op(0, '7');
            calculator.op(1, '8');
            calculator.op(2, '9');
            this.expect(calculator.listener).to.have.been.called.exactly(4);
            this.expect(calculator.listener).to.have.been.called.with.exactly('0');
            this.expect(calculator.listener).to.have.been.called.with.exactly('7');
            this.expect(calculator.listener).to.have.been.called.with.exactly('78');
            this.expect(calculator.listener).to.have.been.called.with.exactly('789');
        });

        it('should delete last digit with del', () => {
            const calculator = newCalculator({ value: '-789', hasInputStarted: true });
            calculator.op(3);
            calculator.op(3);
            calculator.op(3);
            this.expect(calculator.listener).to.have.been.called.with.exactly('-78');
            this.expect(calculator.listener).to.have.been.called.with.exactly('-7');
            this.expect(calculator.listener).to.have.been.called.with.exactly('0');
            this.expect(calculator.state.hasInputStarted).to.equal(false);
        });

        it('should add decimal once', () => {
            const calculator = newCalculator({ value: '123', hasInputStarted: true });
            calculator.op(12);
            calculator.op(0, '7');
            calculator.op(12);
            calculator.op(0, '7');
            calculator.op(12);
            calculator.op(0, '7');
            this.expect(calculator.state.value).to.equal('123.777');
        });

        it('should add decimal as 0. when input is not started', () => {
            const calculator = newCalculator({ value: '123', hasInputStarted: false });
            this.expect(calculator.state.value).to.equal('123');
            calculator.op(12);
            this.expect(calculator.state.value).to.equal('0.');
        });


        it('should set to 0 when reset happens', () => {
            const calculator = newCalculator({ value: '123' });
            calculator.op(16);
            this.expect(calculator.state.value).to.equal('0');
        });

    });

    describe('Math operations', () => {
        it('should add', ()=> {
            const calculator = newCalculator({ value: '100.10', prevValue: '100.10', hasInputStarted: true });
            calculator.op(7);
            this.expect(calculator.state).to.include({
                value: '100.10',
                prevValue: '100.10',
                currentMathOp: 7,
                hasInputStarted: false
            });
            calculator.op(0, '7');
            calculator.op(0, '7');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100.10',
                currentMathOp: 7,
                hasInputStarted: true
            });
            calculator.op(17);
            this.expect(calculator.state).to.include({
                value: '177.1',
                prevValue: '177.1',
                currentMathOp: 7,
                hasInputStarted: false
            });
        });
        it('should subtract', ()=> {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op(11);
            this.expect(calculator.state).to.include({
                value: '100',
                prevValue: '100',
                currentMathOp: 11,
                hasInputStarted: false
            });
            calculator.op(0, '7');
            calculator.op(0, '7');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100',
                currentMathOp: 11,
                hasInputStarted: true
            });
            calculator.op(17);
            this.expect(calculator.state).to.include({
                value: '23',
                prevValue: '23',
                currentMathOp: 11,
                hasInputStarted: false
            });
        });
        it('should multiply', ()=> {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op(15);
            this.expect(calculator.state).to.include({
                value: '100',
                prevValue: '100',
                currentMathOp: 15,
                hasInputStarted: false
            });
            calculator.op(0, '7');
            calculator.op(0, '7');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100',
                currentMathOp: 15,
                hasInputStarted: true
            });
            calculator.op(17);
            this.expect(calculator.state).to.include({
                value: '7700',
                prevValue: '7700',
                currentMathOp: 15,
                hasInputStarted: false
            });
        });
        it('should multiply', ()=> {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op(14);
            this.expect(calculator.state).to.include({
                value: '100',
                prevValue: '100',
                currentMathOp: 14,
                hasInputStarted: false
            });
            calculator.op(0, '7');
            calculator.op(0, '7');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100',
                currentMathOp: 14,
                hasInputStarted: true
            });
            calculator.op(17);
            this.expect(calculator.state).to.include({
                value: '1.2987012987012987',
                prevValue: '1.2987012987012987',
                currentMathOp: 14,
                hasInputStarted: false
            });
        });
        it('it should do result on math op when current math op is already set but different', () => {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op(7); // sum
            calculator.op(8, '1');
            calculator.op(13, '0');
            calculator.op(13, '0');
            calculator.op(15); // multiply
            calculator.op(8, '1');
            calculator.op(13, '0');
            calculator.op(13, '0');
            calculator.op(17); // result
            this.expect(calculator.state).to.include({
                value: '20000',
                prevValue: '20000',
                currentMathOp: 15,
                hasInputStarted: false,
            });
        });
        it('it should repeat the current op when pressing result multiple times', () => {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op(7); // sum
            calculator.op(8, '1');
            calculator.op(13, '0');
            calculator.op(13, '0');
            calculator.op(17); // result
            calculator.op(17); // result
            calculator.op(17); // result
            this.expect(calculator.state).to.include({
                value: '800',
                prevValue: '800',
                currentMathOp: 7,
                hasInputStarted: false,
                hasMathOpStarted: false
            });
        })
    }); 

}).bind(chai));