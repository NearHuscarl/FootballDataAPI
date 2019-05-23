# Football Data API

![npm (scoped)](https://img.shields.io/npm/v/footballdata-api-v2.svg)
![NPM](https://img.shields.io/npm/l/footballdata-api-v2.svg)

[![npm badge][npm-badge-png]][package-url]

## Installation

```bash
$ npm install footballdata-api-v2
```

Get the API key (free) from [football data]

## Import

```js
import FootballData from 'footballdata-api-v2';
const footballData = new FootballData(YOUR_API_KEY);
```

## Usages

See [football data quickstart] for more information about filters and data types

### Get header data

You can attach additional data from the API header response by adding `true` in the second argument in every methods below to get some meta info like remaining requests until blocked

The free plan allows 10 API calls/minute

```js
footballData.getCompetitions({
    areas: 2088, // Germany
    plan: 'TIER_TWO',
}, true).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    ...
    "api": {
        "version": "v2",
        "client": "NearHuscarl",
        "secLeftUntilReset": 60,
        "remainingRequests": 9
    }
}
```
</details>

### Get all competitions
```js
footballData.getCompetitions({
    areas: 2088, // Germany
    plan: 'TIER_TWO',
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 3,
    "filters": {
        "areas": [
            2088
        ],
        "plan": "TIER_TWO"
    },
    "competitions": [
        {
            "id": 2002,
            "area": {
                "id": 2088,
                "name": "Germany"
            },
            "name": "Bundesliga",
            "code": "BL1",
            "emblemUrl": null,
            "plan": "TIER_ONE",
            "currentSeason": {
                "id": 155,
                "startDate": "2018-08-24",
                "endDate": "2019-05-18",
                "currentMatchday": 28,
                "winner": null
            },
            "numberOfAvailableSeasons": 23,
            "lastUpdated": "2019-04-06T00:00:38Z"
        },
        {
            "id": 2011,
            "area": {
                "id": 2088,
                "name": "Germany"
            },
            "name": "DFB-Pokal",
            "code": "DFB",
            "emblemUrl": null,
            "plan": "TIER_TWO",
            "currentSeason": {
                "id": 12,
                "startDate": "2018-08-17",
                "endDate": "2019-05-25",
                "currentMatchday": null,
                "winner": null
            },
            "numberOfAvailableSeasons": 2,
            "lastUpdated": "2019-04-03T23:46:40Z"
        },
        ...
    ]
}
```
</details>

### Get specific competition

```js
footballData.getCompetition({
    id: 2021, // Premier League
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "id": 2021,
    "area": {
        "id": 2072,
        "name": "England"
    },
    "name": "Premier League",
    "code": "PL",
    "emblemUrl": null,
    "plan": "TIER_ONE",
    "currentSeason": {
        "id": 151,
        "startDate": "2018-08-10",
        "endDate": "2019-05-12",
        "currentMatchday": 33,
        "winner": null
    },
    "seasons": [
        {
            "id": 151,
            "startDate": "2018-08-10",
            "endDate": "2019-05-12",
            "currentMatchday": 33,
            "winner": null
        },
        {
            "id": 23,
            "startDate": "2017-08-11",
            "endDate": "2018-05-13",
            "currentMatchday": 38,
            "winner": {
                "id": 65,
                "name": "Manchester City FC",
                "shortName": "Man City",
                "tla": "MCI",
                "crestUrl": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"
            }
        },
        ...
    ],
    "lastUpdated": "2019-04-06T00:00:38Z"
}
```
</details>

### Get teams from competition

```js
footballData.getTeamsFromCompetition({
    competitionId: 2021,
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 20,
    "filters": {},
    "competition": {
        "id": 2021,
        "area": {
            "id": 2072,
            "name": "England"
        },
        "name": "Premier League",
        "code": "PL",
        "plan": "TIER_ONE",
        "lastUpdated": "2019-04-06T00:00:38Z"
    },
    "season": {
        "id": 151,
        "startDate": "2018-08-10",
        "endDate": "2019-05-12",
        "currentMatchday": 33,
        "winner": null
    },
    "teams": [
        {
            "id": 57,
            "area": {
                "id": 2072,
                "name": "England"
            },
            "name": "Arsenal FC",
            "shortName": "Arsenal",
            "tla": "ARS",
            "crestUrl": "http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
            "address": "75 Drayton Park London N5 1BU",
            "phone": "+44 (020) 76195003",
            "website": "http://www.arsenal.com",
            "email": "info@arsenal.co.uk",
            "founded": 1886,
            "clubColors": "Red / White",
            "venue": "Emirates Stadium",
            "lastUpdated": "2019-04-04T02:50:20Z"
        },
        ...
    ]
}
```
</details>

### Get standings
```js
footballData.getStandingsFromCompetition({
    competitionId: 2021,
    standingType: 'TOTAL',
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "filters": {},
    "competition": {
        "id": 2021,
        "area": {
            "id": 2072,
            "name": "England"
        },
        "name": "Premier League",
        "code": "PL",
        "plan": "TIER_ONE",
        "lastUpdated": "2019-04-06T00:00:38Z"
    },
    "season": {
        "id": 151,
        "startDate": "2018-08-10",
        "endDate": "2019-05-12",
        "currentMatchday": 33,
        "winner": null
    },
    "standings": [
        {
            "stage": "REGULAR_SEASON",
            "type": "TOTAL",
            "group": null,
            "table": [
                {
                    "position": 1,
                    "team": {
                        "id": 64,
                        "name": "Liverpool FC",
                        "crestUrl": "http://upload.wikimedia.org/wikipedia/de/0/0a/FC_Liverpool.svg"
                    },
                    "playedGames": 33,
                    "won": 25,
                    "draw": 7,
                    "lost": 1,
                    "points": 82,
                    "goalsFor": 75,
                    "goalsAgainst": 20,
                    "goalDifference": 55
                },
                {
                    "position": 2,
                    "team": {
                        "id": 65,
                        "name": "Manchester City FC",
                        "crestUrl": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"
                    },
                    "playedGames": 32,
                    "won": 26,
                    "draw": 2,
                    "lost": 4,
                    "points": 80,
                    "goalsFor": 83,
                    "goalsAgainst": 21,
                    "goalDifference": 62
                },
                ...
            ]
        }
    ]
}
```
</details>

### Get matches from competition

```js
footballData.getMatchesFromCompetition({
    competitionId: 2021,
    season: 2017,
    matchday: 12,
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 10,
    "filters": {
        "matchday": "12"
    },
    "competition": {
        "id": 2021,
        "area": {
            "id": 2072,
            "name": "England"
        },
        "name": "Premier League",
        "code": "PL",
        "plan": "TIER_ONE",
        "lastUpdated": "2019-04-06T00:00:38Z"
    },
    "matches": [
        {
            "id": 205266,
            "season": {
                "id": 23,
                "startDate": "2017-08-11",
                "endDate": "2018-05-13",
                "currentMatchday": 38
            },
            "utcDate": "2017-11-18T12:30:00Z",
            "status": "FINISHED",
            "matchday": 12,
            "stage": "REGULAR_SEASON",
            "group": "Regular Season",
            "lastUpdated": "2018-06-22T10:04:00Z",
            "score": {
                "winner": "HOME_TEAM",
                "duration": "REGULAR",
                "fullTime": {
                    "homeTeam": 2,
                    "awayTeam": 0
                },
                "halfTime": {
                    "homeTeam": 2,
                    "awayTeam": 0
                },
                "extraTime": {
                    "homeTeam": null,
                    "awayTeam": null
                },
                "penalties": {
                    "homeTeam": null,
                    "awayTeam": null
                }
            },
            "homeTeam": {
                "id": 57,
                "name": "Arsenal FC"
            },
            "awayTeam": {
                "id": 73,
                "name": "Tottenham Hotspur FC"
            },
            "referees": [
                {
                    "id": 11575,
                    "name": "Mike Dean",
                    "nationality": null
                },
                {
                    "id": 11495,
                    "name": "Ian Hussin",
                    "nationality": null
                },
                {
                    "id": 11480,
                    "name": "Eddie Smart",
                    "nationality": null
                },
                {
                    "id": 11487,
                    "name": "Kevin Friend",
                    "nationality": null
                }
            ]
        },
        ...
    ]
}
```
</details>


### Get scorers

```js
footballData.getScorersFromCompetition({
    competitionId: 2002,
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 10,
    "filters": {
        "limit": 10
    },
    "competition": {
        "id": 2002,
        "area": {
            "id": 2088,
            "name": "Germany"
        },
        "name": "Bundesliga",
        "code": "BL1",
        "plan": "TIER_ONE",
        "lastUpdated": "2019-04-06T00:00:38Z"
    },
    "season": {
        "id": 155,
        "startDate": "2018-08-24",
        "endDate": "2019-05-18",
        "currentMatchday": 28,
        "winner": null
    },
    "scorers": [
        {
            "player": {
                "id": 371,
                "name": "Robert Lewandowski",
                "firstName": "Robert",
                "lastName": null,
                "dateOfBirth": "1988-08-21",
                "countryOfBirth": "Poland",
                "nationality": "Poland",
                "position": "Attacker",
                "shirtNumber": null,
                "lastUpdated": "2019-04-05T05:12:21Z"
            },
            "team": {
                "id": 5,
                "name": "FC Bayern München"
            },
            "numberOfGoals": 19
        },
        ...
    ]
}
```
</details>

### Get matches

```js
footballData.getMatches({
    dateFrom: '2019-04-01',
    dateTo: '2019-04-05',
    competitions: [2021, 2002], // Premier League and Bundesliga
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 8,
    "filters": {
        "dateFrom": "2019-04-01",
        "dateTo": "2019-04-05",
        "permission": "TIER_ONE",
        "competitions": [
            2021,
            2002
        ]
    },
    "matches": [
        {
            "id": 233335,
            "competition": {
                "id": 2021,
                "name": "Premier League"
            },
            "season": {
                "id": 151,
                "startDate": "2018-08-10",
                "endDate": "2019-05-12",
                "currentMatchday": 33,
                "winner": null
            },
            "utcDate": "2019-04-01T19:00:00Z",
            "status": "FINISHED",
            "matchday": 32,
            "stage": "REGULAR_SEASON",
            "group": "Regular Season",
            "lastUpdated": "2019-04-02T21:35:06Z",
            "score": {
                "winner": "HOME_TEAM",
                "duration": "REGULAR",
                "fullTime": {
                    "homeTeam": 2,
                    "awayTeam": 0
                },
                "halfTime": {
                    "homeTeam": 1,
                    "awayTeam": 0
                },
                "extraTime": {
                    "homeTeam": null,
                    "awayTeam": null
                },
                "penalties": {
                    "homeTeam": null,
                    "awayTeam": null
                }
            },
            "homeTeam": {
                "id": 57,
                "name": "Arsenal FC"
            },
            "awayTeam": {
                "id": 67,
                "name": "Newcastle United FC"
            },
            "referees": [
                {
                    "id": 11580,
                    "name": "Anthony Taylor",
                    "nationality": null
                },
                {
                    "id": 11581,
                    "name": "Gary Beswick",
                    "nationality": null
                },
                {
                    "id": 11615,
                    "name": "Adam Nunn",
                    "nationality": null
                },
                {
                    "id": 11556,
                    "name": "David Coote",
                    "nationality": null
                }
            ]
        },
        ...
    ]
}
```
</details>

### Get specific match

```js
footballData.getMatch({
    id: 233325,
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "head2head": {
        "numberOfMatches": 10,
        "totalGoals": 17,
        "homeTeam": {
            "wins": 8,
            "draws": 0,
            "losses": 2
        },
        "awayTeam": {
            "wins": 2,
            "draws": 0,
            "losses": 8
        }
    },
    "match": {
        "id": 233325,
        "competition": {
            "id": 2021,
            "name": "Premier League"
        },
        "season": {
            "id": 151,
            "startDate": "2018-08-10",
            "endDate": "2019-05-12",
            "currentMatchday": 33,
            "winner": null
        },
        "utcDate": "2019-04-03T18:45:00Z",
        "status": "FINISHED",
        "venue": "Tottenham Hotspur Stadium",
        "matchday": 31,
        "stage": "REGULAR_SEASON",
        "group": "Regular Season",
        "lastUpdated": "2019-04-03T23:44:40Z",
        "score": {
            "winner": "HOME_TEAM",
            "duration": "REGULAR",
            "fullTime": {
                "homeTeam": 2,
                "awayTeam": 0
            },
            "halfTime": {
                "homeTeam": 0,
                "awayTeam": 0
            },
            "extraTime": {
                "homeTeam": null,
                "awayTeam": null
            },
            "penalties": {
                "homeTeam": null,
                "awayTeam": null
            }
        },
        "homeTeam": {
            "id": 73,
            "name": "Tottenham Hotspur FC"
        },
        "awayTeam": {
            "id": 354,
            "name": "Crystal Palace FC"
        },
        "referees": [
            {
                "id": 11610,
                "name": "Andre Marriner",
                "nationality": null
            },
            {
                "id": 11611,
                "name": "Scott Ledger",
                "nationality": null
            },
            {
                "id": 11504,
                "name": "Simon Long",
                "nationality": null
            },
            {
                "id": 11443,
                "name": "Chris Kavanagh",
                "nationality": null
            }
        ]
    }
}
```
</details>

### Get matches from team

```js
footballData.getMatchesFromTeam({
    teamId: 62, // Everton
    status: 'SCHEDULED',
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 6,
    "filters": {
        "permission": "TIER_ONE",
        "status": [
            "SCHEDULED"
        ],
        "limit": 100
    },
    "matches": [
        {
            "id": 233348,
            "competition": {
                "id": 2021,
                "name": "Premier League"
            },
            "season": {
                "id": 151,
                "startDate": "2018-08-10",
                "endDate": "2019-05-12",
                "currentMatchday": 33,
                "winner": null
            },
            "utcDate": "2019-04-07T13:05:00Z",
            "status": "SCHEDULED",
            "matchday": 33,
            "stage": "REGULAR_SEASON",
            "group": "Regular Season",
            "lastUpdated": "2019-04-06T00:00:38Z",
            "score": {
                "winner": null,
                "duration": "REGULAR",
                "fullTime": {
                    "homeTeam": null,
                    "awayTeam": null
                },
                "halfTime": {
                    "homeTeam": null,
                    "awayTeam": null
                },
                "extraTime": {
                    "homeTeam": null,
                    "awayTeam": null
                },
                "penalties": {
                    "homeTeam": null,
                    "awayTeam": null
                }
            },
            "homeTeam": {
                "id": 62,
                "name": "Everton FC"
            },
            "awayTeam": {
                "id": 57,
                "name": "Arsenal FC"
            },
            "referees": []
        },
        ...
    ]
}
```
</details>

### Get specific team

```js
footballData.getTeam({
    id: 86, // Real Madrid
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "id": 86,
    "area": {
        "id": 2224,
        "name": "Spain"
    },
    "activeCompetitions": [
        {
            "id": 2001,
            "area": {
                "id": 2077,
                "name": "Europe"
            },
            "name": "UEFA Champions League",
            "code": "CL",
            "plan": "TIER_ONE",
            "lastUpdated": "2019-03-14T03:25:02Z"
        },
        {
            "id": 2014,
            "area": {
                "id": 2224,
                "name": "Spain"
            },
            "name": "Primera Division",
            "code": "PD",
            "plan": "TIER_ONE",
            "lastUpdated": "2019-04-06T00:00:38Z"
        },
        {
            "id": 2079,
            "area": {
                "id": 2224,
                "name": "Spain"
            },
            "name": "Copa del Rey",
            "code": "CDR",
            "plan": "TIER_THREE",
            "lastUpdated": "2019-02-28T23:39:16Z"
        }
    ],
    "name": "Real Madrid CF",
    "shortName": "Real Madrid",
    "tla": "RMA",
    "crestUrl": "http://upload.wikimedia.org/wikipedia/de/3/3f/Real_Madrid_Logo.svg",
    "address": "Avenida Concha Espina, 1 Madrid 28036",
    "phone": "+34 (913) 984300",
    "website": "http://www.realmadrid.com",
    "email": "atencionpublico@corp.realmadrid.com",
    "founded": 1902,
    "clubColors": "White / Purple",
    "venue": "Estadio Santiago Bernabéu",
    "squad": [
        {
            "id": 51,
            "name": "Keylor Navas",
            "position": "Goalkeeper",
            "dateOfBirth": "1986-12-15T00:00:00Z",
            "countryOfBirth": "Costa Rica",
            "nationality": "Costa Rica",
            "shirtNumber": null,
            "role": "PLAYER"
        },
        {
            "id": 3641,
            "name": "Thibaut Courtois",
            "position": "Goalkeeper",
            "dateOfBirth": "1992-05-11T00:00:00Z",
            "countryOfBirth": "Belgium",
            "nationality": "Belgium",
            "shirtNumber": null,
            "role": "PLAYER"
        },
        {
            "id": 3871,
            "name": "Luca Zidane",
            "position": "Goalkeeper",
            "dateOfBirth": "1998-05-13T00:00:00Z",
            "countryOfBirth": "France",
            "nationality": "France",
            "shirtNumber": 30,
            "role": "PLAYER"
        },
        ...
    ],
    "lastUpdated": "2019-04-04T02:40:06Z"
}
```
</details>

### Get all areas

```js
footballData.getAreas().then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 273,
    "filters": {},
    "areas": [
        {
            "id": 2000,
            "name": "Afghanistan",
            "countryCode": "AFG",
            "ensignUrl": null,
            "parentAreaId": 2014,
            "parentArea": "Asia"
        },
        {
            "id": 2001,
            "name": "Africa",
            "countryCode": "AFR",
            "ensignUrl": null,
            "parentAreaId": 2267,
            "parentArea": "World"
        },
        {
            "id": 2002,
            "name": "Albania",
            "countryCode": "ALB",
            "ensignUrl": null,
            "parentAreaId": 2077,
            "parentArea": "Europe"
        },
        ...
    ]
}
```
</details>

### Get specific area

```js
footballData.getArea({
    id: 2072,
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "id": 2072,
    "name": "England",
    "countryCode": "ENG",
    "ensignUrl": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    "parentAreaId": 2077,
    "parentArea": "Europe",
    "childAreas": []
}
```
</details>

### Get specific player

```js
footballData.getPlayer({
    id: 2019,
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "id": 2019,
    "name": "Gianluigi Buffon",
    "firstName": "Gianluigi",
    "lastName": null,
    "dateOfBirth": "1978-01-28",
    "countryOfBirth": "Italy",
    "nationality": "Italy",
    "position": "Goalkeeper",
    "shirtNumber": 1,
    "lastUpdated": "2019-02-21T05:10:20Z"
}
```
</details>

### Get matches from player

```js
footballData.getMatchesFromPlayer({
    playerId: 2019,
    dateFrom: '2016-01-01',
    dateTo: '2017-01-01',
    status: 'FINISHED',
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
})
```

<details>
  <summary>Result</summary>

```json
{
    "count": 5,
    "filters": {
        "permission": "TIER_ONE",
        "dateFrom": "2016-01-01",
        "dateTo": "2017-01-01",
        "status": [
            "FINISHED"
        ],
        "limit": 100
    },
    "player": {
        "id": 2019,
        "name": "Gianluigi Buffon",
        "firstName": "Gianluigi",
        "lastName": null,
        "dateOfBirth": "1978-01-28",
        "countryOfBirth": "Italy",
        "nationality": "Italy",
        "position": "Goalkeeper",
        "shirtNumber": 1,
        "lastUpdated": "2019-02-21T05:10:20Z"
    },
    "matches": [
        {
            "id": 228574,
            "competition": {
                "id": 2018,
                "name": "European Championship"
            },
            "season": {
                "id": 20,
                "startDate": "2016-06-10",
                "endDate": "2016-07-10",
                "currentMatchday": 3
            },
            "utcDate": "2016-07-02T19:00:00Z",
            "status": "FINISHED",
            "matchday": null,
            "stage": "QUARTER_FINALS",
            "group": "Quarter-finals",
            "lastUpdated": "2019-01-11T17:33:45Z",
            "score": {
                "winner": "HOME_TEAM",
                "duration": "PENALTY_SHOOTOUT",
                "fullTime": {
                    "homeTeam": 1,
                    "awayTeam": 1
                },
                "halfTime": {
                    "homeTeam": 0,
                    "awayTeam": 0
                },
                "extraTime": {
                    "homeTeam": 0,
                    "awayTeam": 0
                },
                "penalties": {
                    "homeTeam": 6,
                    "awayTeam": 5
                }
            },
            "homeTeam": {
                "id": 759,
                "name": "Germany"
            },
            "awayTeam": {
                "id": 784,
                "name": "Italy"
            },
            "referees": [
                {
                    "id": 43910,
                    "name": "Viktor Kassai",
                    "nationality": null
                },
                {
                    "id": 43911,
                    "name": "György Ring",
                    "nationality": null
                },
                {
                    "id": 43912,
                    "name": "Vencel Tóth",
                    "nationality": null
                },
                {
                    "id": 43888,
                    "name": "Szymon Marciniak",
                    "nationality": null
                },
                {
                    "id": 43827,
                    "name": "Tamás Bognár",
                    "nationality": null
                },
                {
                    "id": 57157,
                    "name": "Ádám Farkas",
                    "nationality": null
                }
            ]
        },
        ...
    ]
}
```
</details>

## Testing
```bash
$ npm test
```

## License

**[Mit License]**

[package-url]: https://www.npmjs.com/package/footballdata-api-v2
[football data]: https://www.football-data.org/
[football data quickstart]: https://www.football-data.org/documentation/quickstart
[MIT License]: ./LICENSE.md
[npm-badge-png]: https://nodei.co/npm/footballdata-api-v2.png?downloads=true&stars=true