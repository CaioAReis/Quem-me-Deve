import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftCircle, PenLine } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { EditDebitorModal } from "./EditDebitorModal";

import { User } from "@/@types";
import { Avatar, ModalApp } from "@/components";
import { Box, Center, HStack, Text, VStack } from "@/components/layout";
import { CurrencyVisibility } from "@/features/currencyVisibility/currencyVisibility";
import { useSessionStore } from "@/store/session";
import { convertToCurrency, phoneMask } from "@/utils/functions";

type Props = {
  user: User;
  totalDebit: number;
  onGoBack: VoidFunction;
  onUserUpdate: (user: Partial<User>) => void;
};

export function LoanHead({ onGoBack, user, onUserUpdate, totalDebit }: Props) {
  const hiddenValues = useSessionStore((state) => state.hiddenValues);

  return (
    <LinearGradient end={{ x: 0.8, y: 1 }} colors={["#7740FE", "#2CDC5F"]}>
      <Box className="p-6">
        <VStack className="gap-4">
          <HStack className="items-center justify-between">
            <TouchableOpacity testID="back" onPress={onGoBack} activeOpacity={0.7}>
              <ArrowLeftCircle color="white" size={30} />
            </TouchableOpacity>

            <HStack className="gap-3">
              <CurrencyVisibility />

              <ModalApp
                icon="UserRound"
                title="Editar Devedor"
                trigger={
                  <TouchableOpacity
                    testID="edit-user"
                    activeOpacity={0.7}
                    className="size-10 items-center justify-center"
                  >
                    <PenLine color="white" />
                  </TouchableOpacity>
                }
              >
                {(close) => (
                  <EditDebitorModal onUserUpdate={onUserUpdate} user={user} onCloseModal={close} />
                )}
              </ModalApp>
            </HStack>
          </HStack>

          <HStack>
            <Avatar size="xs" name={user?.name} />

            <VStack className="flex-1 justify-center gap-0">
              <Text variant="H5" className="text-white">
                {user?.name}
              </Text>

              {user?.phone && (
                <Text className="text-sm text-orange-200">{phoneMask(user?.phone)}</Text>
              )}
            </VStack>
          </HStack>
        </VStack>

        <Center className="my-6 gap-0">
          <Text className="text-base text-white">Dívida total</Text>

          {hiddenValues ? (
            <Box testID="hidden-value" className="mt-2 h-14 w-2/3 rounded-lg bg-gray-200/55" />
          ) : (
            <Text variant="H1" className="font-poppinsBold text-white">
              {convertToCurrency(totalDebit / 100)}
            </Text>
          )}
        </Center>
      </Box>
    </LinearGradient>
  );
}
