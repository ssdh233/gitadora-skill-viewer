const APP_VERSION = "v1.42.1"

const ALL_VERSIONS = [ "galaxywave_delta", "galaxywave", "fuzzup", "highvoltage", "nextage", "exchain", "matixx", "tbre", "tb"];

const CURRENT_VERSION = ALL_VERSIONS[0];
const CURRENT_VERSION_2 = ALL_VERSIONS[1];

const ON_SERVICE_VERSIONS = ["galaxywave", "galaxywave_delta",  "fuzzup", "highvoltage"];

// which has a different path with newer versions (no /eam)
const NO_EAM_PATH_VERSIONS = ["nextage", "exchain", "matixx", "tbre", "tb"];

const VERSION_NAME = {
  tb: "Tri-Boost",
  tbre: "Tri-Boost Re:EVOLVE",
  matixx: "Matixx",
  exchain: "EXCHAIN",
  nextage: "NEX+AGE",
  highvoltage: "HIGH-VOLTAGE",
  fuzzup: "FUZZ-UP",
  galaxywave: "GALAXY WAVE",
  galaxywave_delta: "GALAXY WAVE DELTA"
};

const OLD_NAME_MAP = {
  "Windy Fairy -GITADO ROCK ver.-": "Windy Fairy -GITADOROCK ver.-"
};

module.exports = {
  APP_VERSION,
  CURRENT_VERSION,
  CURRENT_VERSION_2,
  ON_SERVICE_VERSIONS,
  NO_EAM_PATH_VERSIONS,
  ALL_VERSIONS,
  VERSION_NAME,
  OLD_NAME_MAP
};
