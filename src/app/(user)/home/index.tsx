import { RelativePathString, Stack } from "expo-router";
import { FlatList, RefreshControl } from "react-native";

import { Fab, HomeHeader, HomeTabs, ListEmpty, LoanCard } from "./_components";
import { useHome } from "./_hooks/useHome";
import { useTabs } from "./_hooks/useTabs";

import { Box, Container, Divider } from "@/components/layout";

export default function Home() {
  const { currentTab, handleChangeToPaid, handleChangeToPending } = useTabs();

  const { loanList, loanBalance, reload } = useHome({ currentTab });

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <Container className="relative bg-gray-50">
        <FlatList
          data={loanList}
          onRefresh={reload}
          refreshing={false}
          ListEmptyComponent={<ListEmpty />}
          ItemSeparatorComponent={() => <Divider />}
          ListFooterComponent={<Box className="h-28" />}
          refreshControl={<RefreshControl refreshing={false} onRefresh={reload} />}
          renderItem={({ item }) => (
            <LoanCard
              since={item.createdAt}
              debit={item.totalDebit}
              userName={item.user.name}
              loanBalance={loanBalance}
              href={`/loanDetail/${item.id}` as RelativePathString}
            />
          )}
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
