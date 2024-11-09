import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from '~/components/Button';

const ProfileScreen = () => {
  const [image, setImage] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className='p-3 flex-1'>
      {/* Avatar image picker */}
      {image ? (<Image className='rounded-full bg-slate-400  w-52 aspect-square self-center' source={{ uri: image }} />
      ) : (
        <View className='bg-slate-400 rounded-full w-52 aspect-square self-center' />
      )}
      <Text onPress={pickImage} className='self-center text-blue-500 font-semibold m-5'>Change</Text>

      {/* form */}
      <Text className='mb-2 text-gray-500 font-semibold'>Username</Text>
      <TextInput placeholder='Username' value={username} onChangeText={setUsername} className='border border-gray-300 rounded-md p-3 ' />
      {/* button */}
      <View className='gap-2 mt-auto'>
        <Button title='Update Profile' />
        <Button title='Sign out ' />
      </View>

    </View>
  )
}

export default ProfileScreen