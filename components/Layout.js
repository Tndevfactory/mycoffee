import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../assets/coffee.jpg";
import googleLogo from "../assets/google.png";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalespoints,
  clearSuccess,
  clearError,
  clearLoading,
} from "../redux/features/coffeeSlice";

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
import React from "react";

export default function Layout({ children }) {
  return (
    <SafeAreaView>
      <View style={{ padding: 21 }}>
        <Navbar />
        {children}
        <Footer />
      </View>
    </SafeAreaView>
  );
}
