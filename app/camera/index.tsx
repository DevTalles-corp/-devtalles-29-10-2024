import MenuIconButton from '@/components/MenuIconButton';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
const CameraScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          onPress={() => router.push('/camera')}
          icon="camera-outline"
        />
      ),
    });
  }, []);

  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  );
};
export default CameraScreen;
