import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  return (
    <View className='p-3 items-center flex-1'>
      {/* Image picker */}

      <Image className='rounded-lg   w-52 aspect-[3/4]' source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg' }} />
      <Text onPress={() => { }} className='text-blue-500 font-semibold m-5'>Change</Text>
      <TextInput value={caption} onChangeText={(newValue) => setCaption(newValue)} placeholder='What is on your mind' className='  w-full p-3' />
      <View className='mt-auto w-full'>
        <Pressable className='bg-blue-500 w-full p-3 items-center rounded-md'>
          <Text className='text-white font-semibold'>Share</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CreatePost