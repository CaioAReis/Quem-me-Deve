import { icons } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { cloneElement, ReactElement, ReactNode, useCallback, useState } from "react";
import { TouchableOpacityProps } from "react-native";
import Modal from "react-native-modal";

import { HStack, Text, VStack } from "./layout";

type Props = {
  title: string;
  children: ReactNode;
  icon: keyof typeof icons;
  trigger: ReactElement<TouchableOpacityProps>;
};

export function ModalApp({ title, icon, trigger, children }: Props) {
  const LucideIcon = icons[icon];
  const { colorScheme } = useColorScheme();

  const [isOpen, setIsOpen] = useState(false);
  const iconColor = colorScheme === "dark" ? "#e9e9ea" : "#3e3e46";

  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  const triggerWithProps = cloneElement(trigger, {
    onPress: toggleModal,
  });

  return (
    <>
      {triggerWithProps}

      <Modal
        isVisible={isOpen}
        backdropOpacity={0.4}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
      >
        <VStack className=" rounded-xl bg-white p-6">
          <HStack className="items-center gap-2">
            <LucideIcon color={iconColor} />
            <Text variant="H5">{title}</Text>
          </HStack>

          <VStack>{children}</VStack>
        </VStack>
      </Modal>
    </>
  );
}
