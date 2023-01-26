import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "./screens/auth/LoginScreen";
import AllSalespointsScreen from "./screens/salespoints/AllSalespointsScreen";
import SalespointScreen from "./screens/salespoints/SalespointScreen";
import SplashScreen from "./screens/splashScreen/SplashScreen";

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState(false);
  const { user, loadingbtn } = useSelector((store) => store.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user.googleToken ? (
          <>
            {/* <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: "LoginScreen", headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ title: "SplashScreen", headerShown: false }}
            /> */}

            <Stack.Screen
              name="AllSalespointsScreen"
              component={AllSalespointsScreen}
              options={{ title: "AllSalespointsScreen", headerShown: false }}
            />
            <Stack.Screen
              name="SalespointScreen"
              component={SalespointScreen}
              options={{ title: "SalespointScreen", headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="AllSalespointsScreen"
              component={AllSalespointsScreen}
              options={{ title: "AllSalespointsScreen", headerShown: false }}
            />
            <Stack.Screen
              name="SalespointScreen"
              component={SalespointScreen}
              options={{ title: "SalespointScreen", headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
