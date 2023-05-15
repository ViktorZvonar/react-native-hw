import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { authLogOut } from "../redux/auth/authOperations";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    if (route.params) {
      console.log("route params", route.params);
      setPosts((prevState) => [
        ...prevState,
        {
          uri: route.params.photo,
          name: route.params.photoName,
          locationName: route.params.photoLocation,
          postId: route.params.postId,
          comments: route.params.comments,
        },
      ]);
      setLocations((prevState) => {
        const newLocations = [...prevState];
        newLocations.push(route.params.location.coords);
        return newLocations;
      });
    }
  }, [route.params]);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(authLogOut());
      navigation.navigate("Registration");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
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
      {/* <View style={styles.userContainer}>
        <Image
          source={require("../images/Rectangle22.jpg")}
          style={styles.userPhoto}
        />
        <Text style={[styles.textContainer, { flex: 1 }]}>
          <Text style={styles.userName}>Natali Romanova</Text>
          {"\n"}
          <Text style={styles.userEmail}>email@example.com</Text>
        </Text>
      </View> */}

      {posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.iconEmptyContainer}>
            <Icon name="camera" type="font-awesome" color="white" size={20} />
          </View>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={styles.flatContainer}>
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.titleText}>{item.name}</Text>
                <View style={styles.iconsContainer}>
                  <View style={styles.infoContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("CommentsScreen", {
                          photo: item.uri,
                          postId: item.postId,
                        })
                      }
                      style={styles.commentIcon}
                    >
                      <Ionicons
                        name="chatbubble-outline"
                        size={18}
                        color="#BDBDBD"
                      />
                    </TouchableOpacity>
                    <Text style={styles.commentCount}>0</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MapScreen", {
                          coords: locations[index],
                        })
                      }
                      style={styles.geoIcon}
                    >
                      <Ionicons
                        name="location-outline"
                        size={18}
                        color="#BDBDBD"
                      />
                    </TouchableOpacity>
                    <Text style={styles.locationNameText}>
                      {item.locationName}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  flatContainer: {
    marginTop: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  titleText: {
    marginTop: 8,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  commentIcon: {
    borderRadius: 12,
    marginRight: 8,
  },
  commentCount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  geoIcon: {
    borderRadius: 12,
    marginRight: 8,
    marginLeft: 8,
  },
  locationNameText: {
    flexGrow: 1,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "white",
  },
  iconEmptyContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
});
