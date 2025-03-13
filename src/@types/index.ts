export type LayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

export type TextProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
};

export type User = {
  avatar?: string;
  name: string;
  phone: string;
};

type historyItem = {
  value: number; // IN CENTS
  createdAt: Date;
  type: "payment" | "loan";
};

export type Loan = {
  user: User;
  totalDebt: number;
  history: historyItem[];

  createdAt: Date;
  updatedAt: Date;

  deadline?: Date;
};
