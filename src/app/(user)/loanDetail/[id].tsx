import { router, Stack } from "expo-router";
import { useCallback } from "react";
import { FlatList } from "react-native";

import { ChargeView, LoanHead } from "./_components";

import { Container } from "@/components/layout";

export default function LoanDetail() {
  const handleGoBack = useCallback(() => router.back(), []);

  return (
    <>
      <Stack.Screen options={{ title: "Loan Details" }} />

      <Container>
        <FlatList
          data={[]}
          renderItem={() => <></>}
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
