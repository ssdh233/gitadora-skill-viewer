var TARGET_DOMAIN = "http://127.0.0.1:3000";
var VERSION = "tb";

var script = document.createElement('script');
script.src = `${TARGET_DOMAIN}/js/uploaddata_core.js`;
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

script.onload = () => {
  main(TARGET_DOMAIN, VERSION);
} 