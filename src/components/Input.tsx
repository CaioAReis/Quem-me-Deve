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
    <Box className="w-full gap-2">
      <Text variant="H6" className={twMerge(isInvalid && styles.labelInvalid)}>
        {label}
      </Text>

      <TextInput
        cursorColor="#7740FE"
        editable={!isDisabled}
        className={twMerge(
          "rounded-xl border",
          styles.lightInput,
          styles.darkInput,
          isInvalid && styles.invalidInput
        )}
        {...rest}
      />

      {isInvalid && (
        <HStack className="items-center gap-1">
          <CircleX size={14} color="#ef4444" />
          <Text className="text-sm text-red-600 dark:text-red-500">{isInvalid}</Text>
        </HStack>
      )}
    </Box>
  );
}

const styles = {
  lightInput: "border-gray-200 bg-white px-5 py-4 text-gray-800",
  darkInput: "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50",
  invalidInput: "invalid:border-red-500",
  labelInvalid: "invalid:text-red-500",
};
