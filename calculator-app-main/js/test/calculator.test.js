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
            input(calculator, '789');
            this.expect(calculator.listener).to.have.been.called.exactly(4);
            this.expect(calculator.listener).to.have.been.called.with.exactly('0');
            this.expect(calculator.listener).to.have.been.called.with.exactly('7');
            this.expect(calculator.listener).to.have.been.called.with.exactly('78');
            this.expect(calculator.listener).to.have.been.called.with.exactly('789');
        });

        it('should delete last digit with del', () => {
            const calculator = newCalculator({ value: '-789', hasInputStarted: true });
            calculator.op('DEL');
            calculator.op('DEL');
            calculator.op('DEL');
            this.expect(calculator.listener).to.have.been.called.with.exactly('-78');
            this.expect(calculator.listener).to.have.been.called.with.exactly('-7');
            this.expect(calculator.listener).to.have.been.called.with.exactly('0');
            this.expect(calculator.state.hasInputStarted).to.equal(false);
        });

        it('should add decimal once', () => {
            const calculator = newCalculator({ value: '123', hasInputStarted: true });
            calculator.op('.');
            calculator.op('7');
            calculator.op('.');
            calculator.op('7');
            calculator.op('.');
            calculator.op('7');
            this.expect(calculator.state.value).to.equal('123.777');
        });

        it('should add decimal as 0. when input is not started', () => {
            const calculator = newCalculator({ value: '123', hasInputStarted: false });
            this.expect(calculator.state.value).to.equal('123');
            calculator.op('.');
            this.expect(calculator.state.value).to.equal('0.');
        });


        it('should set to 0 when reset happens', () => {
            const calculator = newCalculator({ value: '123' });
            calculator.op('RESET');
            this.expect(calculator.state.value).to.equal('0');
        });

    });

    describe('Math operations', () => {
        it('should add', ()=> {
            const calculator = newCalculator({ value: '100.10', prevValue: '100.10', hasInputStarted: true });
            calculator.op('+');
            this.expect(calculator.state).to.include({
                value: '100.10',
                prevValue: '100.10',
                currentMathOp: '+',
                hasInputStarted: false
            });
            input(calculator, '77');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100.10',
                currentMathOp: '+',
                hasInputStarted: true
            });
            calculator.op('=');
            this.expect(calculator.state).to.include({
                value: '177.1',
                prevValue: '77',
                currentMathOp: '+',
                hasInputStarted: false
            });
        });
        it('should subtract', ()=> {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op('-');
            this.expect(calculator.state).to.include({
                value: '100',
                prevValue: '100',
                currentMathOp: '-',
                hasInputStarted: false
            });
            input(calculator, '77');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100',
                currentMathOp: '-',
                hasInputStarted: true
            });
            calculator.op('=');
            this.expect(calculator.state).to.include({
                value: '23',
                prevValue: '77',
                currentMathOp: '-',
                hasInputStarted: false
            });
        });
        it('should multiply', ()=> {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op('x');
            this.expect(calculator.state).to.include({
                value: '100',
                prevValue: '100',
                currentMathOp: 'x',
                hasInputStarted: false
            });
            input(calculator, '77');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100',
                currentMathOp: 'x',
                hasInputStarted: true
            });
            calculator.op('=');
            this.expect(calculator.state).to.include({
                value: '7700',
                prevValue: '77',
                currentMathOp: 'x',
                hasInputStarted: false
            });
        });
        it('should divide', ()=> {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op('/');
            this.expect(calculator.state).to.include({
                value: '100',
                prevValue: '100',
                currentMathOp: '/',
                hasInputStarted: false
            });
            input(calculator, '77');
            this.expect(calculator.state).to.include({
                value: '77',
                prevValue: '100',
                currentMathOp: '/',
                hasInputStarted: true
            });
            calculator.op('=');
            this.expect(calculator.state).to.include({
                value: '1.2987012987012987',
                prevValue: '77',
                currentMathOp: '/',
                hasInputStarted: false
            });
        });
        it('it should do perform prev result on next op math', () => {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op('+'); // sum
            input(calculator, '100');
            calculator.op('x'); // multiply
            input(calculator, '100');
            calculator.op('='); // result
            this.expect(calculator.state).to.include({
                value: '20000',
                prevValue: '100',
                currentMathOp: 'x',
                hasInputStarted: false,
            });
        });
        it('it should result only once', () => {
            const calculator = newCalculator({ value: '100', prevValue: '100', hasInputStarted: true });
            calculator.op('+'); // sum
            input(calculator, '100');
            calculator.op('='); // result
            calculator.op('='); // result
            calculator.op('='); // result
            this.expect(calculator.state).to.include({
                value: '200',
                prevValue: '100',
                currentMathOp: '+',
                hasInputStarted: false,
                hasMathOpStarted: false
            });
        })
    }); 

    function input(calculator, number){
        for(let n of number){
            calculator.op(n);
        }
    }

}).bind(chai));