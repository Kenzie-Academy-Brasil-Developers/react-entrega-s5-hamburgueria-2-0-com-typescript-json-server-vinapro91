import { Button } from "@chakra-ui/button";
import { Grid, GridItem } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card/card";
import { useAuth } from "../../Provider/authToken";
import { api } from "../../Services/api";

interface Products {
  name?: string;
  category?: string;
  image?: string;
  price?: string;
}

export const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Products[]>([]);

  const updateCart = () => {
    api
      .get(`/cart?userId=${user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "@HamburgueriaKenzie:accessToken"
          )}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      });
  };

  useEffect(() => {
    api
      .get(`/cart?userId=${user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "@HamburgueriaKenzie:accessToken"
          )}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      });
  }, [user]);

  const AddToCart = (item: Products) => {
    const data = { ...item, userId: Number(user) };

    api
      .post("/cart", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "@HamburgueriaKenzie:accessToken"
          )}`,
        },
      })
      .then((_) => updateCart());
  };

  return (
    <div>
      <span>Carrinho {cart.length}</span>
      <Grid templateRows="repeat(5, 1fr)" templateColumns="repeat(4, 1fr)">
        {cart.map((item) => (
          <GridItem
            border="black solid 1px"
            w="290px"
            h="350px"
            flexWrap="wrap"
            mt="20px"
            p="10px"
          >
            <Card
              category={item.category}
              image={item.image}
              name={item.name}
              price={item.price}
            />
            <Button
              bg="primary.100"
              color="white"
              mt="20px"
              onClick={() => AddToCart(item)}
              _hover={{ background: "gray.200" }}
            >
              Comprar
            </Button>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
