import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

const CameraShutterScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <Text>CameraShutterScreen</Text>
    </View>
  );
};
export default CameraShutterScreen;
