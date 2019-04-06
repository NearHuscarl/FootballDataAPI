'use strict';

import fetch from 'node-fetch';
let API_KEY = '';

class FootballData {
    constructor(apiKey) {
        API_KEY = apiKey;
        this.baseUrl = 'https://api.football-data.org/v2/';
    }

    _request(endpoint, params = {}) {
        const url = this._fillUrlParams(endpoint, params);

        return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY,
            },
        })
        .then((data) => {
            return data.json();
        });
    }

    _fillUrlParams(url, params) {
        let wrapped = url.match(/\{(.*?)\}/g);
        if (wrapped) {
            let unwrapped = (wrapped) => wrapped.replace('{', '').replace('}', '');
            for (let w in wrapped) {
                let k = unwrapped(wrapped[w]);
                url = url.replace(wrapped[w], params[k]);
                delete params[k];
            }
        }

        let urlParams = '';
        if (params && Object.keys(params).length > 0) {
            urlParams = '?';
            
            Object.keys(params).forEach((key) => {
                urlParams += `${key}=${params[key]}&`;
            })
        }
        urlParams = urlParams.slice(0, -1); // remove trailing '&'

        return url + urlParams;
    }
    
    getCompetitions(params) {
        const endpoint = this.baseUrl + 'competitions/';
        return this._request(endpoint, params);
    }

    getCompetition(params) {
        const endpoint = this.baseUrl + 'competitions/{id}/';
        return this._request(endpoint, params);
    }

    getTeamsFromCompetition(params) {
        const endpoint = this.baseUrl + 'competitions/{id}/teams/';
        return this._request(endpoint, params);
    }

    getStandingsFromCompetition(params) {
        const endpoint = this.baseUrl + 'competitions/{id}/standings/';
        return this._request(endpoint, params);
    }

    getMatchesFromCompetition(params) {
        const endpoint = this.baseUrl + 'competitions/{id}/matches/';
        return this._request(endpoint, params);
    }

    getScorersFromCompetition(params) {
        const endpoint = this.baseUrl + 'competitions/{id}/scorers/';
        return this._request(endpoint, params);
    }

    getMatches(params) {
        const endpoint = this.baseUrl + 'matches/';
        return this._request(endpoint, params);
    }

    getMatch(params) {
        const endpoint = this.baseUrl + 'matches/{id}/';
        return this._request(endpoint, params);
    }

    getMatchesFromTeam(params) {
        const endpoint = this.baseUrl + 'teams/{id}/matches/';
        return this._request(endpoint, params);
    }

    getTeam(params) {
        const endpoint = this.baseUrl + 'teams/{id}/';
        return this._request(endpoint, params);
    }

    getAreas() {
        const endpoint = this.baseUrl + 'areas/';
        return this._request(endpoint);
    }
    
    getArea(params) {
        const endpoint = this.baseUrl + 'areas/{id}/';
        return this._request(endpoint, params);
    }

    getPlayer(params) {
        const endpoint = this.baseUrl + 'players/{id}/';
        return this._request(endpoint, params);
    }

    getMatchesFromPlayer(params) {
        const endpoint = this.baseUrl + 'players/{id}/matches/';
        return this._request(endpoint, params);
    }
}

export default FootballData;