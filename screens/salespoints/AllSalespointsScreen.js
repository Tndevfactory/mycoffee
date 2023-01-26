import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalespoints,
  clearSuccess,
  clearError,
  clearLoading,
  clearObserver,
} from "../../redux/features/coffeeSlice";
import { storeToken } from "../../redux/features/authSlice";
import SkeletonLoader from "../../components/SkeletonLoader";
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
  VStack,
  Avatar,
  Image,
  Link,
  View,
  Button,
  Skeleton,
} from "native-base";

export default function AllSalespointsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { salespoints, loading, success, error, observer } = useSelector(
    (store) => store.coffee
  );
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(clearLoading());
    dispatch(getSalespoints());
    console.log("salespoints  ", JSON.stringify(salespoints));
    dispatch(clearLoading());
  }, []);

  return (
    <Layout>
      <Center>
        <Heading fontSize="xl" mt="6" color="brand.500">
          Distributeurs de café
        </Heading>{" "}
      </Center>
      {/* <Text color="coolGray.800" mr="9">
        {loading.isSuccess ? "loading success" : "loading false"}
      </Text> */}
      {!loading.isSuccess ? (
        <SkeletonLoader />
      ) : (
        <Box>
          <Box
            borderBottomWidth="1"
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="3"
          >
            <HStack
              borderColor="muted.800"
              space={[2, 3]}
              justifyContent="space-between"
              mb="1"
            >
              <Text fontSize="md" color="coolGray.600" bold>
                {" "}
                Nom
              </Text>
              <Text fontSize="md" color="coolGray.600" bold>
                {" "}
                Emplacement
              </Text>
              <Text fontSize="md" color="coolGray.600" bold>
                {" "}
                Quantité
              </Text>
            </HStack>
          </Box>
          <FlatList
            data={salespoints}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                borderColor="muted.800"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="3"
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Button
                    fontSize={14}
                    style={{
                      paddingBottom: 5,
                      paddingTop: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 4,
                      backgroundColor: "#158aea",
                      width: 100,
                      textAlign: "center",
                    }}
                    onPress={() =>
                      navigation.navigate("SalespointScreen", {
                        id: item.id,
                        name: item.name,
                      })
                    }
                  >
                    <Text color="white">{item.name}</Text>
                  </Button>

                  <VStack>
                    <Text color="coolGray.800" mr="9">
                      {item.emplacement}
                    </Text>
                  </VStack>

                  <Text color="blue.900">{item.quantity}</Text>
                </HStack>
              </Box>
            )}
          />
        </Box>
      )}
    </Layout>
  );
}
