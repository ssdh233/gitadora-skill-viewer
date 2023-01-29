import main from "./uploaddata_core";

var TARGET_DOMAIN = process.env.TARGET_DOMAIN;
var SCRIPT_DOMAIN = process.env.SCRIPT_DOMAIN;
var VERSION = process.env.VERSION;

main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION);
