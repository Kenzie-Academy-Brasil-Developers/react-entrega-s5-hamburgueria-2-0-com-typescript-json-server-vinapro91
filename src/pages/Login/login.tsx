import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../Provider/authToken";
import { LoginInfo } from "./LoginInfo";
import { LoginForm } from "./loginForm";

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
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        <LoginInfo />
        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(handleSignIn)}
          loading={loading}
          register={register}
        />
      </Flex>
    </Flex>
  );
};
