import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    SafeAreaView,
} from 'react-native';

const App = () => {
  const [images, setImages] = useState([
    { id: '1', name: 'Image 1', src: 'https://avatars.mds.yandex.net/i?id=02a0d438915e4409b6779abb9faf64f6cfcca7e5-5380211-images-thumbs&n=13' },
    { id: '2', name: 'Image 2', src: 'https://avatars.mds.yandex.net/i?id=794669b01123dbf41c6d22cde6ba7d4cf4902e9b-6202880-images-thumbs&n=13' },
    { id: '3', name: 'Image 3', src: 'https://avatars.mds.yandex.net/i?id=38c9a040e09790b2810b546c18fbd74938b1dfcc-9144721-images-thumbs&n=13' },
  ]);
  const [newImageName, setNewImageName] = useState('');
  const [newImageSrc, setNewImageSrc] = useState('');
  const [loading, setLoading] = useState(false);

  const addImage = () => {
    if (!newImageName || !newImageSrc) {
      Alert.alert('Ошибка', 'Заполните все поля!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setImages([
        ...images,
        {
          id: String(Date.now()),
          name: newImageName,
          src: newImageSrc,
        },
      ]);
      setNewImageName('');
      setNewImageSrc('');
      setLoading(false);
    }, 600);
  };

  const deleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <TextInput
              style={styles.input}
              placeholder="Имя изображения"
              value={newImageName}
              onChangeText={setNewImageName}
          />
          <TextInput
              style={styles.input}
              placeholder="Ссылка на изображение"
              value={newImageSrc}
              onChangeText={setNewImageSrc}
          />
          <Button title="Добавить" onPress={addImage} />
        </View>

        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

        <ScrollView>
          {images.map((image) => (
              <TouchableOpacity
                  key={image.id}
                  onPress={() =>
                      Alert.alert('Подтверждение', 'Удалить это изображение?', [
                        { text: 'Отмена', style: 'cancel' },
                        { text: 'Удалить', onPress: () => deleteImage(image.id) },
                      ])
                  }>
                <ImageBackground
                    source={{ uri: image.src }}
                    style={styles.imageCard}
                    imageStyle={styles.image}>

                  <Text style={styles.imageName}>{image.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginTop: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loader: {
    marginBottom: 20,
  },
  imageCard: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  image: {
    borderRadius: 10,
  },
  imageName: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    textAlign: 'center',
  },
});

export default App;
