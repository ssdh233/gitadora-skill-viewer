var TARGET_DOMAIN = "http://gsv.fun";
var SCRIPT_DOMAIN = "//gitadora-skill-viewer.herokuapp.com";
var VERSION = "tbre";

var script = document.createElement('script');
script.src = `${SCRIPT_DOMAIN}/js/uploaddata_core.js`;
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

script.onload = () => {
  main(TARGET_DOMAIN, VERSION);
} 