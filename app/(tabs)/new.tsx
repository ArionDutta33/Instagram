import { View, Text, Image, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '~/components/Button';
import { uploadImage } from '~/libs/cloudinary';
const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const createPost = async () => {
    if (!image) return;
    const response = await uploadImage(image);
    console.log(response?.public_id);
  };

  return (
    <View className="flex-1 items-center  p-3">
      {/* Image picker */}

      {image ? (
        <Image className="aspect-[3/4] w-52  rounded-lg bg-slate-400" source={{ uri: image }} />
      ) : (
        <View className="aspect-[3/4] w-52 rounded-lg bg-slate-400" />
      )}
      <Text onPress={pickImage} className="m-5 font-semibold text-blue-500">
        Change
      </Text>
      <TextInput
        value={caption}
        onChangeText={(newValue) => setCaption(newValue)}
        placeholder="What is on your mind"
        className="  w-full p-3"
      />
      <View className="mt-auto w-full">
        <Button onPress={createPost} title={'Share post'} />
      </View>
    </View>
  );
};

export default CreatePost;
