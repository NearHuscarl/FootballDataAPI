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

// Do not use querystring from NodeJs since it will
// convert { a: 1, b: [2, 3, 4] } to '?a=1&b=2&b=3&b=4'
// but we want the result to be '?a=1&b=2,3,4'
const toQueryString = (params: { [x: string]: any }) => {
    const keys = Object.keys(params);

    if (keys.length === 0) {
        return '';
    }

    let queryString = '?';

    keys.forEach((key, index) => {
        const value = params[key].toString();
        if (index === keys.length - 1) {
            queryString += `${key}=${value}`;
        } else {
            queryString += `${key}=${value}&`;
        }
    });

    return queryString;
}

class FootballData {
    baseUrl: string;

    constructor(apiKey: string) {
        API_KEY = apiKey;
        this.baseUrl = 'https://api.football-data.org/v2/';
    }

    _request(endpoint: string, params: object, headerData: boolean) {
        const url = this._fillUrlParams(endpoint, params);

        return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY,
            },
        })
        .then((data: Response | any) => {
            return Promise.all([data, data.json()]);
        })
        .then((result) => {
            const [data, json] = result;

            if (headerData) {
                json.api = {
                    version: data.headers.get('X-API-Version'),
                    client: data.headers.get('X-Authenticated-Client'),
                    secLeftUntilReset: Number(data.headers.get('X-RequestCounter-Reset')),
                    remainingRequests: Number(data.headers.get('X-Requests-Available-Minute')),
                };
            }

            return json;
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

        const query = toQueryString(params);
        return query ? `${url}${query}` : url;
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