class Helper {
    static getItem(key) {
        if (typeof key === null) {
            throw new Error('ERROR_EMPTY_KEY');
        } else {
            const result = localStorage.getItem(`@${key}`);
            if (typeof result === 'object') {
                return JSON.parse(result);
            } else {
                return result;
            }
        }
    }

    static setItem(key, value) {
        if (typeof key === null) {
            throw new Error('ERROR_EMPTY_KEY');
        } else if (typeof value === null) {
            throw new Error('ERROR_EMPTY_VALUE');
        } else {
            if (typeof window === 'object') {
                return localStorage.setItem(`@${key}`, `${JSON.stringify(value)}`);
            } else {
                return localStorage.setItem(`@${key}`, `${value}`);
            }
        }
    }

    static removeItem(key) {
        if (typeof key === null) {
            throw new Error('ERROR_EMPTY_KEY');
        } else {
            return localStorage.removeItem(`@${key}`);
        }
    }

    static removeAllItem() {
        return localStorage.clear();
    }
}

export default Helper;
