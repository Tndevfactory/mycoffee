import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../assets/coffee.jpg";
import googleLogo from "../assets/google.png";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import {
  getSalespoints,
  clearSuccess,
  clearError,
  clearLoading,
} from "../redux/features/coffeeSlice";
import {
  storeToken,
  storeUser,
  setLoadingbtn,
} from "../redux/features/authSlice";
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
} from "native-base";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((store) => store.auth);

  const removeAsyncStorage = async (k) => {
    await AsyncStorage.removeItem(k);
    return;
  };
  const googleLogout = async (user) => {
    await AuthSession.revokeAsync(
      {
        token: user.googleToken,
      },
      {
        revocationEndpoint: "https://oauth2.googleapis.com/revoke",
      }
    );
  };
  const logout = () => {
    let user = {
      googleID: "",
      googleName: "",
      googleEmail: "",
      googlePassword: "",
      googleToken: "",
      googleRefreshToken: "",
      googleAvatar: "",
    };
    // googleLogout();
    dispatch(storeUser(user));
    removeAsyncStorage("user");
  };

  return (
    <HStack
      borderColor="muted.800"
      space={[2, 3]}
      justifyContent="space-between"
      mt="6"
      mb="9"
    >
      <Avatar
        bg="brand.500"
        alignSelf="center"
        size="sm"
        source={{
          uri: user.googleAvatar
            ? user.googleAvatar
            : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
        }}
      >
        {" "}
        AJ
      </Avatar>
      <Text fontSize="sm" color="coolGray.600" mt="2">
        {user.googleEmail ? user.googleEmail : ""}
      </Text>
      <TouchableOpacity>
        <Ionicons
          name="ios-exit-outline"
          size={35}
          color="grey"
          onPress={() => logout()}
        />
      </TouchableOpacity>
    </HStack>
  );
}
