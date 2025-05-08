import { router, Stack } from "expo-router";
import { useCallback } from "react";
import { FlatList } from "react-native";

import { ChargeView, LoanCard, LoanHead } from "./_components";

import { HistoryItem } from "@/@types";
import { Container } from "@/components/layout";

const x = [
  { value: 10000, createdAt: new Date(), type: "loan" },
  { value: 20000, createdAt: new Date(), type: "payment" },
  { value: 10000, createdAt: new Date(), type: "loan" },
  { value: 10000, createdAt: new Date(), type: "loan" },
] as HistoryItem[];

export default function LoanDetail() {
  const handleGoBack = useCallback(() => router.back(), []);

  return (
    <>
      <Stack.Screen options={{ title: "Loan Details" }} />

      <Container>
        <FlatList
          data={x}
          renderItem={({ item }) => <LoanCard loan={item} />}
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
      </Container>
    </>
  );
}
