import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Eye, Moon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

import { Divider, ListEmpty, LoanCard, TabButton } from "./components";

import { Avatar } from "@/components";
import { Center, Container, HStack, Text, VStack } from "@/components/layout";
import { generateAvatar } from "@/lib";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<"pending" | "paid">("pending");

  const handleChangeToPaid = useCallback(() => setCurrentTab("paid"), []);
  const handleChangeToPending = useCallback(() => setCurrentTab("pending"), []);

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <Container className="bg-gray-50">
        <FlatList
          data={["", "", "", ""]}
          renderItem={() => <LoanCard />}
          ListEmptyComponent={<ListEmpty />}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={
            <>
              <LinearGradient end={{ x: 0.8, y: 1 }} colors={["#7740FE", "#2CDC5F"]}>
                <VStack className="p-6">
                  <HStack className="items-center">
                    <HStack className="flex-1 items-center">
                      <Avatar size="xs" name="Caio AReis" xml={generateAvatar("")} />

                      <VStack className="gap-0">
                        <Text className="text-sm text-gray-200">Olá,</Text>
                        <Text variant="H5" className="text-white">
                          Caio AReis
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack>
                      <Eye color="white" />
                      <Moon color="white" />
                    </HStack>
                  </HStack>

                  <Center className="my-6 gap-2">
                    <Text className="text-base text-white">Balanço total</Text>
                    <Text variant="H1" className="font-poppinsBold text-white">
                      R$ 2.430,00
                    </Text>
                  </Center>
                </VStack>
              </LinearGradient>

              <VStack className="mb-4 mt-10 px-6">
                <Text className="font-poppinsMedium text-gray-800">Empréstimos Realizados:</Text>

                <Center className="my-5">
                  <HStack className="w-3/4 gap-8">
                    <TabButton
                      icon="Clock"
                      label="Pendente"
                      onPress={handleChangeToPending}
                      selected={currentTab === "pending"}
                    />

                    <TabButton
                      label="Pagos"
                      icon="CircleCheckBig"
                      onPress={handleChangeToPaid}
                      selected={currentTab === "paid"}
                    />
                  </HStack>
                </Center>
              </VStack>
            </>
          }
        />
      </Container>
    </>
  );
}
