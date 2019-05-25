import fs from 'fs';
import dotenv from 'dotenv';
import FootballData from '../dist/index';

dotenv.config();

if (!process.env.YOUR_API_KEY) {
	throw new Error('No API Key specified. Please create an environment variable named YOUR_API_KEY by following guide in README.md');
}

const footballData = new FootballData(process.env.YOUR_API_KEY);

// 2072 - England
// 2088 - Germany
// footballData.getCompetitions({
// 	areas: 2072
// }, true).then((data) => {
// 	console.log(JSON.stringify(data, null, 4));
// });

footballData.getCompetition({
	id: 2021,
}).then((data) => {
	fs.writeFileSync('results.json', JSON.stringify(data, null, 4))
	console.log(data);
});

// footballData.getTeamsFromCompetition({
// 	competitionId: 2013,
// 	stage: 'STAGE_ONED'
// }).then((data) => {
// 	console.log(JSON.stringify(data, null, 4));
// })

// footballData.getStandingsFromCompetition({
// 	competitionId: 2001,
// 	standingType: 'TOTAL',
// }).then((data) => {
// 	console.log(data);
// });

// footballData.getMatchesFromCompetition({
// 	competitionId: 2021,
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
// 	dateTo: '2019-04-11',
// 	status: "FINISHED",
// 	competitions: [2021, 2002],
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
// 	id: 2077,
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
