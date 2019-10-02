import main from "./uploaddata_core";
import { CURRENT_VERSION } from "../constants";

var TARGET_DOMAIN = "//gitadora-skill-viewer-dev.herokuapp.com";
var SCRIPT_DOMAIN = TARGET_DOMAIN;
var VERSION = CURRENT_VERSION;

main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION);
