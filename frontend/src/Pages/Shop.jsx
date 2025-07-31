import React from "react";
import { Hero } from "../Components/Hero/Hero";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewLetter from "../Components/NewLetter/NewLetter";
import Offers from "../Components/Offers/Offers";
import { Popular } from "../Components/Popular/Popular";

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewLetter />
    </div>
  );
};
