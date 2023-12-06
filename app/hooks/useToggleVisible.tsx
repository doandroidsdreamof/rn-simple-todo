import { Icon } from "@ui-kitten/components";
import React, { useState } from "react";
import { ImageStyle, TouchableWithoutFeedback } from "react-native";

const useToggleVisible = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleVisible}>
      <Icon {...props} name={isVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return { isVisible, toggleVisible, renderIcon };
};

export default useToggleVisible;
