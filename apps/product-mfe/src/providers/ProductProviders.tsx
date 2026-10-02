import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './../queryClient';

type Props = {
  children: React.ReactNode;
};

export default function ProductProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}