import { Dispatch } from "react";
import { ViewProps } from "react-native";

export interface DefaultState {
  session: User | null;
  setSession: (user: User) => void;

  isDark: boolean;
  changeTheme: () => void;

  hiddenValues: boolean;
  changeVisibilityValues: () => void;

  hasHydrated: boolean;
}

export type LayoutProps = {
  className?: string;
  children?: React.ReactNode;
} & ViewProps;

export type TextProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
};

export type User = {
  id?: string;
  avatar?: string;
  name: string;
  phone: string;
};

export type HistoryItem = {
  id: string;
  value: number; // IN CENTS
  createdAt: Date;
  type: "payment" | "loan";
};

export type Loan = {
  id: string;
  user: User;
  totalDebit: number;
  history: HistoryItem[];

  createdAt: Date;
  updatedAt: Date;

  deadline?: Date;
};

export type NewItemProps = {
  loanId?: string;
  totalDebit?: number;
  onCloseModal: VoidFunction;
  setLoanDetails: Dispatch<React.SetStateAction<Loan | null>>;
};
