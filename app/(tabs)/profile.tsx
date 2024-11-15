import { View, Text, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '~/components/Button';
import { supabase } from '~/utils/supabase';

const ProfileScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
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
    <View className="flex-1 p-3">
      {/* Avatar image picker */}
      {image ? (
        <Image
          className="aspect-square w-52  self-center rounded-full bg-slate-400"
          source={{ uri: image }}
        />
      ) : (
        <View className="aspect-square w-52 self-center rounded-full bg-slate-400" />
      )}
      <Text onPress={pickImage} className="m-5 self-center font-semibold text-blue-500">
        Change
      </Text>

      {/* form */}
      <Text className="mb-2 font-semibold text-gray-500">Username</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="rounded-md border border-gray-300 p-3 "
      />
      {/* button */}
      <View className="mt-auto gap-2">
        <Button title="Update Profile" />
        <Button title="Sign out " onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

export default ProfileScreen;
