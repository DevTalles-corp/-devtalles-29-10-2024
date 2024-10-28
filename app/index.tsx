import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface MenuOption {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
}

const MenuOptions: MenuOption[] = [
  {
    title: 'Camera',
    icon: 'camera-outline',
    href: '/camera',
  },
  {
    title: 'Gallery',
    icon: 'images-outline',
    href: '/camera',
  },
  {
    title: 'Gallery',
    icon: 'images-outline',
    href: '/camera',
  },
  {
    title: 'Gallery',
    icon: 'images-outline',
    href: '/camera',
  },
  {
    title: 'Gallery',
    icon: 'images-outline',
    href: '/camera',
  },
];

const NativeApp = () => {
  return (
    <FlatList
      data={MenuOptions}
      style={{ paddingHorizontal: 10, flex: 1 }}
      keyExtractor={(item) => item.title}
      numColumns={4}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.buttonItem}
          activeOpacity={0.7}
          onPress={() => router.push(item.href)}
        >
          <Ionicons name={item.icon} size={32} />
          <ThemedText type="small" style={{ marginVertical: 5 }}>
            {item.title}
          </ThemedText>
        </TouchableOpacity>
      )}
    />
  );
};
export default NativeApp;

const styles = StyleSheet.create({
  buttonItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
