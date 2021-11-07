import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUpInfo } from "./SignUpInfo";
import { SignUpForm } from "./SignUpForm";
import { api } from "../../Services/api";

const signUpSchema = yup.object().shape({
  name: yup.string().required("nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("email inválido"),
  password: yup.string().required("Senha Obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas Diferentes"),
});

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignup = ({ name, email, password }: SignUpData) => {
    setLoading(true);
    api.post("/register", { name, email, password }).then((response) => {
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
        <SignUpForm
          errors={errors}
          handleSignUp={handleSubmit(handleSignup)}
          loading={loading}
          register={register}
        />
        <SignUpInfo />
      </Flex>
    </Flex>
  );
};
