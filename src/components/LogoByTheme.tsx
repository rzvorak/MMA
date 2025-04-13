"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const LogoByTheme = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div
        style={{ width: "100%", aspectRatio: "1 / 1" }}
        className="bg-transparent"
      />
    );

  return (
    <Image
      src={resolvedTheme === "dark" ? "/LogoBWdark.png" : "/LogoBWlight.png"}
      height={1080}
      width={1080}
      alt="Mighty Minds Africa logo"
    />
  );
};

export default LogoByTheme;
