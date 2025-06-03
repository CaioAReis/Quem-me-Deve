import { FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Clock, HandCoins, Phone } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

import { Box, HStack, Text, VStack } from "@/components/layout";

type Props = {
  phone: string;
  deadline: Date;
};

export function ChargeView({ phone, deadline }: Props) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#e9e9ea" : "#292932";

  const handleCallToUser = () => {
    const url = `tel:${phone}`;
    Linking.openURL(url);
  };

  const handleGoToWhatsapp = () => {
    const url = `https://wa.me/55${phone}?text=${encodeURIComponent("Olá, tudo bem? Só passando para lembrar daquele valor que combinamos. Você teria uma previsão de quando conseguirá fazer o pagamento?")}`;
    Linking.openURL(url);
  };

  return (
    <VStack className="gap-1">
      <HStack className="items-center p-6">
        <HStack className="flex-1 items-center">
          <HandCoins color={iconColor} />
          <VStack className="gap-0">
            <Text variant="H5">Fazer Cobrança</Text>
            <Text className="text-sm color-slate-500">
              Prazo até: {deadline?.toLocaleDateString()}
            </Text>
          </VStack>
        </HStack>

        <HStack className="gap-5">
          <TouchableOpacity onPress={handleCallToUser} activeOpacity={0.7}>
            <Phone color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoToWhatsapp} activeOpacity={0.7}>
            <FontAwesome color={iconColor} name="whatsapp" size={24} />
          </TouchableOpacity>
        </HStack>
      </HStack>

      <Box className="h-[1] w-full bg-gray-200 p-0 dark:bg-gray-800" />

      <HStack className="my-8 gap-2 px-6">
        <Clock color={iconColor} />
        <Text variant="H5">Histórico</Text>
      </HStack>
    </VStack>
  );
}
