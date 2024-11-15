import { View, Text, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AdvancedImage, AdvancedVideo } from 'cloudinary-react-native';

// Import required actions and qualifiers.
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { cld } from '~/libs/cloudinary';
import { ResizeMode, Video } from 'expo-av';
import PostContent from './PostContent';

const PostListItem = ({ post }) => {
  const avatar = cld.image(post.user.avatar_url || 'default_xupe1b');
  avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())));

  return (
    <View className="bg-white">
      <View className="flex-row items-center gap-2 p-3">
        <AdvancedImage className="aspect-square w-12 rounded-full" cldImg={avatar} />
        <Text className="font-semibold ">{post.user.username || 'New User'}</Text>
      </View>
      <PostContent post={post} />

      <View className="flex-row gap-3 p-3">
        <AntDesign name="hearto" size={20} color="black" />
        <Ionicons name="chatbubble-outline" size={20} color="black" />
        <Feather name="send" size={20} color="black" />
        <Feather name="bookmark" className="ml-auto" size={20} color="black" />
      </View>
    </View>
  );
};

export default PostListItem;
