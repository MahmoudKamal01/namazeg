import React from "react";
import Feature from "./Feature";

type Props = {};

export default function FeaturesSection({}: Props) {
  const colors = ["bg-indigo-100", "bg-orange-100", "bg-sky-100"];
  const features = [
    {
      header: "Creating forms effortlessly with Namazeg",
      paragraph:
        "Namazeg’s intuitive online form generator, powered by Gemini AI, allows you to create stunning web forms based on a short user description with just a click of a button. The generated forms can be easily customized and modified to suit your needs, saving you hours of work.",
      gifUrl: "/create-form.gif",
    },
    {
      header: "Enhance Your Forms with Dynamic Styling and Theme Selection",
      paragraph:
        "With Namazeg’s powerful form generator, you can easily apply dynamic styling and select from a variety of themes to give your forms a unique, artistic look. Customize backgrounds, fonts, and colors to create visually stunning forms that not only function perfectly but also capture attention. Experience the freedom to design forms that truly reflect your brand and aesthetic preferences, all within a user-friendly interface.",
      gifUrl: "/style-form.gif",
    },
    {
      header: "Live Form Preview, Cross-Platform Sharing, and Excel Export",
      paragraph:
        "Namazeg takes form creation to the next level with its live form preview feature, allowing you to see changes in real-time as you design. Easily share your forms across all platforms directly from the tool, ensuring maximum reach and engagement. Additionally, export your form responses as Excel files with just a click, simplifying data analysis and reporting. Experience seamless integration and enhanced functionality with Namazeg’s comprehensive form management features.",
      gifUrl: "/share-form.gif",
    },
  ];

  return (
    <div className="p-12 flex flex-col space-y-8">
      {features.map((feature, index) => (
        <div key={index}>
          <Feature
            header={feature.header}
            paragraph={feature.paragraph}
            gifUrl={feature.gifUrl}
            flowDirection={index % 2 === 0 ? "reverse" : ""}
            bgColor={colors[index % colors.length]}
          />
        </div>
      ))}
    </div>
  );
}
