import { Flex, Text, Grid, VStack, Box } from "@chakra-ui/layout";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Input } from "../../components/Form/form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { Button } from "@chakra-ui/button";
import { useAuth } from "../../Provider/authToken";

const singInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("email inválido"),
  password: yup.string().required("Senha Obrigatória"),
});

interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(singInSchema),
  });

  const handleSignIn = (data: SignInData) => {
    setLoading(true);
    signIn(data)
      .then((_) => setLoading(false))
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      padding="10px 15px"
      height={["auto", "auto", "100vh", "100vh"]}
    >
      <Flex
        w={["100%", "100%", "90%", "65%"]}
        flexDirection={["column", "column", "row", "row"]}
        justifyContent="center"
        alignItems="center"
      >
        <Grid w={["100%", "100%", "60%", "50%"]} paddingRight="100px">
          <Flex>
            <Text
              fontWeight="bold"
              fontSize="26px"
              color="black"
              paddingRight="5px"
            >
              Burguer
            </Text>
            <Text paddingTop="11px" fontWeight="bold" color="secondary.100">
              Kenzie
            </Text>
          </Flex>

          <Grid>
            <Flex padding="10px" border="1px solid" borderColor="gray.100">
              <Flex
                w="180px"
                h="80px"
                alignItems="center"
                justifyContent="center"
                bg="rgba(39, 174, 96, 0.1);"
              >
                <Icon
                  icon="fa:shopping-bag"
                  color="#27ae60"
                  width="40px"
                  height="40px"
                />
              </Flex>
              <Text fontSize="12px" paddingLeft="15px" mt="5px">
                A vida é como um sanduíche, é preciso recheá-la com os{" "}
                <strong>melhores </strong>
                ingredientes.
              </Text>
            </Flex>
          </Grid>
        </Grid>
        <Grid
          as="form"
          mt="4"
          w={["100%", "100%", "60%", "50%"]}
          padding="30px 15px"
          border="3px solid"
          borderColor="gray.100"
          bg="white"
          onSubmit={handleSubmit(handleSignIn)}
          color="gray.900"
        >
          <Text as="h2" fontWeight="bold">
            Login
          </Text>
          <VStack mt="6" spacing="5">
            <Box w="100%">
              <Input
                placeholder="Digite seu E-mail"
                icon={FaEnvelope}
                label="E-mail"
                {...register("email")}
                type="email"
                error={errors.email}
              />
              {!errors.email && (
                <Text ml="1" mt="1" color="gray.300">
                  Exemplo : nome@email.com
                </Text>
              )}
            </Box>
            <Input
              placeholder="Digite sua Senha"
              icon={FaLock}
              type="password"
              label="Senha"
              error={errors.password}
              {...register("password")}
            />
          </VStack>
          <VStack mt="4" spacing="5">
            <Button
              isLoading={loading}
              type="submit"
              bg="primary.200"
              color="white"
              mt="20px"
              _hover={{ background: "primary.100" }}
            >
              Entrar
            </Button>
            <Text textColor="gray.400" textAlign="center">
              Crie sua conta para saborear muitas delicias e matar sua fome!
            </Text>
            <Button
              bg="gray.100"
              color="gray.400"
              mt="20px"
              _hover={{ background: "gray.200" }}
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};
