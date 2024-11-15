import { View, Text, Image, useWindowDimensions, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { supabase } from '~/utils/supabase';
import { useAuth } from '~/app/provider/AuthProvider';
import { sendLikeNotification } from '~/utils/Notifications';

const PostListItem = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likedRecord, setLikedRecored] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (post.my_likes.length > 0) {
      setLikedRecored(post.my_likes[0]);
      setIsLiked(true);
    }
  }, [post.my_likes]);
  useEffect(() => {
    if (isLiked) {
      onSaveLikedPost();
    } else {
      deleteLike();
    }
  }, [isLiked]);
  console.log(likedRecord);

  // const fetchLike = async () => {
  //   const { data, error } = await supabase
  //     .from('likes')
  //     .select('*')
  //     .eq('user_id', user?.id)
  //     .eq('post_id', post.id)
  //     .select();
  //   if (data && data?.length > 0) {
  //     setLikedRecored(data[0]);
  //     setIsLiked(true);
  //   }
  // };

  const onSaveLikedPost = async () => {
    if (likedRecord) return;
    const { data, error } = await supabase
      .from('likes')
      .insert([{ user_id: user?.id, post_id: post.id }])
      .select();

    //send notification
    sendLikeNotification(data[0]);

    setLikedRecored(data[0]);
  };

  const deleteLike = async () => {
    if (likedRecord) {
      const { data, error } = await supabase.from('likes').delete().eq('id', likedRecord.id);
      if (!error) {
        setLikedRecored(null);
      }
    }
  };

  const avatar = cld.image(post.user.avatar_url || 'default_xupe1b');
  avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())));
  return (
    <View className="bg-white">
      <View className="flex-row items-center gap-2 p-3">
        <AdvancedImage className="aspect-square w-12 rounded-full" cldImg={avatar} />
        <Text className="font-semibold ">{post.user.username || 'New User'}</Text>
      </View>
      <PostContent post={post} />
      <View className={`flex-row gap-3 p-3`}>
        <AntDesign
          onPress={() => setIsLiked(!isLiked)}
          name={isLiked ? 'heart' : 'hearto'}
          size={20}
          color={isLiked ? 'crimson' : 'black'}
        />
        <Ionicons name="chatbubble-outline" size={20} color="black" />
        <Feather name="send" size={20} color="black" />
        <Feather name="bookmark" className="ml-auto" size={20} color="black" />
      </View>
      <View className="gap-1 px-3">
        <Text className="font-semibold">{post.likes[0]?.count || 0} Likes</Text>
        <Text>
          <Text className="  font-semibold">{post.user.username || 'New User'}</Text>
          <Text className="px-2"> {post.caption}</Text>
        </Text>
      </View>
    </View>
  );
};

export default PostListItem;
