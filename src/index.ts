'use strict';

import fetch from 'node-fetch';
import {
    Competitions,
    IID,
    Match,
    MatchFromPlayer,
    MatchFromTeam,
    Matches,
    Scorers,
    Standing,
    Team,
} from './params';

let API_KEY = '';

class FootballData {
    baseUrl: string;

    constructor(apiKey: string) {
        API_KEY = apiKey;
        this.baseUrl = 'https://api.football-data.org/v2/';
    }

    _request(endpoint: string, params: object = {}) {
        const url = this._fillUrlParams(endpoint, params);

        return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY,
            },
        })
        .then((data: Response | any) => {
            return data.json();
        });
    }

    _fillUrlParams(url: string, params: { [x: string]: any; }) {
        let wrapped = url.match(/\{(.*?)\}/g);
        if (wrapped) {
            let unwrapped = (wrapped: string) => wrapped.replace('{', '').replace('}', '');
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
    
    getCompetitions(params: Competitions) {
        const endpoint = this.baseUrl + 'competitions/';
        return this._request(endpoint, params);
    }

    getCompetition(params: IID) {
        const endpoint = this.baseUrl + 'competitions/{id}/';
        return this._request(endpoint, params);
    }

    getTeamsFromCompetition(params: Team) {
        const endpoint = this.baseUrl + 'competitions/{id}/teams/';
        return this._request(endpoint, params);
    }

    getStandingsFromCompetition(params: Standing) {
        const endpoint = this.baseUrl + 'competitions/{id}/standings/';
        return this._request(endpoint, params);
    }

    getMatchesFromCompetition(params: Match) {
        const endpoint = this.baseUrl + 'competitions/{id}/matches/';
        return this._request(endpoint, params);
    }

    getScorersFromCompetition(params: Scorers) {
        const endpoint = this.baseUrl + 'competitions/{id}/scorers/';
        return this._request(endpoint, params);
    }

    getMatches(params: Matches) {
        const endpoint = this.baseUrl + 'matches/';
        return this._request(endpoint, params);
    }

    getMatch(params: IID) {
        const endpoint = this.baseUrl + 'matches/{id}/';
        return this._request(endpoint, params);
    }

    getMatchesFromTeam(params: MatchFromTeam) {
        const endpoint = this.baseUrl + 'teams/{id}/matches/';
        return this._request(endpoint, params);
    }

    getTeam(params: IID) {
        const endpoint = this.baseUrl + 'teams/{id}/';
        return this._request(endpoint, params);
    }

    getAreas() {
        const endpoint = this.baseUrl + 'areas/';
        return this._request(endpoint);
    }
    
    getArea(params: IID) {
        const endpoint = this.baseUrl + 'areas/{id}/';
        return this._request(endpoint, params);
    }

    getPlayer(params: IID) {
        const endpoint = this.baseUrl + 'players/{id}/';
        return this._request(endpoint, params);
    }

    getMatchesFromPlayer(params: MatchFromPlayer) {
        const endpoint = this.baseUrl + 'players/{id}/matches/';
        return this._request(endpoint, params);
    }
}

export default FootballData;