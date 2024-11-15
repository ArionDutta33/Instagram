import { View, Text, Image, FlatList, Alert, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import posts from '../../assets/data/posts.json';
import PostListItem from '~/components/PostListItem';
import { supabase } from '~/utils/supabase';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // State to manage refreshing
  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = async () => {
    setIsRefreshing(true); // Start refreshing
    let { data, error } = await supabase.from('posts').select('*,user:profiles(*)');
    if (error) {
      Alert.alert(error.message);
    }
    setPosts(data);
    setIsRefreshing(false); // Stop refreshing
  };
  console.log(posts);

  return (
    <View>
      <FlatList
        data={posts}
        contentContainerClassName="items-center "
        contentContainerStyle={{ gap: 10, maxWidth: 512, width: '100%' }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchPosts} // Trigger fetchPosts on pull-to-refresh
            colors={['#9Bd35A', '#689F38']} // Optional: Customize spinner color
          />
        }
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
};

export default FeedScreen;
