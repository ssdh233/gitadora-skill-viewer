var TARGET_DOMAIN = "http://127.0.0.1:3000";
var SCRIPT_DOMAIN = TARGET_DOMAIN;
var VERSION = "tbre";

var script = document.createElement('script');
script.src = `${SCRIPT_DOMAIN}/js/uploaddata_core.js`;
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

script.onload = () => {
  main(TARGET_DOMAIN, SCRIPT_DOMAIN, VERSION);
} 