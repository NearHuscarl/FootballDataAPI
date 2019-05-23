'use strict';

import fetch from 'node-fetch';
import {
    CompetitionsParams,
    IID,
    MatchParams,
    MatchFromPlayerParams,
    MatchFromTeamParams,
    MatchesParams,
    ScorerParams,
    StandingParams,
    TeamParams,
} from './params';
import {
    CompetitionsResult,
    CompetitionResult,
    TeamResult,
    StandingResult,
    MatchFromCompetitionResult,
    ScorerResult,
    MatchesResult,
    MatchResult,
    MatchFromTeamResult,
    TeamDetailResult,
    AreasResult,
    AreaResult,
    PlayerResult,
    MatchFromPlayerResult,
} from './results';

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
    
    getCompetitions(params: CompetitionsParams, headerData = false): Promise<CompetitionsResult> {
        const endpoint = this.baseUrl + 'competitions/';
        return this._request(endpoint, params, headerData);
    }

    getCompetition(params: IID, headerData = false): Promise<CompetitionResult> {
        const endpoint = this.baseUrl + 'competitions/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getTeamsFromCompetition(params: TeamParams, headerData = false): Promise<TeamResult> {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/teams/';
        return this._request(endpoint, params, headerData);
    }

    getStandingsFromCompetition(params: StandingParams, headerData = false): Promise<StandingResult> {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/standings/';
        return this._request(endpoint, params, headerData);
    }

    getMatchesFromCompetition(params: MatchParams, headerData = false): Promise<MatchFromCompetitionResult> {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/matches/';
        return this._request(endpoint, params, headerData);
    }

    getScorersFromCompetition(params: ScorerParams, headerData = false): Promise<ScorerResult> {
        const endpoint = this.baseUrl + 'competitions/{competitionId}/scorers/';
        return this._request(endpoint, params, headerData);
    }

    getMatches(params: MatchesParams, headerData = false): Promise<MatchesResult> {
        const endpoint = this.baseUrl + 'matches/';
        return this._request(endpoint, params, headerData);
    }

    getMatch(params: IID, headerData = false): Promise<MatchResult> {
        const endpoint = this.baseUrl + 'matches/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getMatchesFromTeam(params: MatchFromTeamParams, headerData = false): Promise<MatchFromTeamResult> {
        const endpoint = this.baseUrl + 'teams/{teamId}/matches/';
        return this._request(endpoint, params, headerData);
    }

    getTeam(params: IID, headerData = false): Promise<TeamDetailResult> {
        const endpoint = this.baseUrl + 'teams/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getAreas(headerData = false): Promise<AreasResult> {
        const endpoint = this.baseUrl + 'areas/';
        return this._request(endpoint, {}, headerData);
    }
    
    getArea(params: IID, headerData = false): Promise<AreaResult> {
        const endpoint = this.baseUrl + 'areas/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getPlayer(params: IID, headerData = false): Promise<PlayerResult> {
        const endpoint = this.baseUrl + 'players/{id}/';
        return this._request(endpoint, params, headerData);
    }

    getMatchesFromPlayer(params: MatchFromPlayerParams, headerData = false): Promise<MatchFromPlayerResult> {
        const endpoint = this.baseUrl + 'players/{playerId}/matches/';
        return this._request(endpoint, params, headerData);
    }
}

export default FootballData;