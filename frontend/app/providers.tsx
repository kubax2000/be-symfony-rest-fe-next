"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const [client] = React.useState(new QueryClient());
	const router = useRouter();

	return (
		<QueryClientProvider client={client}>
			<NextUIProvider navigate={router.push}>
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</NextUIProvider>
		</QueryClientProvider>
	);
}
