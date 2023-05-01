import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setCameraReady(false);

      return () => {
        setCameraReady(false);
      };
    }, [])
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (!cameraReady) {
      return;
    }
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };

  const publishPicture = () => {
    navigation.navigate("Posts", { photo });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
          onCameraReady={() => {
            setCameraReady(true);
          }}
        >
          {/* {photo && (
            <View style={styles.takenPhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "contain",
                }}
              />
            </View>
          )} */}
          <TouchableOpacity onPress={takePicture} style={styles.snapContainer}>
            <Text style={styles.snap}>
              <Icon name="camera" type="font-awesome" color="#fff" size={20} />
            </Text>
          </TouchableOpacity>
        </Camera>
      </View>
      <TouchableOpacity style={styles.publishButton} onPress={publishPicture}>
        <Text style={styles.publishButtonText}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    flex: 1,
  },
  cameraWrapper: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  snap: {
    color: "#ffff",
  },
  snapContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  publishButton: {
    width: "100%",
    height: 51,
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 12,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  publishButtonText: {
    color: "#fff",
  },
  takenPhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
