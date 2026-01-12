import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import { Toaster } from 'sonner';
import type { PropsWithChildren } from "react";
import { useAuthStore } from "./auth/store/auth.store";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const CityPedidosApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      {/* Custom Provider */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}
