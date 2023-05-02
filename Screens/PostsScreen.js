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
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, { uri: route.params.photo }]);
      setLocations((prevState) => {
        const newLocations = [...prevState];
        newLocations.push(route.params.location.coords);
        return newLocations;
      });
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
        renderItem={({ item, index }) => {
          return (
            <View style={styles.flatContainer}>
              <Image
                source={{ uri: item.uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("CommentsScreen")}
                style={styles.commentIcon}
              >
                <Ionicons name="chatbubble-outline" size={18} color="black" />
              </TouchableOpacity>
              {locations[index] && (
                <Text style={styles.locationText}>
                  Lat: {locations[index].latitude.toFixed(2)}, Lng:{" "}
                  {locations[index].longitude.toFixed(2)}
                </Text>
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapScreen", { coords: locations[index] })
                }
                style={styles.geoIcon}
              >
                <Ionicons name="location-outline" size={18} color="white" />
              </TouchableOpacity>
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
  commentIcon: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
    padding: 4,
  },
  locationText: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  geoIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    padding: 4,
  },
});
