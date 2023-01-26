import React from "react";
import {
  HStack,
  FlatList,
  Spacer,
  extendTheme,
  NativeBaseProvider,
  Container,
  Text,
  Heading,
  Center,
  Box,
  Button,
  VStack,
  Avatar,
  Image,
  Link,
  View,
  Skeleton,
} from "native-base";
export default function SkeletonLoader() {
  return (
    <Center w="100%">
      <VStack
        w="95%"
        maxW="600"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="coolGray.200" />
      </VStack>
    </Center>
  );
}
