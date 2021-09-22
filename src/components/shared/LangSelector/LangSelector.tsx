import React, { memo, useState } from "react";
import "./LangSelector.scss";
import { useTranslation } from "react-i18next";

const LangSelector = memo(() => {
    const { t, i18n } = useTranslation();
    const [lang] = useState(i18n.language);

    const sortLangOptions = () => {
        const langs: Array<{ val: string; label: string }> = [
            {
                val: "en",
                label: t("LANG.EN"),
            },
            {
                val: "fr",
                label: t("LANG.FR"),
            },
        ];

        langs.sort((a, b) => a.label.localeCompare(b.label));

        return langs.map((lang) => (
            <option key={`lang_${lang.val}`} value={lang.val}>
                {lang.label}
            </option>
        ));
    };

    const onLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div className="LangSelector">
            <span>{t("LANG.TITLE")}</span>

            <select name="language" id="langSelector" onChange={onLangChange} defaultValue={lang}>
                {sortLangOptions()}
            </select>
        </div>
    );
});

export default LangSelector;
