import { TabButton } from "./TabButton";

import { Center, HStack, Text, VStack } from "@/components/layout";

type Props = {
  title: string;
  currentTab: "pending" | "paid";
  onChangeToPaid: VoidFunction;
  onChangeToPending: VoidFunction;
};

export function HomeTabs({ title, currentTab, onChangeToPaid, onChangeToPending }: Props) {
  return (
    <VStack className="mb-4 mt-10 px-6">
      <Text className="font-poppinsMedium text-gray-800">{title}</Text>

      <Center className="my-5">
        <HStack className="w-3/4 gap-8">
          <TabButton
            icon="Clock"
            label="Pendente"
            onPress={onChangeToPending}
            selected={currentTab === "pending"}
          />

          <TabButton
            label="Pagos"
            icon="CircleCheckBig"
            onPress={onChangeToPaid}
            selected={currentTab === "paid"}
          />
        </HStack>
      </Center>
    </VStack>
  );
}
