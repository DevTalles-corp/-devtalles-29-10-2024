import { ThemedText } from '@/components/ThemedText';
import { useNativeResourcesStore } from '@/store/native-resources.store';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

export default function CameraShutterScreen() {
  const { addImage } = useNativeResourcesStore();

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  const [photoPath, setPhotoPath] = useState<string>();
  const cameraViewRef = useRef<CameraView>(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const takePhoto = async () => {
    if (!cameraViewRef.current) return;

    const photo = await cameraViewRef.current.takePictureAsync();
    console.log(photo);
    if (!photo) return;

    setPhotoPath(photo.uri);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <ThemedText>Dar permiso</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  if (photoPath) {
    return (
      <View>
        <Image
          source={{ uri: photoPath }}
          style={{ width: '100%', height: '100%' }}
        />

        <AcceptPhotoButton
          onPress={() => {
            addImage(photoPath);
            navigation.goBack();
          }}
        />
        <RetakeButton onPress={() => setPhotoPath(undefined)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraViewRef}>
        <CameraButton onPress={takePhoto} />

        {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity> */}
      </CameraView>
    </View>
  );
}

export const CameraButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 30,
        left: dimensions.width / 2 - 35,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: 'white',
          opacity: 0.9,
          width: 70,
          height: 70,
          borderRadius: 50,
        }}
      />
    </TouchableOpacity>
  );
};

export const AcceptPhotoButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 30,
        left: dimensions.width / 2 - 35,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: 'white',
          opacity: 0.9,
          width: 70,
          height: 70,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="checkmark-outline" size={40} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const RetakeButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 40,
        right: 30,
        opacity: 0.8,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: 'white',
          opacity: 0.9,
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="refresh-outline" size={25} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
