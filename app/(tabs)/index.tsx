import { View, Text, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import posts from '../../assets/data/posts.json';
import PostListItem from '~/components/PostListItem';
import { supabase } from '~/utils/supabase';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = async () => {
    let { data, error } = await supabase.from('posts').select('*,user:profiles(*)');
    if (error) {
      Alert.alert(error.message);
    }
    setPosts(data);
  };
  console.log(posts);

  return (
    <View>
      <FlatList
        data={posts}
        contentContainerClassName="items-center "
        contentContainerStyle={{ gap: 10, maxWidth: 512, width: '100%' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
};

export default FeedScreen;
