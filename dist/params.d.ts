import Plan from './plan';
import StandingType from './standingType';
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
interface IStage {
    /**
     * Check the season node for available stages of a particular competition/season.
     */
    stage?: string;
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
export interface Competitions extends IPlan {
    areas?: string | number | Array<number>;
}
export interface Team extends ISeason, IStage {
    competitionId: number;
}
export interface Standing {
    competitionId: number;
    /**
     * "HOME" | "AWAY" | "TOTAL"
     */
    standingType?: StandingType;
}
export interface Match extends IDate, ISeason, IStage, IStatus {
    competitionId: number;
    matchday?: number;
    /**
     * Allows filtering for groupings in a competition.
     */
    group?: string;
}
export interface Scorers extends ILimit {
    competitionId: number;
}
export interface Matches extends IStatus, IDate {
    competitionIds: string | number | Array<number>;
}
export interface MatchFromTeam extends IDate, ILimit, IStatus, IVenue {
    teamId: number;
}
export interface MatchFromPlayer extends IDate, ILimit, IStatus {
    playerId: number;
    competitionIds?: string | number | Array<number>;
}
export {};
