import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { router } from './Router'
import GlobalStyle from './styles/GlobalStyle'
import KaskoTheme from './styles/KaskoTheme'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from './api/query'
import AlertComponent from './store/Alert/AlertComponent'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<>
		<GlobalStyle />
		<ThemeProvider theme={KaskoTheme}>
			<QueryClientProvider client={queryClient}>
				<AlertComponent />
				<RouterProvider router={router} />
				<ReactQueryDevtools position="top-right" initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	</>,
)
