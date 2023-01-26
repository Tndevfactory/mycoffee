import React, { useEffect, useState } from "react";
import Lottie from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../../assets/coffee.jpg";
import googleLogo from "../../assets/google.png";
import elasticLogo from "../../assets/elasticLogo.png";
import * as AuthSession from "expo-auth-session";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalespoints,
  clearSuccess,
  clearError,
  clearLoading,
} from "../../redux/features/coffeeSlice";
import {
  storeToken,
  storeUser,
  setLoadingbtn,
} from "../../redux/features/authSlice";

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
  Spinner,
} from "native-base";

import * as Google from "expo-auth-session/providers/google";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { salespoints, loading, success, error } = useSelector(
    (store) => store.coffee
  );
  const { user, loadingbtn } = useSelector((store) => store.auth);
  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();

  const setAsyncStorage = async (k, v) => {
    await AsyncStorage.setItem(k, JSON.stringify(v));
    return;
  };

  const getAsyncStorage = async (k) => {
    const value = await AsyncStorage.getItem(k);
    return value ? JSON.parse(value) : null;
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "37852602861-9b65o6e1uec8m9vh4jvj0posgc9aa0ka.apps.googleusercontent.com",
    iosClientId:
      "37852602861-inca2co76dffg9lpko0l08mr44ltn2pg.apps.googleusercontent.com",
    androidClientId:
      "37852602861-2pa6rk4dufqk76918l7htqbkj1k5fthb.apps.googleusercontent.com",
  });

  const getUserData = async (auth) => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  };

  useEffect(() => {
    if (response?.type === "success") {
      setAuth(response.authentication);
      getUserData(response.authentication);
    }
    if (userInfo) {
      let user = {
        googleID: userInfo?.id,
        googleName: userInfo?.name,
        googleEmail: userInfo?.email,
        googleAvatar: userInfo?.picture,
        googlePassword: auth?.accessToken,
        googleToken: auth?.accessToken,
        googleRefreshToken: auth?.accessToken,
      };
      dispatch(storeUser(user));
      navigation.navigate("SplashScreen");
    }
  }, [response, userInfo]);

  const login = () => {
    promptAsync({ useProxy: true, showInRecents: true });
    // setAsyncStorage("user", JSON.stringify(user));
  };
  return (
    <SafeAreaView>
      <Box
        mt="12"
        width="100%"
        px="6"
        style={{ display: "flex", minHeight: "100%" }}
      >
        <Center>
          <Heading mt="9" mb="8">
            <Text color="brand.500" fontSize={30}>
              {" "}
              My Coffee
            </Text>
          </Heading>
          {/* <Image
            size={110}
            borderRadius={100}
            source={Logo}
            alt="Alternate Text"
            my="8"
          /> */}

          <Lottie
            source={require("../../assets/coffee.json")}
            height="400%"
            autoPlay
            loop
          />
          <Button bg="blue.500" mb="5" onPress={() => login()}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <HStack space={3} justifyContent="center">
                <Center h="6" w="8">
                  <Image
                    size={7}
                    borderRadius={100}
                    source={googleLogo}
                    alt="Alternate Text"
                  />
                </Center>
                {loadingbtn && (
                  <Spinner
                    accessibilityLabel="Loading posts"
                    color="white"
                    size="sm"
                  />
                )}

                <Box h="7" w="200">
                  <Text color="white"> Se connecter avec google</Text>
                </Box>
              </HStack>
            </Box>
          </Button>
        </Center>

        <Box
          style={{
            width: "100%",
            backgroundColor: "transparent",
            bottom: 0,
            marginTop: 540,
          }}
        >
          <Center>
            <Box textAlign="flext-center">
              <HStack space={0} justifyContent="center">
                <Center h="6" w="8">
                  <Image
                    size={7}
                    borderRadius={100}
                    source={elasticLogo}
                    alt="Alternate Text"
                  />
                </Center>
                <Box h="7" w="220">
                  <Text color="darkBlue.800">
                    {" "}
                    Powered by Elastic-solutions
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Center>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
