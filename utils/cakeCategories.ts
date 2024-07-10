import MilestoneCakes from "../public/assets/milestone-cake.webp";
import KidsCakes from "../public/assets/kid-cake.webp";
import CupCakes from "../public/assets/cupcake.webp";
import WeddingCakes from "../public/assets/wedding-cake.webp";

export const categories = [
  {
    label: "Milestone Cakes",
    value: "milestone_cakes",
    image: MilestoneCakes,
    description:
      "Milestone cakes commemorate significant life events and achievements.",
    subcategories: [
      { label: "Birthday Cakes", value: "birthday_cakes" },
      { label: "Anniversary Cakes", value: "anniversary_cakes" },
      { label: "Graduation Cakes", value: "graduation_cakes" },
      { label: "Baby Shower Cakes", value: "baby_shower_cakes" },
      { label: "Retirement Cakes", value: "retirement_cakes" },
      { label: "Wedding Cakes", value: "wedding_cakes" },
    ],
  },
  {
    label: "Kids' Cakes",
    value: "kids_cakes",
    image: KidsCakes,
    description:
      "Kids' cakes feature fun and colorful designs that appeal to children.",
    subcategories: [
      { label: "Cartoon Character Cakes", value: "cartoon_character_cakes" },
      { label: "Princess Cakes", value: "princess_cakes" },
      { label: "Superhero Cakes", value: "superhero_cakes" },
      { label: "Animal Cakes", value: "animal_cakes" },
      { label: "Fantasy Cakes", value: "fantasy_cakes" },
    ],
  },
  {
    label: "Cupcakes",
    value: "cupcakes",
    image: CupCakes,
    description:
      "Cupcakes are versatile treats available in a variety of flavors and styles.",
    subcategories: [
      { label: "Classic Cupcakes", value: "classic_cupcakes" },
      { label: "Gourmet Cupcakes", value: "gourmet_cupcakes" },
      { label: "Vegan Cupcakes", value: "vegan_cupcakes" },
      { label: "Gluten-Free Cupcakes", value: "gluten_free_cupcakes" },
      { label: "Seasonal Cupcakes", value: "seasonal_cupcakes" },
    ],
  },
  {
    label: "Customized Themed Cakes",
    value: "customized_themed_cakes",
    image: WeddingCakes, // Make sure to replace this with the correct image import or path
    description:
      "Customized themed cakes bring a unique touch to any celebration, tailored to match the specific theme and preferences.",
    subcategories: [
      {
        label: "Traditional Themed Cakes",
        value: "traditional_themed_cakes",
      },
      {
        label: "Modern Themed Cakes",
        value: "modern_themed_cakes",
      },
      {
        label: "Floral Themed Cakes",
        value: "floral_themed_cakes",
      },
      {
        label: "Rustic Themed Cakes",
        value: "rustic_themed_cakes",
      },
      {
        label: "Fantasy Themed Cakes",
        value: "fantasy_themed_cakes",
      },
      {
        label: "Cartoon Themed Cakes",
        value: "cartoon_themed_cakes",
      },
      {
        label: "Holiday Themed Cakes",
        value: "holiday_themed_cakes",
      },
    ],
  },

  // {
  //   label: "Wedding Cakes",
  //   value: "wedding_cakes",
  //   image: WeddingCakes,
  //   description:
  //     "Wedding cakes are a centerpiece of the celebration, reflecting the couple's style and theme.",
  //   subcategories: [
  //     {
  //       label: "Traditional Wedding Cakes",
  //       value: "traditional_wedding_cakes",
  //     },
  //     { label: "Modern Wedding Cakes", value: "modern_wedding_cakes" },
  //     { label: "Floral Wedding Cakes", value: "floral_wedding_cakes" },
  //     { label: "Rustic Wedding Cakes", value: "rustic_wedding_cakes" },
  //     { label: "Themed Wedding Cakes", value: "themed_wedding_cakes" },
  //   ],
  // },
];
