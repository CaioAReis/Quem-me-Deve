import { Stack } from "expo-router";
import { FlatList } from "react-native";

import { Divider, Fab, HomeHeader, HomeTabs, ListEmpty, LoanCard } from "./_components";
import { useHome } from "./_hooks/useHome";
import { useTabs } from "./_hooks/useTabs";

import { Container } from "@/components/layout";

export default function Home() {
  const { currentTab, handleChangeToPaid, handleChangeToPending } = useTabs();
  const { loanList, loanBalance } = useHome({ currentTab });

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <Container className="relative bg-gray-50">
        <FlatList
          data={loanList}
          renderItem={({ item }) => (
            <LoanCard
              debit={item.totalDebt}
              since={item.createdAt}
              userName={item.user.name}
              loanBalance={loanBalance}
            />
          )}
          ListEmptyComponent={<ListEmpty />}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={
            <>
              <HomeHeader loanBalance={loanBalance} />

              <HomeTabs
                currentTab={currentTab}
                title="Empréstimos Realizados:"
                onChangeToPaid={handleChangeToPaid}
                onChangeToPending={handleChangeToPending}
              />
            </>
          }
        />

        <Fab />
      </Container>
    </>
  );
}
