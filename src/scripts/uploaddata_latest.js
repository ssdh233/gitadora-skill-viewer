import main from "./uploaddata_core";
import { CURRENT_VERSION } from "../constants";

var TARGET_DOMAIN = "http://gsv.fun";
var SCRIPT_DOMAIN = "//gitadora-skill-viewer.herokuapp.com";
var VERSION = CURRENT_VERSION;

main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION);
