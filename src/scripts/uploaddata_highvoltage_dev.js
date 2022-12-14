import main from "./uploaddata_core";

var TARGET_DOMAIN = "//gitadora-skill-viewer-dev.herokuapp.com";
var SCRIPT_DOMAIN = TARGET_DOMAIN;
var VERSION = "highvoltage";

alert("Script is running!");
main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION);