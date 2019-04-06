'use strict';

require('dotenv').config();
if (!process.env.YOUR_API_KEY) {
    throw new Error('No API Key specified. Please create an environment variable named YOUR_API_KEY by following guide in README.md');
}

const expect = require('chai').expect;
const FootballData = require('../dist/index').default;

const footballData = new FootballData(process.env.YOUR_API_KEY);

describe('footballData._fillUrlParams', function() {
    it('Replace {id} with actual ID value', function() {
        const url = 'https://api.football-data.org/v2/players/{id}/';
        const params = { id: 89 };
        const result = 'https://api.football-data.org/v2/players/89/';
        expect(footballData._fillUrlParams(url, params)).to.be.equal(result);
    });
});

describe('footballData._fillUrlParams', function() {
    it('Replace {id} with actual ID value and fill in the remaining params', function() {
        const url = 'https://api.football-data.org/v2/teams/{id}/matches/';
        const params = {
            id: 1010,
            dateFrom: '2018-06-22',
            dateTo: '2018-07-22',
        };

        const result = 'https://api.football-data.org/v2/teams/1010/matches/?dateFrom=2018-06-22&dateTo=2018-07-22';
        expect(footballData._fillUrlParams(url, params)).to.be.equal(result);
    });
});