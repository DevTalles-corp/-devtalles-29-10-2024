import MenuIconButton from '@/components/MenuIconButton';
import { useNativeResourcesStore } from '@/store/native-resources.store';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';

const CameraScreen = () => {
  const navigation = useNavigation();
  const { images } = useNativeResourcesStore();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          onPress={() => router.push('/camera/camera-shutter')}
          icon="camera-outline"
        />
      ),
    });
  }, []);

  return (
    <View style={{ marginHorizontal: 5 }}>
      <FlatList
        numColumns={2}
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: '50%', height: 200, margin: 5 }}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
};
export default CameraScreen;
