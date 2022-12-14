import moment from 'moment';

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
            if (typeof result === 'object') {
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

    static formatDate(date) {
        return moment(date).format('DD/MM/YYYY à HH:mm:ss');
    }

    static parseQuestionOption(answer) {
        if (answer.question.type === 'A') {
            const questionOptions = JSON.parse(answer.question.options);

            return questionOptions.find((option) => option.key === answer.content).value;
        }

        return answer.content;
    }
}

export default Helper;
