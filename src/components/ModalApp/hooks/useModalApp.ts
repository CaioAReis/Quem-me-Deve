import { icons } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { cloneElement, ReactElement, useCallback, useState } from "react";
import { TouchableOpacityProps } from "react-native";

type Props = {
  icon: keyof typeof icons;
  trigger: ReactElement<TouchableOpacityProps>;
};

export function useModalApp({ trigger, icon }: Props) {
  const LucideIcon = icons[icon];
  const { colorScheme } = useColorScheme();

  const [isOpen, setIsOpen] = useState(false);
  const iconColor = colorScheme === "dark" ? "#e9e9ea" : "#3e3e46";

  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  const triggerWithProps = cloneElement(trigger, {
    onPress: toggleModal,
  });

  const Icon = () => LucideIcon({ color: iconColor });

  return { Icon, isOpen, toggleModal, triggerWithProps };
}
