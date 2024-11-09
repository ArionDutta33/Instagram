import { View, Text, Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import posts from "../../assets/data/posts.json"
const FeedScreen = () => {
  const post1 = posts[0]
  return (
    <View className='bg-white'>
      <View className='p-3 flex-row items-center gap-2'>
        <Image className='w-12 aspect-square rounded-full' source={{ uri: post1.user.image_url }} />
        <Text className='font-semibold '>{post1.user.username}</Text>
      </View>
      <Image className='w-full aspect-[4/3]' source={{ uri: post1.image_url }} />
      <View className='flex-row gap-3 p-3'>
        <AntDesign name="hearto" size={20} color="black" />
        <Ionicons name="chatbubble-outline" size={20} color="black" />
        <Feather name="send" size={20} color="black" />
        <Feather name="bookmark" className='ml-auto' size={20} color="black" />
      </View>
    </View>
  )
}

export default FeedScreen