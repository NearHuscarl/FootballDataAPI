"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Status;

(function (Status) {
  Status["SCHEDULED"] = "SCHEDULED";
  Status["LIVE"] = "LIVE";
  Status["IN_PLAY"] = "IN_PLAY";
  Status["PAUSED"] = "PAUSED";
  Status["FINISHED"] = "FINISHED";
  Status["POSTPONED"] = "POSTPONED";
  Status["SUSPENDED"] = "SUSPENDED";
  Status["CANCELED"] = "CANCELED";
})(Status || (Status = {}));

var _default = Status;
exports["default"] = _default;