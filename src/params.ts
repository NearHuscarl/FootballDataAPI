import './plan';
import './standingType';
import './status';
import './venue';

export interface IID {
    id: number;
}

export interface Competitions {
    areas?: string | number | Array<number>;
    plan?: Plan;
}

export interface Team  {
    competitionId: number;
    season?: number;
    stage?: string;
}

export interface Standing {
    competitionId: number;
    standingType?: StandingType;
}

export interface Match {
    competitionId: number;
    dateFrom?: string;
    dateTo?: string;
    stage?: string;
    status?: Status;
    matchday?: number;
    group?: string;
    season?: number;
}

export interface Scorers {
    competitionId: number;
    limit?: number;
}

export interface Matches {
    competitionIds: string | number | Array<number>;
    dateFrom?: string;
    dateTo?: string;
    status?: Status;
}

export interface MatchFromTeam {
    teamId: number;
    dateFrom?: string;
    dateTo?: string;
    status?: Status;
    venue?: Venue;
    limit?: number;
}

export interface MatchFromPlayer {
    playerId: number;
    dateFrom?: string;
    dateTo?: string;
    status?: Status;
    competitionIds?: string | number | Array<number>;
    limit?: number;
}
