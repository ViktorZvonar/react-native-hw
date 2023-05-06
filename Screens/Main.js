import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/authScreens/RegistrationScreen";
import LoginScreen from "../Screens/authScreens/LoginScreen";
import BottomTabNavigator from "../Screens/Home";

import { authStateChange } from "../redux/auth/authOperations";

const MainStack = createStackNavigator();

const Main = () => {
  const isAuth = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChange());
  }, [dispatch]);

  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={BottomTabNavigator}
      />
    </MainStack.Navigator>
  );
};

export default Main;
