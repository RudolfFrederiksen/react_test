import React from "react";
import ReactDOM from "react-dom";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import enTrans from "./i18n/en.json";
import frTrans from "./i18n/fr.json";

import "./index.scss";
import Game from "./components/game/game/Game";

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: enTrans,
            },
            fr: {
                translation: frTrans,
            },
        },
        // lng: "fr", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

ReactDOM.render(<Game />, document.getElementById("root"));
