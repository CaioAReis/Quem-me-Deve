import { CircleX } from "lucide-react-native";
import { TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";

import { Box, HStack, Text } from "./layout";

type Props = {
  label?: string;
  isInvalid?: string;
  isDisabled?: boolean;
} & TextInputProps;

export function Input({ label, isDisabled, isInvalid, ...rest }: Props) {
  return (
    <Box className="w-full gap-1">
      <Text variant="H6" className={isInvalid ? "text-red-500" : "text-gray-800"}>
        {label}
      </Text>

      <TextInput
        cursorColor="#7740FE"
        editable={!isDisabled}
        className={twMerge(
          "rounded-xl border border-gray-200 bg-white px-5 py-4 text-gray-800",
          isInvalid && "border-red-500"
        )}
        {...rest}
      />

      {isInvalid && (
        <HStack className="items-center gap-1">
          <CircleX size={14} color="#dc2626" />
          <Text className="text-sm text-red-600">{isInvalid}</Text>
        </HStack>
      )}
    </Box>
  );
}
