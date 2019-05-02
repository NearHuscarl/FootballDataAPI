/* eslint-disable no-console */
const FootballData = require('../dist/index').default;
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

if (!process.env.YOUR_API_KEY) {
	throw new Error('No API Key specified. Please create an environment variable named YOUR_API_KEY by following guide in README.md');
}

const footballData = new FootballData(process.env.YOUR_API_KEY);

// 2072 - England
// 2088 - Germany
footballData.getCompetitions({
	areas: 2088,
	plan: 'TIER_TWO',
}, true).then((data) => {
	console.log(data);
});

// footballData.getCompetition({
// 	id: 2021,
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getTeamsFromCompetition({
//     competitionId: 2021,
// }).then((data) => {
//     console.log(JSON.stringify(data, null, 4));
// })

// footballData.getStandingsFromCompetition({
// 	competitionId: 2021,
// 	standingType: 'TOTAL',
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getMatchesFromCompetition({
// 	competitionId: 2021,
// 	season: 2017,
// 	matchday: 12,
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getScorersFromCompetition({
// 	competitionId: 2002,
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getMatches({
// 	dateFrom: '2019-04-01',
// 	dateTo: '2019-04-05',
// 	competitionIds: [2021, 2002],
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getMatch({
// 	id: 233325,
// }).then((data) => {
// 	console.log(data);
// });

// 62 - Everton
// footballData.getMatchesFromTeam({
// 	teamId: 62,
// 	status: 'SCHEDULED',
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getTeam({
// 	id: 86,
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getAreas().then((data) => {
// 	console.log(data);
// });

// footballData.getArea({
// 	id: 2072,
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getPlayer({
// 	id: 2019,
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getMatchesFromPlayer({
// 	playerId: 2019,
// 	dateFrom: '2016-01-01',
// 	dateTo: '2017-01-01',
// 	status: 'FINISHED',
// }).then((data) => {
// 	console.log(data);
// });
