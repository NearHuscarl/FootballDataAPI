'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_KEY = '';

var FootballData =
/*#__PURE__*/
function () {
  function FootballData(apiKey) {
    _classCallCheck(this, FootballData);

    API_KEY = apiKey;
    this.baseUrl = 'https://api.football-data.org/v2/';
  }

  _createClass(FootballData, [{
    key: "_request",
    value: function _request(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var url = this._fillUrlParams(endpoint, params);

      return (0, _nodeFetch["default"])(url, {
        headers: {
          'X-Auth-Token': API_KEY
        }
      }).then(function (data) {
        return data.json();
      });
    }
  }, {
    key: "_fillUrlParams",
    value: function _fillUrlParams(url, params) {
      var wrapped = url.match(/\{(.*?)\}/g);

      if (wrapped) {
        var unwrapped = function unwrapped(wrapped) {
          return wrapped.replace('{', '').replace('}', '');
        };

        for (var w in wrapped) {
          var k = unwrapped(wrapped[w]);
          url = url.replace(wrapped[w], params[k]);
          delete params[k];
        }
      }

      var urlParams = '';

      if (params && Object.keys(params).length > 0) {
        urlParams = '?';
        Object.keys(params).forEach(function (key) {
          urlParams += "".concat(key, "=").concat(params[key], "&");
        });
      }

      urlParams = urlParams.slice(0, -1); // remove trailing '&'

      return url + urlParams;
    }
  }, {
    key: "getCompetitions",
    value: function getCompetitions(params) {
      var endpoint = this.baseUrl + 'competitions/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getCompetition",
    value: function getCompetition(params) {
      var endpoint = this.baseUrl + 'competitions/{id}/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getTeamsFromCompetition",
    value: function getTeamsFromCompetition(params) {
      var endpoint = this.baseUrl + 'competitions/{competitionId}/teams/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getStandingsFromCompetition",
    value: function getStandingsFromCompetition(params) {
      var endpoint = this.baseUrl + 'competitions/{competitionId}/standings/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getMatchesFromCompetition",
    value: function getMatchesFromCompetition(params) {
      var endpoint = this.baseUrl + 'competitions/{competitionId}/matches/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getScorersFromCompetition",
    value: function getScorersFromCompetition(params) {
      var endpoint = this.baseUrl + 'competitions/{competitionId}/scorers/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getMatches",
    value: function getMatches(params) {
      var endpoint = this.baseUrl + 'matches/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getMatch",
    value: function getMatch(params) {
      var endpoint = this.baseUrl + 'matches/{id}/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getMatchesFromTeam",
    value: function getMatchesFromTeam(params) {
      var endpoint = this.baseUrl + 'teams/{teamId}/matches/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getTeam",
    value: function getTeam(params) {
      var endpoint = this.baseUrl + 'teams/{id}/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getAreas",
    value: function getAreas() {
      var endpoint = this.baseUrl + 'areas/';
      return this._request(endpoint);
    }
  }, {
    key: "getArea",
    value: function getArea(params) {
      var endpoint = this.baseUrl + 'areas/{id}/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getPlayer",
    value: function getPlayer(params) {
      var endpoint = this.baseUrl + 'players/{id}/';
      return this._request(endpoint, params);
    }
  }, {
    key: "getMatchesFromPlayer",
    value: function getMatchesFromPlayer(params) {
      var endpoint = this.baseUrl + 'players/{playerId}/matches/';
      return this._request(endpoint, params);
    }
  }]);

  return FootballData;
}();

var _default = FootballData;
exports["default"] = _default;