import { Link } from "expo-router";
import { Plus } from "lucide-react-native";

import { Button } from "@/components";
import { Center } from "@/components/layout";

export function Fab() {
  return (
    <Link href="/(user)/newLoan" asChild>
      <Button testID="fab-button" className="absolute bottom-20 right-12">
        <Center className="p-2">
          <Plus color="white" size={30} />
        </Center>
      </Button>
    </Link>
  );
}
