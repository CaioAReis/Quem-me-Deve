type Props = {
  debit: number;
  loanBalance: number;
};

export function useLoanCard({ debit, loanBalance }: Props) {
  const percent = ((100 * debit) / loanBalance / 100).toFixed(0);

  return { percent };
}
