export type LayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

export type TextProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
};
