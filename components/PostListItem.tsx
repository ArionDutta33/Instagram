import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { AdvancedImage } from 'cloudinary-react-native';


// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from '~/libs/cloudinary'

const PostListItem = ({ post }) => {
    // cld.image returns a CloudinaryImage with the configuration set.
    const image = cld.image(post.image);
    const { width } = useWindowDimensions()
    // Apply the transformation.
    image
        .resize(thumbnail().width(width).height(width))  // Crop the image, focusing on the face.


    const avatar = cld.image(post.user.avatar_url)
    avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())))

    return (
        <View className='bg-white'>
            <View className='p-3 flex-row items-center gap-2'>
                <AdvancedImage className='w-12 aspect-square rounded-full' cldImg={avatar} />
                <Text className='font-semibold '>{post.user.username}</Text>
            </View>
            <AdvancedImage cldImg={image} className='w-full aspect-[4/3]' />
            <View className='flex-row gap-3 p-3'>
                <AntDesign name="hearto" size={20} color="black" />
                <Ionicons name="chatbubble-outline" size={20} color="black" />
                <Feather name="send" size={20} color="black" />
                <Feather name="bookmark" className='ml-auto' size={20} color="black" />
            </View>
        </View>
    )
}

export default PostListItem