import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";

import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";

const CommentsScreen = ({ route }) => {
  const { photo, postId, comments } = route.params;
  console.log("postId in Comments", postId);
  const [comment, setComment] = useState("");
  const [newComments, setNewComments] = useState(comments);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const submitComment = async () => {
    if (comment) {
      try {
        const commentRef = doc(db, "post", id);
        await updateDoc(commentRef, { comment: arrayUnion(comment) });
        console.log("Comment added successfully.");
        setNewComments((prev) => [...prev, comment]);
      } catch (err) {
        console.log("Try again \n", err.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.cameraWrapper}>
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: 240 }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={(value) => setComment(value)}
            onFocus={() => setIsShowKeyboard(true)}
            onBlur={() => setIsShowKeyboard(false)}
          />
          <Button
            title="Submit Comment"
            onPress={submitComment}
            color="#841584"
          />
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
