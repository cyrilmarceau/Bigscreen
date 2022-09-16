import Helper from '~/helpers';
import _ from 'lodash';
import axios from 'axios';
import { message as messageAntd } from 'antd';

class APIFactory {
    constructor(publicApiUrl, prefix) {
        this.publicApiUrl = publicApiUrl;
        this.prefix = prefix;
        this.getAxiosInstance();
    }

    getAxiosInstance(autenticatedRoute = false, extraParams = {}) {
        let reqHeaders = {
            ...extraParams,
        };

        if (autenticatedRoute === true) {
            const authToken = Helper.getItem('authToken');
            reqHeaders.Authorization = `Bearer ${authToken}`;
        }

        return axios.create({
            baseURL: this.publicApiUrl,
            headers: reqHeaders,
        });
    }

    handleResponse({ status, data, message }) {
        switch (status) {
            case 200:
                return data;
            case 400:
                messageAntd.error(`${data.message}`);
                return { ...data, results: [], status, axiosMessage: message };
            case 404:
                messageAntd.error(`${data.message}`);
                return { ...data, status, axiosMessage: message };
            case 500:
                messageAntd.error(`${data.message}`);
                return { ...data, status, axiosMessage: message };
            case 0:
                messageAntd.error(`${data.message}`);
                return { ...data, status, axiosMessage: message };
            default:
                messageAntd.error(`${data.message}`);
                return { ...data, status, axiosMessage: message };
        }
    }

    async getRoute(url, extraParams = {}, autenticatedRoute = false) {
        const api = this.getAxiosInstance(autenticatedRoute);
        try {
            const response = await api.get(url + '/', { params: extraParams });
            return this.handleResponse(response);
        } catch ({ code, message, name, response }) {
            throw this.handleResponse({ data: response.data, message, status: response?.status });
        }
    }

    async postRoute(url, values, autenticatedRoute = false) {
        const api = this.getAxiosInstance(autenticatedRoute);

        try {
            const response = await api.post(url + '/', values);
            return this.handleResponse(response);
        } catch ({ code, message, name, response }) {
            throw this.handleResponse({ data: response.data, message, status: response?.status });
        }
    }

    /** ----------------------------------------------------------------------------- AUTH */
    login(values = {}) {
        if (_.isNil(values)) return Promise.reject(new Error('ERR_EMPTY_PARAM'));
        return this.postRoute(`${this.prefix}login`, values, false);
    }

    logout() {
        return this.postRoute(`${this.prefix}logout`, null, true);
    }

    getClientQuestions() {
        return this.getRoute(`${this.prefix}client/questions`, null, false);
    }

    getAdminQuestions() {
        return this.getRoute(`${this.prefix}admin/questions`, null, false);
    }

    getSurveyedBySlug(slug) {
        if (_.isNil(slug)) return Promise.reject(new Error('ERR_EMPTY_PARAM'));
        return this.getRoute(`${this.prefix}surveyeds/${slug}`, null, false);
    }

    createSurveyed(values) {
        if (_.isNil(values)) return Promise.reject(new Error('ERR_EMPTY_PARAM'));
        return this.postRoute(`${this.prefix}surveyeds`, values, false);
    }
}

const API = typeof window !== 'undefined' ? new APIFactory('http://127.0.0.1:8000/', 'api/') : null;

export default API;
