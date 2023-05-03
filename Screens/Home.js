import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { Keyboard } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const BottomTab = createBottomTabNavigator();

const CustomRectangleIcon = ({ focused, color }) => {
  const backgroundColor = focused ? color : "transparent";
  const iconColor = focused ? "white" : color;

  return (
    <View
      style={{
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="add" size={24} color={iconColor} />
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 8,
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
            key={index}
          >
            {label === "Create Posts" ? (
              <CustomRectangleIcon
                focused={isFocused}
                color={isFocused ? "tomato" : "gray"}
              />
            ) : (
              <Ionicons
                name={
                  label === "PostsStack"
                    ? isFocused
                      ? "grid"
                      : "grid-outline"
                    : isFocused
                    ? "person"
                    : "person-outline"
                }
                size={24}
                color={isFocused ? "tomato" : "gray"}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const PostsStack = createStackNavigator();

function PostsStackScreen() {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <PostsStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <PostsStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitleAlign: "center" }}
      />
    </PostsStack.Navigator>
  );
}

function BottomTabNavigator() {
  const [keyboardShown, setKeyboardShown] = useState(false);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardShown(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardShown(false));

    return () => {
      Keyboard.removeListener("keyboardDidShow");
      Keyboard.removeListener("keyboardDidHide");
    };
  }, []);
  return (
    <BottomTab.Navigator
      tabBar={(props) => (!keyboardShown ? <CustomTabBar {...props} /> : null)}
    >
      <BottomTab.Screen
        name="PostsStack"
        component={PostsStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Create Posts"
        component={CreatePostsScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitleAlign: "center" }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
