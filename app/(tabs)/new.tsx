import { View, Text, Image, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '~/components/Button';
import { uploadImage } from '~/libs/cloudinary';
import { supabase } from '~/utils/supabase';
import { useAuth } from '../provider/AuthProvider';
import { router } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'video' | 'image' | undefined>();
  const { session } = useAuth();

  useEffect(() => {
    if (!media) {
      pickMedia(); // Pick media if no media is selected
    }
  }, [media]);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type); // Set mediaType to image or video based on selection
    }
  };

  const createPost = async () => {
    if (!media) return;

    try {
      const response = await uploadImage(media);

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            caption,
            image: response?.public_id, // Assuming 'image' will hold either an image or video public_id
            user_id: session?.user.id,
            media_type: mediaType,
          },
        ])
        .select();

      if (error) {
        Alert.alert(error.message); // Display an error if something goes wrong
        return;
      }

      router.push('/(tabs)'); // Navigate to tabs after successfully creating the post
    } catch (error) {
      console.error(error);
      Alert.alert('Error creating post. Please try again.');
    }
  };

  return (
    <View className="flex-1 items-center p-3">
      {/* Media Picker Preview */}
      {media && mediaType === 'image' ? (
        <Image
          style={{ aspectRatio: 3 / 4, width: 200, borderRadius: 8 }}
          source={{ uri: media }}
        />
      ) : media && mediaType === 'video' ? (
        <Video
          style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 8 }}
          source={{ uri: media }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
        />
      ) : (
        <View
          style={{
            aspectRatio: 3 / 4,
            width: 200,
            borderRadius: 8,
            backgroundColor: '#ddd',
          }}
        />
      )}

      {/* Button to Change Media */}
      <Text
        onPress={pickMedia}
        style={{ marginTop: 16, fontSize: 16, color: '#007AFF', fontWeight: '600' }}>
        Change
      </Text>

      {/* Caption Input */}
      <TextInput
        value={caption}
        onChangeText={setCaption}
        placeholder="What's on your mind?"
        style={{
          width: '100%',
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
          marginTop: 16,
          borderColor: '#ccc',
        }}
      />

      {/* Button to Share Post */}
      <View style={{ marginTop: 'auto', width: '100%' }}>
        <Button onPress={createPost} title="Share Post" />
      </View>
    </View>
  );
};

export default CreatePost;
