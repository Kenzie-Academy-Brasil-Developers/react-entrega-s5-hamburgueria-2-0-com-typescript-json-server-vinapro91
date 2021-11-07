import React from "react";
import { Grid, Flex, Text } from "@chakra-ui/layout";
import { Icon } from "@iconify/react";

export const LoginInfo = () => (
  <Grid w={["100%", "100%", "60%", "50%"]} paddingRight="100px">
    <Flex>
      <Text fontWeight="bold" fontSize="26px" color="black" paddingRight="5px">
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
);
