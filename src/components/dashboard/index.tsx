import { Button } from "@chakra-ui/button";
import { Grid, GridItem } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../Provider/authToken";
import { api } from "../../Services/api";
import { Card } from "../Card/card";

interface Products {
  name?: string;
  category?: string;
  image?: string;
  price?: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Products[]>([]);
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
      .get("/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "@HamburgueriaKenzie:accessToken"
          )}`,
        },
      })
      .then((response) => setProducts(response.data));

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
  const history = useHistory();
  const handleToCart = () => {
    history.push("/cart");
    updateCart();
  };
  console.log(products);
  return (
    <div>
      <Button onClick={() => handleToCart()}>Carrinho {cart.length}</Button>

      <Grid templateRows="repeat(5, 1fr)" templateColumns="repeat(4, 1fr)">
        {products.map((item) => (
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
