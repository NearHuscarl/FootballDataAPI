import APIHeader from './apiHeader';
import { CompetitionsParams, IStage } from './params';
import IPlan from './plan';
import StandingType from './standingType';
import Stage from './stage';
import Status from './status';
import Venue from './venue';
interface Result {
    api?: APIHeader;
}
export interface AreaSummary {
    id: number;
    name: string;
}
export interface CompetitionBase {
    id: number;
    area: AreaSummary;
    name: string;
    code: string | null;
    emblemUrl?: string | null;
    plan: IPlan;
    currentSeason: CompetitionSeason | null;
    lastUpdated: string;
}
export interface Winner {
    id: number;
    name: string;
    shortName: string | null;
    tla: string | null;
    crestUrl: string | null;
}
export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number | null;
}
export interface CompetitionSeason extends Season {
    winner: Winner | null;
}
export interface Competition extends CompetitionBase {
    numberOfAvailableSeasons: number;
}
export interface CompetitionsResult extends Result {
    count: number;
    filters: CompetitionsParams;
    competitions: Array<Competition>;
}
export interface CompetitionResult extends CompetitionBase, Result {
    seasons: Array<CompetitionSeason> | null;
}
export interface Team {
    id: number;
    area: AreaSummary;
    name: string;
    shortName: string | null;
    tla: string | null;
    crestUrl: string | null;
    address: string | null;
    phone: string | null;
    website: string | null;
    email: string | null;
    founded: number | null;
    clubColors: string | null;
    venue: string | null;
    lastUpdated: string;
}
interface CompetitionSummary {
    id: number;
    area: AreaSummary;
    name: string;
    code: string | null;
    plan: IPlan;
    lastUpdated: string;
}
export interface TeamResult extends Result {
    count: number;
    filters: IStage;
    competition: CompetitionSummary;
    season: CompetitionSeason;
    teams: Array<Team>;
}
export interface TeamSummary {
    id: number;
    name: string;
    crestUrl: string | null;
}
interface Rank {
    position: number;
    team: TeamSummary;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}
interface Standing {
    stage: Stage;
    type: StandingType;
    group: string | null;
    table: Array<Rank>;
}
export interface StandingResult extends Result {
    filters: {};
    competition: CompetitionSummary;
    season: CompetitionSeason;
    standings: Array<Standing>;
}
interface TeamName {
    id: number;
    name: string;
}
interface Referee {
    id: number;
    name: string | null;
    nationality: string | null;
}
interface ScoreInfo {
    homeTeam: number | null;
    awayTeam: number | null;
}
interface Score {
    winner: string | null;
    duration: string;
    fullTime: ScoreInfo;
    halfTime: ScoreInfo;
    extraTime: ScoreInfo;
    penalties: ScoreInfo;
}
interface MatchBase {
    id: number;
    utcDate: string;
    status: Status;
    matchday: number;
    stage: Stage;
    group: string | null;
    lastUpdated: string;
    score: Score;
    homeTeam: TeamName;
    awayTeam: TeamName;
    referees: Array<Referee>;
}
interface MatchFromCompetition extends MatchBase {
    season: Season;
}
export interface MatchFromCompetitionResult extends Result {
    filters: {
        status?: Array<Status>;
        stage?: Array<Stage>;
        matchday?: string | null;
    };
    competition: CompetitionSummary;
    matches: Array<MatchFromCompetition>;
}
interface Player {
    id: number;
    name: string;
    firstName: string;
    lastName: string | null;
    dateOfBirth: string;
    countryOfBirth: string;
    nationality: string;
    position: string;
    shirtNumber: number;
    lastUpdated: string;
}
interface Scorer {
    player: Player;
    team: TeamName;
    numberOfGoals: number;
}
export interface ScorerResult extends Result {
    count: number;
    filters: {
        limit: number;
    };
    competition: CompetitionSummary;
    season: CompetitionSeason;
    scorers: Array<Scorer>;
}
interface Match extends MatchBase {
    competition: {
        id: number;
        name: string;
    };
    season: CompetitionSeason;
}
export interface MatchesResult extends Result {
    count: number;
    filters: {
        dateFrom: string;
        dateTo: string;
        permission: string;
        status?: Array<Status>;
        competitions?: Array<number>;
    };
    matches: Array<Match>;
}
interface MatchDetail extends Match {
    venue: string;
}
interface MatchStats {
    wins: number;
    draws: number;
    losses: number;
}
interface Head2head {
    numberOfMatches: number;
    totalGoals: number;
    homeTeam: MatchStats;
    awayTeam: MatchStats;
}
export interface MatchResult extends Result {
    head2head: Head2head;
    match: MatchDetail;
}
export interface MatchFromTeamResult extends Result {
    count: number;
    filters: {
        permission: string;
        dateFrom?: string;
        dateTo?: string;
        status?: Array<Status>;
        venue?: Venue;
        limit: number;
    };
    matches: Array<Match>;
}
interface PlayerFromTeam {
    id: number;
    name: string;
    position: string | null;
    dateOfBirth: string;
    countryOfBirth: string;
    nationality: string;
    shirtNumber: number | null;
    role: string;
}
export interface TeamDetailResult extends Result, Team {
    activeCompetitions: Array<CompetitionSummary>;
    squad: Array<PlayerFromTeam>;
}
interface Area {
    id: number;
    name: string;
    countryCode: string;
    ensignUrl: string | null;
    parentAreaId: number | null;
    parentArea: string | null;
}
export interface AreasResult extends Result {
    count: number;
    filters: {};
    areas: Array<Area>;
}
export interface AreaResult extends Result, Area {
    childAreas: Array<Area>;
}
export interface PlayerResult extends Result, Player {
}
interface MatchFromPlayer extends MatchBase {
    competition: {
        id: number;
        name: string;
    };
    season: Season;
}
export interface MatchFromPlayerResult extends Result {
    count: number;
    filters: {
        permission: string;
        dateFrom?: string;
        dateTo?: string;
        status?: Array<Status>;
        competitions?: Array<number>;
        limit: number;
    };
    player: Player;
    matches: Array<MatchFromPlayer>;
}
export {};
