// @flow

export default class Ratings {
    value: number;
    maxRatings: string; 
    usersCount: Object;

    constructor({value, maxRatings, usersCount}) {
        this.value = value;
        this.maxRatings = maxRatings;
        this.usersCount = usersCount;
    }

    getRatings() {
        return this.value;
    }

    getMaxRatings() {
        return this.maxRatings;
    }

    getUsersCount() {
        return this.usersCount;
    }

}