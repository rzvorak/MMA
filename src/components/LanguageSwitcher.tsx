"use client";

import setLanguage from "@/actions/language";
import { Button } from "./ui/button";

const locales = ["en", "ig"];

const LanguageSwitcher = () => {
  const changeLanguage = async (locale: string) => {
    await setLanguage(locale);
  };

  return (
    <div className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex justify-center rounded-md px-1 py-[0.6rem]">
      <select
        className="color-secondary text-xs"
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {locales.map((loc) => (
          <option className="bg-background text-xs" key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
