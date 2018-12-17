require("es6-promise").polyfill();
require("isomorphic-fetch");

// XXX: the name is fetchHahaha but we can import it as fetch since it's exported by default
export default function fetchHahaha(url, ...args) {
  if (typeof window === "undefined") {
    return fetch(`http://localhost:${process.env.PORT}${url}`, ...args);
  } else {
    return fetch(url, ...args);
  }
}
