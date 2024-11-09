import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from '~/components/Button';
const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<string | null>(null)


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
      pickImage()
    }
  }, [image])

  return (
    <View className='p-3 items-center  flex-1'>
      {/* Image picker */}

      {image ? (<Image className='rounded-lg bg-slate-400  w-52 aspect-[3/4]' source={{ uri: image }} />
      ) : (
        <View className='bg-slate-400 rounded-lg w-52 aspect-[3/4]' />
      )}
      <Text onPress={pickImage} className='text-blue-500 font-semibold m-5'>Change</Text>
      <TextInput value={caption} onChangeText={(newValue) => setCaption(newValue)} placeholder='What is on your mind' className='  w-full p-3' />
      <View className='mt-auto w-full'>

        <Button title={'Share post'} />
      </View>
    </View>
  )
}

export default CreatePost