import { Icon, Input } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

interface ITodoInput {
  getValue: (param: string) => void;
  getPress: () => void;
  placeholder: string;
  value: string;
}

export const TodoInput = ({ value, placeholder, getValue, getPress }: ITodoInput) => {
  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={getPress}>
      <Icon {...props} name="plus-outline" />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      onChangeText={(text) => getValue(text)}
      value={value}
      style={styles.input}
      placeholder={placeholder}
      accessoryRight={renderIcon}
      onSubmitEditing={getPress}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 50
  }
});
