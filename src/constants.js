const CURRENT_VERSION = "fuzzup";

const ALL_VERSIONS = ["fuzzup", "highvoltage", "nextage", "exchain", "matixx", "tbre", "tb"];

// which has a different path with newer versions (no /eam)
const OLD_VERSIONS = ["nextage", "exchain", "matixx", "tbre", "tb"];

const VERSION_NAME = {
  tb: "GITADORA Tri-Boost",
  tbre: "GITADORA Tri-Boost Re:EVOLVE",
  matixx: "GITADORA Matixx",
  exchain: "GITADORA EXCHAIN",
  nextage: "GITADORA NEX+AGE",
  highvoltage: "GITADORA HIGH-VOLTAGE",
  fuzzup: "GITADORA FUZZ-UP"
};

const OLD_NAME_MAP = {
  "Windy Fairy -GITADO ROCK ver.-": "Windy Fairy -GITADOROCK ver.-"
};

module.exports = {
  CURRENT_VERSION,
  OLD_VERSIONS,
  ALL_VERSIONS,
  VERSION_NAME,
  OLD_NAME_MAP
};
