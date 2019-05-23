import Plan from './plan';
import StandingType from './standingType';
import Stage from './stage';
import Status from './status';
import Venue from './venue';
export interface IID {
    /**
     * The id of a resource.
     */
    id: number;
}
interface IDate {
    /**
     * string /YYYY-MM-dd/
     *
     * e.g. '2018-06-22'
     */
    dateFrom?: string;
    /**
     * string /YYYY-MM-dd/
     *
     * e.g. '2018-06-22'
     */
    dateTo?: string;
}
interface ILimit {
    /**
     * Limits your result set to the given number.
     */
    limit?: number;
}
interface IPlan {
    /**
     * "TIER_ONE" | "TIER_TWO" | "TIER_THREE" | "TIER_FOUR"
     */
    plan?: Plan;
}
interface ISeason {
    /**
     * number /YYYY/
     * The starting year of a season e.g. 2017 or 2016
     */
    season?: number;
}
export interface IStage {
    /**
     * Check the season node for available stages of a particular competition/season.
     */
    stage?: Stage;
}
interface IStatus {
    /**
     * The status of a match. Can be one of the values:
     * "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "SUSPENDED" | "CANCELED"
     */
    status?: Status | Array<Status>;
}
interface IVenue {
    /**
     * Defines the venue (type). Can be one of the values:
     * "HOME" | "AWAY"
     */
    venue?: Venue;
}
export interface CompetitionsParams extends IPlan {
    areas?: string | number | Array<number>;
}
export interface TeamParams extends ISeason, IStage {
    competitionId: number;
}
export interface StandingParams {
    competitionId: number;
    /**
     * "HOME" | "AWAY" | "TOTAL"
     */
    standingType?: StandingType;
}
export interface MatchParams extends IDate, ISeason, IStage, IStatus {
    competitionId: number;
    matchday?: number;
    /**
     * Allows filtering for groupings in a competition.
     */
    group?: string;
}
export interface ScorerParams extends ILimit {
    competitionId: number;
}
export interface MatchesParams extends IStatus, IDate {
    competitions: string | number | Array<number>;
}
export interface MatchFromTeamParams extends IDate, ILimit, IStatus, IVenue {
    teamId: number;
}
export interface MatchFromPlayerParams extends IDate, ILimit, IStatus {
    playerId: number;
    competitions?: string | number | Array<number>;
}
export {};
