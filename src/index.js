import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import KaskoTheme from './styles/KaskoTheme'
import Router from './Router'
import GlobalStyle from './styles/GlobalStyle'
import { QueryClientProvider } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './api/query'
import AlertComponent from './store/Alert/AlertComponent'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<>
		<GlobalStyle />
		<ThemeProvider theme={KaskoTheme}>
			<QueryClientProvider client={queryClient}>
				<Router />
				<AlertComponent />
				<ReactQueryDevtools position="top-right" initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	</>,
)
