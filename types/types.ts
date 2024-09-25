import React from "react";

export interface Link {
  name: string;
  href: string;
  icon: React.ReactElement;
}

export interface GameFromAPI {
  id: number;
  name: string;
  released: string;
  background_image: string;
}
