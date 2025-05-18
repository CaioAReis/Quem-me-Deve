import { router, Stack } from "expo-router";
import { useCallback } from "react";
import { FlatList } from "react-native";

import { ChargeView, LoanCard, LoanHead } from "./_components";
import { PaymentModal } from "./_components/PaymentModal";

import { HistoryItem } from "@/@types";
import { Button, ModalApp } from "@/components";
import { Box, Container, Divider, HStack, VStack } from "@/components/layout";

const x = [
  { value: 10000, createdAt: new Date(), type: "loan" },
  { value: 20000, createdAt: new Date(), type: "payment" },
  { value: 10000, createdAt: new Date(), type: "loan" },
  { value: 10000, createdAt: new Date(), type: "loan" },
] as HistoryItem[];

export default function LoanDetail() {
  const handleGoBack = useCallback(() => router.back(), []);

  const totalDebit = x.reduce((sum, item) => sum + item.value, 0);

  return (
    <>
      <Stack.Screen options={{ title: "Loan Details" }} />

      <Container>
        <FlatList
          data={x}
          renderItem={({ item }) => <LoanCard loan={item} />}
          ListFooterComponent={<Box className="h-20" />}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={
            <>
              <LoanHead
                totalDebit={35241}
                onGoBack={handleGoBack}
                user={{ name: "Caio AReis", phone: "79999999999" }}
              />

              <ChargeView deadline={new Date("2025-11-29")} phone="79999999999" />
            </>
          }
        />

        <VStack className="gap-0">
          <Box className="bg-gray-50 shadow-lg shadow-slate-600 dark:bg-gray-900" />

          <HStack className="bg-gray-50 px-6 py-2 dark:bg-gray-900">
            <ModalApp
              icon="Coins"
              title="Novo Empréstimo"
              trigger={
                <Button className="flex-1" variant="outline">
                  Emprestar
                </Button>
              }
            >
              {(onCloseModal) => <></>}
            </ModalApp>

            <ModalApp
              icon="HandCoins"
              title="Pagamento"
              trigger={<Button className="flex-1">Pagamento</Button>}
            >
              {(onCloseModal) => (
                <PaymentModal onCloseModal={onCloseModal} totalDebit={totalDebit} />
              )}
            </ModalApp>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}
