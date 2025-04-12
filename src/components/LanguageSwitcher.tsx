"use client";

import setLanguage from "@/actions/language";
const locales = ["en", "ig"];

const LanguageSwitcher = () => {
  const changeLanguage = async (locale: string) => {
    await setLanguage(locale);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      {locales.map((loc) => (
        <option className="color-black" key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
