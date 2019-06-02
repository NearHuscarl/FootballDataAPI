'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import FootballData from '../src/index';
import StandingType from '../src/standingType';
import Status from '../src/status';
import Venue from '../src/venue';

chai.use(chaiAsPromised);

const expect = chai.expect;
const proxy = proxyquire.noCallThru();
const API_KEY = 'API_KEY';

const mockHeader = {
    version: 'v2',
    client: 'NearHuscarl',
    secLeftUntilReset: 60,
    remainingRequests: 9
};
const mockResult = { result: 'Dummy football data result' };
const mockResultWithHeader = { ...mockResult, api: mockHeader };

function mockFetchArg(url: string) {
    return [url, { headers: { 'X-Auth-Token': API_KEY } }];
}

function mockResponse(body: any = {}) {
    return {
        json: () => body,
        headers: {
            get: (name: string) => {
                switch (name) {
                    case 'Content-type':
                        return 'application/json';
                    case 'X-API-Version':
                        return mockHeader.version;
                    case 'X-Authenticated-Client':
                        return mockHeader.client;
                    case 'X-RequestCounter-Reset':
                        return mockHeader.secLeftUntilReset.toString();
                    case 'X-Requests-Available-Minute':
                        return mockHeader.remainingRequests.toString();
                    default:
                        return '';
                }
            }
        }
    }
};

