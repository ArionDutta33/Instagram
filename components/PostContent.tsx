import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import { AdvancedImage } from 'cloudinary-react-native';
import { cld } from '~/libs/cloudinary';
import { scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { ResizeMode, Video } from 'expo-av';

const PostContent = ({ post }) => {
  const { width } = useWindowDimensions();
  if (post.media_type === 'image') {
    const image = cld.image(post.image);

    image.resize(thumbnail().width(width).height(width)); // Crop the image, focusing on the face.
    return <AdvancedImage className="aspect-[4/3] w-full" cldImg={image} />;
  }
  if (post.media_type === 'video') {
    const video = cld.video(post.image);
    video.resize(scale().width(400));
    return (
      <Video
        style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 8 }}
        source={{ uri: video.toURL() }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        // shouldPlay
      />
    );
  }
};
export default PostContent;
