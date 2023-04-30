import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Image
        source={require("../images/Rectangle22.jpg")}
        style={styles.userPhoto}
      />
      <Text style={[styles.textContainer, { flex: 1 }]}>
        <Text style={styles.userName}>Natali Romanova</Text>
        {"\n"}
        <Text style={styles.userEmail}>email@example.com</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginTop: 32,
  },

  textContainer: {
    marginLeft: 8,
  },

  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    fontWeight: "bald",
  },
  userEmail: {
    fontWeight: "normal",
    fontSize: 11,
  },
});
