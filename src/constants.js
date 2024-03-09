const APP_VERSION = "v1.38.1";

const ALL_VERSIONS = ["fuzzup", "highvoltage", "nextage", "exchain", "matixx", "tbre", "tb"];

const CURRENT_VERSION = ALL_VERSIONS[0];

const ON_SERVICE_VERSIONS = ["fuzzup", "highvoltage"];

// which has a different path with newer versions (no /eam)
const NO_EAM_PATH_VERSIONS = ["nextage", "exchain", "matixx", "tbre", "tb"];

const VERSION_NAME = {
  tb: "Tri-Boost",
  tbre: "Tri-Boost Re:EVOLVE",
  matixx: "Matixx",
  exchain: "EXCHAIN",
  nextage: "NEX+AGE",
  highvoltage: "HIGH-VOLTAGE",
  fuzzup: "FUZZ-UP"
};

const OLD_NAME_MAP = {
  "Windy Fairy -GITADO ROCK ver.-": "Windy Fairy -GITADOROCK ver.-"
};

module.exports = {
  APP_VERSION,
  CURRENT_VERSION,
  ON_SERVICE_VERSIONS,
  NO_EAM_PATH_VERSIONS,
  ALL_VERSIONS,
  VERSION_NAME,
  OLD_NAME_MAP
};
