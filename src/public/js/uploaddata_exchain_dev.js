var TARGET_DOMAIN = "//gitadora-skill-viewer-dev.herokuapp.com";
var SCRIPT_DOMAIN = TARGET_DOMAIN;
var VERSION = "exchain";

var script = document.createElement("script");
script.src = `${SCRIPT_DOMAIN}/js/uploaddata_core.js`;
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

script.onload = () => {
  alert("Script is running!");
  main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION);
};
