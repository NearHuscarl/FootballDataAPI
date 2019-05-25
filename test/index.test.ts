'use strict';

import { expect } from 'chai';
import FootballData from '../src/index';

const apiKey = 'api key';
const footballData = new FootballData(apiKey);

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