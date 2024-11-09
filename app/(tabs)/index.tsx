import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import posts from "../../assets/data/posts.json"
import PostListItem from '~/components/PostListItem';

const FeedScreen = () => {
  return (
    <View>
      <FlatList data={posts}
        contentContainerClassName='items-center '
        contentContainerStyle={{ gap: 10, maxWidth: 512, width: '100%' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PostListItem post={item} />} />
    </View>
  )
}

export default FeedScreen