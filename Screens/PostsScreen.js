import { Text, View, TouchableOpacity } from "react-native";

import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PostsScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Posts Screen</Text>
    </View>
  );
}
