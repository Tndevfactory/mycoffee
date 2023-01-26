import React from "react";
import { Text, Center, Box, VStack, HStack, Image } from "native-base";
import elasticLogo from "../assets/elasticLogo.png";

export default function Footer({ navigation }) {
  return (
    <VStack
      bg="transparent"
      style={{
        minHeight: 450,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Center>
        <Box textAlign="flext-center">
          <HStack space={0} justifyContent="center">
            <Center h="6" w="6">
              <Image
                size={7}
                borderRadius={100}
                source={elasticLogo}
                alt="Alternate Text"
              />
            </Center>
            <Box h="7" w="220">
              <Text color="darkBlue.800"> Powered by Elastic-solutions</Text>
            </Box>
          </HStack>
        </Box>
      </Center>
    </VStack>
  );
}
