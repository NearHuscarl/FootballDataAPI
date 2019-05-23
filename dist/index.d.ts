import { CompetitionsParams, IID, MatchParams, MatchFromPlayerParams, MatchFromTeamParams, MatchesParams, ScorerParams, StandingParams, TeamParams } from './params';
import { CompetitionsResult, CompetitionResult, TeamResult, StandingResult, MatchFromCompetitionResult, ScorerResult, MatchesResult, MatchResult, MatchFromTeamResult, TeamDetailResult, AreasResult, AreaResult, PlayerResult, MatchFromPlayerResult } from './results';
declare class FootballData {
    baseUrl: string;
    constructor(apiKey: string);
    _request(endpoint: string, params: object | undefined, headerData: boolean): Promise<any>;
    _fillUrlParams(url: string, params: {
        [x: string]: any;
    }): string;
    getCompetitions(params: CompetitionsParams, headerData?: boolean): Promise<CompetitionsResult>;
    getCompetition(params: IID, headerData?: boolean): Promise<CompetitionResult>;
    getTeamsFromCompetition(params: TeamParams, headerData?: boolean): Promise<TeamResult>;
    getStandingsFromCompetition(params: StandingParams, headerData?: boolean): Promise<StandingResult>;
    getMatchesFromCompetition(params: MatchParams, headerData?: boolean): Promise<MatchFromCompetitionResult>;
    getScorersFromCompetition(params: ScorerParams, headerData?: boolean): Promise<ScorerResult>;
    getMatches(params: MatchesParams, headerData?: boolean): Promise<MatchesResult>;
    getMatch(params: IID, headerData?: boolean): Promise<MatchResult>;
    getMatchesFromTeam(params: MatchFromTeamParams, headerData?: boolean): Promise<MatchFromTeamResult>;
    getTeam(params: IID, headerData?: boolean): Promise<TeamDetailResult>;
    getAreas(headerData?: boolean): Promise<AreasResult>;
    getArea(params: IID, headerData?: boolean): Promise<AreaResult>;
    getPlayer(params: IID, headerData?: boolean): Promise<PlayerResult>;
    getMatchesFromPlayer(params: MatchFromPlayerParams, headerData?: boolean): Promise<MatchFromPlayerResult>;
}
export default FootballData;
