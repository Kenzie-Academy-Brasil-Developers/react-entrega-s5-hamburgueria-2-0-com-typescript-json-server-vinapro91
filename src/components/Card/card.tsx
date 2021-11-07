import React from "react";
interface CardProps {
  name: string;
  category: string;
  image: string;
  price: number;
  userId?: number;
  id?: number;
}
export const Card = ({
  name,
  category,
  image,
  price,
  userId,
  id,
}: CardProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{category}</p>
      <p>{image}</p>
      <p>{price}</p>
    </div>
  );
};
