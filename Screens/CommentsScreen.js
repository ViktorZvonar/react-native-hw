import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";

const CommentsScreen = ({ route }) => {
  const { photo } = route.params;

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: 240 }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput style={styles.commentInput} placeholder="Add a comment..." />
        <Text style={styles.dateText}>{getCurrentDate()}</Text>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    flex: 1,
  },
  cameraWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  inputWrapper: {
    position: "relative",
  },
  commentInput: {
    marginTop: 16,
    padding: 16,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: "white",
  },
  dateText: {
    position: "absolute",
    bottom: 16,
    right: 16,
    fontSize: 10,
    color: "#BDBDBD",
  },
});
