import { Stack } from "expo-router";
import { FlatList } from "react-native";

import { ChargeView, LoanCard, LoanHead, LoanModal, PaymentModal } from "./_components";
import { useLoanDetail } from "./_hooks/useLoanDetail";

import { Button, ModalApp } from "@/components";
import { Box, Container, Divider, HStack, VStack } from "@/components/layout";

export default function LoanDetail() {
  const { handleGoBack, loanDetails, totalDebit, totalPayment } = useLoanDetail();

  return (
    <>
      <Stack.Screen options={{ title: "Loan Details" }} />

      <Container>
        <FlatList
          keyExtractor={(item) => item.id}
          data={loanDetails?.history ?? []}
          ItemSeparatorComponent={() => <Divider />}
          ListFooterComponent={<Box className="h-20" />}
          renderItem={({ item }) => <LoanCard loan={item} />}
          ListHeaderComponent={
            loanDetails && (
              <>
                <LoanHead
                  onGoBack={handleGoBack}
                  user={loanDetails.user}
                  totalDebit={(totalDebit ?? 0) - (totalPayment ?? 0)}
                />

                <ChargeView phone={loanDetails.user.phone} deadline={loanDetails.deadline!} />
              </>
            )
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
              {(onCloseModal) => <LoanModal onCloseModal={onCloseModal} />}
            </ModalApp>

            <ModalApp
              icon="HandCoins"
              title="Pagamento"
              trigger={<Button className="flex-1">Pagamento</Button>}
            >
              {(onCloseModal) => (
                <PaymentModal
                  onCloseModal={onCloseModal}
                  totalDebit={(totalDebit ?? 0) - (totalPayment ?? 0)}
                />
              )}
            </ModalApp>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}
