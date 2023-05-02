import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, { uri: route.params.photo }]);
    }
  }, [route.params]);

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
      <View style={styles.userContainer}>
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

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatContainer}>
              <Image
                source={{ uri: item.uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 32, paddingHorizontal: 16 },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  flatContainer: {
    marginTop: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
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
