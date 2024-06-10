"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THEMES } from "@/app/_data/Themes";
import GRADIENTS from "@/app/_data/GradientBg";
import { Button } from "@/components/ui/button";
import { borderStyles } from "@/app/_data/BorderStyles";

type Props = {
  selectedTheme: (theme: string) => void;
  selectedBackground: (bg: string) => void;
  selectedBorderStyle: any;
};

export default function Controller({
  selectedTheme,
  selectedBackground,
  selectedBorderStyle,
}: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);

  const visibleGradients = showMore ? GRADIENTS : GRADIENTS.slice(0, 6);

  return (
    <div>
      {/* Theme selection controller */}
      <div>
        <h2 className="my-1">Themes</h2>
        <Select onValueChange={(value: string) => selectedTheme(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {THEMES.map((theme, index) => (
              <SelectItem key={index} value={theme.theme}>
                <div className="flex gap-3">
                  <div className="flex">
                    <div
                      className="h-5 w-5 rounded-l-lg"
                      style={{ backgroundColor: theme.primary }}
                    ></div>
                    <div
                      className="h-5 w-5"
                      style={{ backgroundColor: theme.secondary }}
                    ></div>
                    <div
                      className="h-5 w-5"
                      style={{ backgroundColor: theme.accent }}
                    ></div>
                    <div
                      className="h-5 w-5 rounded-r-lg"
                      style={{ backgroundColor: theme.neutral }}
                    ></div>
                  </div>
                  {theme.theme}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Background selection controller */}
      <div>
        <h2 className="mt-8 my-1">Background</h2>
        <div className="grid grid-cols-3 gap-5">
          {visibleGradients.map((bg, index) => (
            <div
              key={index}
              onClick={() => selectedBackground(bg.gradient)}
              className={`w-full h-[70px] rounded-lg flex items-center justify-center ${
                bg.name === "None" && "border border-black"
              } hover:border-black hover:border-2 hover:scale-110 hover:cursor-pointer`}
              style={{ background: bg.gradient }}
            >
              {bg.name === "None" && bg.name}
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="my-1 w-full"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </Button>
      </div>

      {/* Style selection controller */}
      <div>
        <h2 className="mt-8 my-1">Style</h2>
        <div className="flex h-[120px] justify-between space-x-4">
          <div
            className="bg-amber-100 flex-1 rounded-lg flex flex-col items-end "
            onClick={() => {
              selectedBorderStyle(borderStyles.default);
            }}
          >
            <div className="bg-white w-3/4 h-3/5 rounded-bl-3xl drop-shadow-2xl shadow-2xl hover:scale-110 hover:cursor-pointer"></div>
            <p>Default</p>
          </div>
          <div className="bg-orange-200 flex-1 rounded-lg flex flex-col items-end ">
            <div
              className="bg-white w-3/4 h-3/5 rounded-bl-3xl drop-shadow-2xl shadow-2xl border-b-[12px] border-l-4 border-black hover:scale-110 hover:cursor-pointer"
              onClick={() => {
                selectedBorderStyle(borderStyles.retro);
              }}
            ></div>
            <p>Retro</p>
          </div>
          <div className="bg-indigo-200 flex-1 rounded-lg flex flex-col items-end">
            <div
              className="bg-white w-3/4 h-3/5 rounded-bl-3xl drop-shadow-2xl shadow-2xl border-b-2 border-l-4 border-black hover:scale-110 hover:cursor-pointer"
              onClick={() => {
                selectedBorderStyle(borderStyles.border);
              }}
            ></div>
            <p>Border</p>
          </div>
        </div>
      </div>
    </div>
  );
}
