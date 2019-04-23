import { Competitions, IID, Match, MatchFromPlayer, MatchFromTeam, Matches, Scorers, Standing, Team } from './params';
declare class FootballData {
    baseUrl: string;
    constructor(apiKey: string);
    _request(endpoint: string, params?: object): Promise<any>;
    _fillUrlParams(url: string, params: {
        [x: string]: any;
    }): string;
    getCompetitions(params: Competitions): Promise<any>;
    getCompetition(params: IID): Promise<any>;
    getTeamsFromCompetition(params: Team): Promise<any>;
    getStandingsFromCompetition(params: Standing): Promise<any>;
    getMatchesFromCompetition(params: Match): Promise<any>;
    getScorersFromCompetition(params: Scorers): Promise<any>;
    getMatches(params: Matches): Promise<any>;
    getMatch(params: IID): Promise<any>;
    getMatchesFromTeam(params: MatchFromTeam): Promise<any>;
    getTeam(params: IID): Promise<any>;
    getAreas(): Promise<any>;
    getArea(params: IID): Promise<any>;
    getPlayer(params: IID): Promise<any>;
    getMatchesFromPlayer(params: MatchFromPlayer): Promise<any>;
}
export default FootballData;
