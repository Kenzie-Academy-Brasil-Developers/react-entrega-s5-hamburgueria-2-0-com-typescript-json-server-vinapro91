import { Image } from "@chakra-ui/image";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
interface CardProps {
  name?: string;
  category?: string;
  image?: string;
  price?: string;
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
    <Flex justifyContent="center" flexDirection="column" alignItems="center">
      <p>{name}</p>
      <p>{category}</p>
      <Box>
        <Image alt={name} src={image} boxSize="150px" objectFit="cover" />
      </Box>
      <p>{price}</p>
    </Flex>
  );
};
