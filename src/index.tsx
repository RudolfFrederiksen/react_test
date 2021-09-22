import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";

import "./index.scss";
import Game from "./components/game/game/Game";
import Loader from "./components/shared/Loader/Loader";

i18n.use(detector)
    .use(backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en",

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

ReactDOM.render(
    <Suspense fallback={<Loader />}>
        <Game />
    </Suspense>,
    document.getElementById("root")
);
