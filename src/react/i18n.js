import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    order: ["path", "cookie", "localStorage", "navigator"],
    fallbackLng: "ja",
    whitelist: ["ja", "en", "cn"],

    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ",",
      format: function(value, format, lng) {
        if (format === "uppercase") return value.toUpperCase();
        return value;
      }
    }
  });

export default i18n;
