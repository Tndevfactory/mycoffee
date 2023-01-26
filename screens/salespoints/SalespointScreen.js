import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Layout from "../../components/Layout";

import { StatusBar } from "expo-status-bar";
import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalespoints,
  getSalespoint,
  clearSuccess,
  clearError,
  clearLoading,
  clearObserver,
  getProduct,
} from "../../redux/features/coffeeSlice";
import { storeToken } from "../../redux/features/authSlice";
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
  useToast,
} from "native-base";

import SkeletonLoader from "../../components/SkeletonLoader";

export default function SalespointScreen({ navigation, route }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { salespoint, loading, success, error, observer } = useSelector(
    (store) => store.coffee
  );
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(clearLoading());
    dispatch(getSalespoint(route.params.id));
  }, []);
  const getProductFunc = (salepointId, productId) => {
    const dt = {
      salepointId: salepointId,
      productId: productId,
    };
    console.log("dt ", dt);
    dispatch(clearSuccess());
    dispatch(clearLoading());
    dispatch(getProduct(dt));
    dispatch(getSalespoint(salepointId));
    // setAsyncStorage("user", JSON.stringify(user));
    toast.show({
      render: () => {
        return (
          <Box
            bg="blue.400"
            px="2"
            py="1"
            rounded="sm"
            mb={5}
            style={{ color: "white" }}
          >
            Order confirmed
          </Box>
        );
      },
      placement: "top",
    });
  };
  return (
    <Layout>
      <Button
        bg="#158aea"
        style={{ color: "white" }}
        onPress={() => {
          dispatch(getSalespoints());
          navigation.navigate("AllSalespointsScreen");
        }}
      >
        Retour
      </Button>
      {!loading.isSuccess ? (
        <SkeletonLoader />
      ) : (
        <Box>
          <Center>
            <Heading fontSize="xl" mt="6" color="brand.500">
              Salespoint {route.params.name}
            </Heading>{" "}
          </Center>
          {/* <Text color="coolGray.800" mr="9">
            {loading.isSuccess ? "loading success" : "loading false"}
          </Text> */}
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
                Nom
              </Text>
              <Text fontSize="md" color="coolGray.600" bold>
                Description
              </Text>
              <Text fontSize="md" color="coolGray.600" bold>
                Quantité
              </Text>
            </HStack>
          </Box>

          {/* {salespoint ? (
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
                <Text fontSize="sm" color="coolGray.500">
                  {salespoint?.product_name}
                </Text>
                <Text fontSize="sm" color="coolGray.500">
                  {salespoint?.description}
                </Text>
                <Text fontSize="sm" color="coolGray.500">
                  {salespoint?.quantity}
                </Text>
              </HStack>
            </Box>
          ) : (
            ""
          )} */}

          <FlatList
            data={salespoint}
            renderItem={({ item }) => (
              <Box borderBottomWidth="1" borderColor="muted.800" py="3">
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
                      getProductFunc(item.sales_point_id, item.product_id)
                    }
                  >
                    <Text color="white">{item.name}</Text>
                  </Button>

                  <Text color="coolGray.800">{item?.description}</Text>

                  <Text color="blue.900">{item?.quantity}</Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      )}
    </Layout>
  );
}
