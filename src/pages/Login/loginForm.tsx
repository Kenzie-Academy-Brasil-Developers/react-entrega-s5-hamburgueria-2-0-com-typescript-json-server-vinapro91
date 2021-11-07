import { Box, Grid, Text, VStack } from "@chakra-ui/layout";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Input } from "../../components/Form/form";
import React from "react";
import { Button } from "@chakra-ui/button";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useHistory } from "react-router-dom";

interface LoginFormProps {
  handleSignIn: () => void;
  errors: {
    [x: string]: any;
  };
  register: UseFormRegister<FieldValues>;
  loading: boolean;
}

export const LoginForm = ({
  handleSignIn,
  errors,
  register,
  loading,
}: LoginFormProps) => {
  const history = useHistory();
  return (
    <Grid
      as="form"
      mt="4"
      w={["100%", "100%", "60%", "50%"]}
      padding="30px 15px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      onSubmit={handleSignIn}
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
          onClick={() => history.push("/signUp")}
          mt="20px"
          _hover={{ background: "gray.200" }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
