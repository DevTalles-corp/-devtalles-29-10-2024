import MenuIconButton from '@/components/MenuIconButton';
import { useNativeResourcesStore } from '@/store/native-resources.store';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
  const navigation = useNavigation();
  const { images, addImage } = useNativeResourcesStore();

  useEffect(() => {
    navigation.setOptions({
      title: 'Galería',
      headerRight: () => (
        <MenuIconButton onPress={onPickImages} icon="images-outline" />
      ),
    });
  }, []);

  const onPickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.assets || result.assets.length === 0) return;

    // console.log(result.assets);
    // addImage(result.assets[0].uri);
    result.assets.forEach((asset) => addImage(asset.uri));
  };

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
