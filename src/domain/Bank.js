// @flow

export default class Bank {
    id: number;
    name: string; 

    constructor({id, name}) {
        this.id = id;
        this.name = name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}