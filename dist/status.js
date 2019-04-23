"use strict";

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