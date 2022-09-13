import React from "react";

type Int = {
  price: number;
  saleProd: number;
};

export const CalcSalePrice = ({ price, saleProd }: Int) => {
  return Math.ceil((price / 100) * (100 - saleProd));
};
