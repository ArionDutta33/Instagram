import { View, Text, TextInput } from 'react-native';
import React from 'react';

const CustomTextInput = ({ label, ...textInputProps }) => {
  return (
    <View>
      <Text className="mb-2 font-semibold text-gray-500">{label}</Text>
      <TextInput {...textInputProps} className="rounded-md border border-gray-300 p-3 " />
    </View>
  );
};

export default CustomTextInput;
