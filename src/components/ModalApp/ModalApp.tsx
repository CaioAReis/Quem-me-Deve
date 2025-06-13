import { icons } from "lucide-react-native";
import { ReactElement, ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import Modal from "react-native-modal";

import { HStack, Text, VStack } from "../layout";
import { useModalApp } from "./hooks/useModalApp";

type Props = {
  title: string;
  isTest?: boolean;
  icon: keyof typeof icons;
  children: (close: () => void) => ReactNode;
  trigger: ReactElement<TouchableOpacityProps>;
};

export function ModalApp({ title, icon, trigger, isTest = false, children }: Props) {
  const { Icon, isOpen, toggleModal, triggerWithProps } = useModalApp({ trigger, icon });

  return (
    <>
      {triggerWithProps}

      <Modal
        isVisible={isOpen}
        backdropOpacity={0.4}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        useNativeDriver={!isTest}
        animationInTiming={isTest ? 0 : 300}
        animationOutTiming={isTest ? 0 : 300}
        animationIn={isTest ? undefined : "fadeInUp"}
        animationOut={isTest ? undefined : "fadeOutDown"}
      >
        <VStack className=" rounded-xl bg-white p-6">
          <HStack testID="modal-header" className="items-center gap-2">
            <Icon />
            <Text variant="H5">{title}</Text>
          </HStack>

          <VStack>{children(toggleModal)}</VStack>
        </VStack>
      </Modal>
    </>
  );
}
