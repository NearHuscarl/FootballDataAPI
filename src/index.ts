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

    _request(endpoint: string, params: object = {}, headerData: boolean) {
        const url = this._fillUrlParams(endpoint, params);
        let api: object;

        return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY,
            },
        })
        .then((data: Response | any) => {
            if (headerData) {
                api = {
                    version: data.headers.get('X-API-Version'),
                    client: data.headers.get('X-Authenticated-Client'),
                    secLeftUntilReset: Number(data.headers.get('X-RequestCounter-Reset')),
                    remainingRequests: Number(data.headers.get('X-Requests-Available-Minute')),
                };
            }
            return data.json();
        })
        .then((result) => {
            if (headerData) result.api = api;
            return result;
        });
    }

    _fillUrlParams(url: string, params: { [x: string]: any; }) {
        let wrapped = url.match(/\{(.*?)\}/g);
        if (wrapped) {
            const unwrapped = (wrapped: string) => wrapped.replace('{', '').replace('}', '');
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
    
    getCompetitions(params: Competitions, headerData = false) {
        const endpoint = this.baseUrl + 'competitions/';
        return this._request(endpoint, params, headerData);
    }

    getCompetition(params: IID, headerData = false) {
        const endpoint = this.baseUrl + 'competitions/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getTeamsFromCompetition(params: Team, headerData = false) {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/teams/';
        return this._request(endpoint, params, headerData);
    }

    getStandingsFromCompetition(params: Standing, headerData = false) {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/standings/';
        return this._request(endpoint, params, headerData);
    }

    getMatchesFromCompetition(params: Match, headerData = false) {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/matches/';
        return this._request(endpoint, params, headerData);
    }

    getScorersFromCompetition(params: Scorers, headerData = false) {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/scorers/';
        return this._request(endpoint, params, headerData);
    }

    getMatches(params: Matches, headerData = false) {
        const endpoint = this.baseUrl + 'matches/';
        return this._request(endpoint, params, headerData);
    }

    getMatch(params: IID, headerData = false) {
        const endpoint = this.baseUrl + 'matches/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getMatchesFromTeam(params: MatchFromTeam, headerData = false) {
        const endpoint = this.baseUrl + 'teams/{teamId}/matches/';
        return this._request(endpoint, params, headerData);
    }

    getTeam(params: IID, headerData = false) {
        const endpoint = this.baseUrl + 'teams/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getAreas(headerData = false) {
        const endpoint = this.baseUrl + 'areas/';
        return this._request(endpoint, {}, headerData);
    }
    
    getArea(params: IID, headerData = false) {
        const endpoint = this.baseUrl + 'areas/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getPlayer(params: IID, headerData = false) {
        const endpoint = this.baseUrl + 'players/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getMatchesFromPlayer(params: MatchFromPlayer, headerData = false) {
        const endpoint = this.baseUrl + 'players/{playerId}/matches/';
        return this._request(endpoint, params, headerData);
    }
}

export default FootballData;