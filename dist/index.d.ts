import { Competitions, IID, Match, MatchFromPlayer, MatchFromTeam, Matches, Scorers, Standing, Team } from './params';
declare class FootballData {
    baseUrl: string;
    constructor(apiKey: string);
    _request(endpoint: string, params: object | undefined, headerData: boolean): Promise<any>;
    _fillUrlParams(url: string, params: {
        [x: string]: any;
    }): string;
    getCompetitions(params: Competitions, headerData?: boolean): Promise<any>;
    getCompetition(params: IID, headerData?: boolean): Promise<any>;
    getTeamsFromCompetition(params: Team, headerData?: boolean): Promise<any>;
    getStandingsFromCompetition(params: Standing, headerData?: boolean): Promise<any>;
    getMatchesFromCompetition(params: Match, headerData?: boolean): Promise<any>;
    getScorersFromCompetition(params: Scorers, headerData?: boolean): Promise<any>;
    getMatches(params: Matches, headerData?: boolean): Promise<any>;
    getMatch(params: IID, headerData?: boolean): Promise<any>;
    getMatchesFromTeam(params: MatchFromTeam, headerData?: boolean): Promise<any>;
    getTeam(params: IID, headerData?: boolean): Promise<any>;
    getAreas(headerData?: boolean): Promise<any>;
    getArea(params: IID, headerData?: boolean): Promise<any>;
    getPlayer(params: IID, headerData?: boolean): Promise<any>;
    getMatchesFromPlayer(params: MatchFromPlayer, headerData?: boolean): Promise<any>;
}
export default FootballData;
