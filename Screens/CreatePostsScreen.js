import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await MediaLibrary.requestPermissionsAsync();
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === "granted");
      setHasPermission(status === "granted");
      setHasMediaLibraryPermission(mediaLibraryStatus === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    console.log("Taking picture...");
    const photo = await cameraRef.takePictureAsync();
    console.log("Photo taken:", photo.uri);
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };

  const publishPicture = async () => {
    if (hasLocationPermission) {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      console.log(location);

      navigation.navigate("Posts", { photo, location });
    } else {
      alert(
        "Location not available. Please ensure location permissions are granted and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera
          style={styles.camera}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
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
});
