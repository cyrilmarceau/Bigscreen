class HelperBS {
    constructor() {}

    static getItem(key) {
        if (typeof key !== null) {
            return typeof widnow === 'object' ? localStorage.getItem(`@${key}`) : () => {};
        } else throw new Error('ERROR_EMPTY_KEY');
    }

    static setItem(key, value) {
        if (typeof key === null) {
            throw new Error('ERROR_EMPTY_KEY');
        } else if (typeof value === null) {
            throw new Error('ERROR_EMPTY_VALUE');
        } else typeof widnow === 'object' ? localStorage.setItem(`@${key}`, `@${value}`) : () => {};
    }

    static removeItem(key) {
        if (typeof key === null) {
            throw new Error('ERROR_EMPTY_KEY');
        } else typeof widnow === 'object' ? localStorage.removeItem(`@${key}`) : () => {};
    }

    static removeAllItem() {
        return typeof widnow === 'object' ? localStorage.clear() : () => {};
    }
}

const Helper = new HelperBS();

export default Helper;