describe('FootballData', function () {

    let sandbox: sinon.SinonSandbox;
    let FootballData: any;
    let footballData: FootballData;
    let fetchStub: sinon.SinonStub<any[], any>;

    before('before', async function () {
        sandbox = sinon.createSandbox();
        fetchStub = sandbox.stub();

        FootballData = proxy('../src/index', {
            'node-fetch': fetchStub
        }).default;

        footballData = new FootballData(API_KEY);
    });

    beforeEach('setup sandbox', function () {
        sandbox = sinon.createSandbox();
    });

    afterEach('restore sandbox', function () {
        sandbox.restore();
    });

    describe('footballData.getCompetitions', function () {
        it('Should get all competitions', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/competitions/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/competitions/?areas=2088')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/competitions/?areas=2072,2088')
                .resolves(mockResponse(mockResult))

            expect(footballData.getCompetitions({})).to.eventually.be.eql(mockResult);
            expect(footballData.getCompetitions({}, true)).to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getCompetitions({ areas: 2088 })).to.eventually.be.eql(mockResult);
            expect(footballData.getCompetitions({ areas: [2072, 2088] })).to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getCompetition', function () {
        it('Should get specific competition', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/competitions/2021/')
                .resolves(mockResponse(mockResult));

            expect(footballData.getCompetition({ id: 2021 })).to.eventually.be.eql(mockResult);
            expect(footballData.getCompetition({ id: 2021 }, true)).to.eventually.be.eql(mockResultWithHeader);
        });
    });

    describe('footballData.getTeamsFromCompetition', function () {
        it('Should get teams from competition', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/competitions/2021/teams/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/competitions/2021/teams/?season=2017')
                .resolves(mockResponse(mockResult))

            expect(footballData.getTeamsFromCompetition({
                competitionId: 2021,
            })).to.eventually.be.eql(mockResult);
            expect(footballData.getTeamsFromCompetition({
                competitionId: 2021,
            }, true)).to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getTeamsFromCompetition({
                competitionId: 2021,
                season: 2017,
            })).to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getStandingsFromCompetition', function () {
        it('Should get standings from competition', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/competitions/2021/standings/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/competitions/2021/standings/?standingType=TOTAL')
                .resolves(mockResponse(mockResult))

            expect(footballData.getStandingsFromCompetition({
                competitionId: 2021,
            })).to.eventually.be.eql(mockResult);
            expect(footballData.getStandingsFromCompetition({
                competitionId: 2021,
            }, true)).to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getStandingsFromCompetition({
                competitionId: 2021,
                standingType: StandingType.TOTAL,
            })).to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getMatchesFromCompetition', function () {
        it('Should get matches from competition', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/competitions/2021/matches/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/competitions/2021/matches/?season=2017&matchday=12')
                .resolves(mockResponse(mockResult))

            expect(footballData.getMatchesFromCompetition({
                competitionId: 2021,
            })).to.eventually.be.eql(mockResult);
            expect(footballData.getMatchesFromCompetition({
                competitionId: 2021,
            }, true)).to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getMatchesFromCompetition({
                competitionId: 2021,
                season: 2017,
                matchday: 12,
            })).to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getScorersFromCompetition', function () {
        it('Should get scorers from competition', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/competitions/2021/scorers/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/competitions/2021/scorers/?limit=6')
                .resolves(mockResponse(mockResult))

            expect(footballData.getScorersFromCompetition({
                competitionId: 2021,
            })).to.eventually.be.eql(mockResult);
            expect(footballData.getScorersFromCompetition({
                competitionId: 2021,
            }, true)).to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getScorersFromCompetition({
                competitionId: 2021,
                limit: 6,
            })).to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getMatches', function () {
        it('Should get matches with filters', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/matches/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/matches/?dateFrom=2019-04-01&dateTo=2019-04-05&competitions=2021,2002')
                .resolves(mockResponse(mockResult))

            expect(footballData.getMatches({}))
                .to.eventually.be.eql(mockResult);
            expect(footballData.getMatches({}, true))
                .to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getMatches({
                dateFrom: '2019-04-01',
                dateTo: '2019-04-05',
                competitions: [2021, 2002],
            })).to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getMatch', function () {
        it('Should get specific match', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/matches/233325/')
                .resolves(mockResponse(mockResult))

            expect(footballData.getMatch({ id: 233325 }, true))
                .to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getMatch({ id: 233325 }))
                .to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getMatchesFromTeam', function () {
        it('Should get matches from team', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/teams/62/matches/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/teams/62/matches/?status=SCHEDULED&venue=HOME')
                .resolves(mockResponse(mockResult))

            expect(footballData.getMatchesFromTeam({
                teamId: 62,
            })).to.eventually.be.eql(mockResult);
            expect(footballData.getMatchesFromTeam({
                teamId: 62,
            }, true)).to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getMatchesFromTeam({
                teamId: 62, // Everton
                status: Status.SCHEDULED,
                venue: Venue.HOME,
            })).to.eventually.be.eql(mockResult);
        });
    });

    describe('footballData.getTeam', function () {
        it('Should get specific team', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/teams/86/')
                .resolves(mockResponse(mockResult))

            expect(footballData.getTeam({ id: 86 })).to.eventually.be.eql(mockResult);
            expect(footballData.getTeam({ id: 86 }, true)).to.eventually.be.eql(mockResultWithHeader);
        });
    });

    describe('footballData.getAreas', function () {
        it('Should get all areas', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/areas/')
                .resolves(mockResponse(mockResult))

            expect(footballData.getAreas()).to.eventually.be.eql(mockResult);
            expect(footballData.getAreas(true)).to.eventually.be.eql(mockResultWithHeader);
        });
    });

    describe('footballData.getArea', function () {
        it('Should get specific area', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/areas/2072/')
                .resolves(mockResponse(mockResult))

            expect(footballData.getArea({ id: 2072 })).to.eventually.be.eql(mockResult);
            expect(footballData.getArea({ id: 2072 }, true)).to.eventually.be.eql(mockResultWithHeader);
        });
    });

    describe('footballData.getPlayer', function () {
        it('Should get specific player', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/players/2019/')
                .resolves(mockResponse(mockResult))

            expect(footballData.getPlayer({ id: 2019 })).to.eventually.be.eql(mockResult);
            expect(footballData.getPlayer({ id: 2019 }, true)).to.eventually.be.eql(mockResultWithHeader);
        });
    });

    describe('footballData.getMatchesFromPlayer', function () {
        it('Should get matches from player', function () {
            fetchStub
                .withArgs('https://api.football-data.org/v2/players/2019/matches/')
                .resolves(mockResponse(mockResult))
                .withArgs('https://api.football-data.org/v2/players/2019/matches/?dateFrom=2016-01-01&dateTo=2017-01-01&status=FINISHED')
                .resolves(mockResponse(mockResult))

            expect(footballData.getMatchesFromPlayer({
                playerId: 2019
            })).to.eventually.be.eql(mockResult);
            expect(footballData.getMatchesFromPlayer({
                playerId: 2019
            }, true)).to.eventually.be.eql(mockResultWithHeader);
            expect(footballData.getMatchesFromPlayer({
                playerId: 2019,
                dateFrom: '2016-01-01',
                dateTo: '2017-01-01',
                status: Status.FINISHED,
            }, true)).to.eventually.be.eql(mockResult);
        });
    });
});