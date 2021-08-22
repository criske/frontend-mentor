/*jshint esversion: 9 */
export default class Queue {
    #elements = [];

    offer(element){
        this.#elements.push(element); 
    }

    peek(){
        return this.#elements[0];
    }

    poll(){
        return this.#elements.shift();
    }

    isEmpty(){
        return this.#elements.length == 0;
    }

}