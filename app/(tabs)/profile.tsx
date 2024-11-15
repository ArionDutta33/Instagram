import { View, Text, Image, TextInput, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '~/components/Button';
import { supabase } from '~/utils/supabase';
import { useAuth } from '../provider/AuthProvider';
import CustomTextInput from '~/components/CustomTextInput';
import { cld, uploadImage } from '~/libs/cloudinary';
import { AdvancedImage } from 'cloudinary-react-native';

const ProfileScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

    if (error) {
      Alert.alert(error.message);
    }
    setUsername(data.username);
    setBio(data.bio);
    setRemoteImage(data.avatar_url);
  };

  const updateProfile = async () => {
    if (!user) return;

    const upadatedProfile = {
      id: user.id,
      username,
      bio,
    };
    if (image) {
      const response = await uploadImage(image);
      upadatedProfile.avatar_url = response?.public_id;
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(upadatedProfile)
      .eq('id', user.id);
    if (error) {
      Alert.alert(error.message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  let remoteCldImage;
  if (remoteImage) {
    remoteCldImage = cld.image(remoteImage);
    // remoteCldImage.resize(thumbnail().width(200).height(200));
  }

  return (
    <View className="flex-1 p-3">
      {/* Avatar image picker */}
      {/* use amazon s3 or cloudinary */}
      {image ? (
        <Image
          className="aspect-square w-52  self-center rounded-full bg-slate-400"
          source={{ uri: image }}
        />
      ) : remoteCldImage ? (
        <AdvancedImage
          cldImg={remoteCldImage}
          className="aspect-square w-52  self-center rounded-full bg-slate-400"
        />
      ) : (
        <View className="aspect-square w-52 self-center rounded-full bg-slate-400" />
      )}
      <Text onPress={pickImage} className="m-5 self-center font-semibold text-blue-500">
        Change
      </Text>

      {/* form */}
      <View className="gap-5">
        <CustomTextInput
          label={'Username'}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <CustomTextInput label={'Bio'} placeholder="Bio" value={bio} onChangeText={setBio} />
      </View>
      {/* button */}
      <View className="mt-auto gap-2 ">
        <Button title="Update Profile" onPress={updateProfile} />
        <Button title="Sign out " onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

export default ProfileScreen;
function thumbnail() {
  throw new Error('Function not implemented.');
}
