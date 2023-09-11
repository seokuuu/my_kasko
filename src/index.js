import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import KaskoTheme from './styles/KaskoTheme'
import Router from './Router'
import GlobalStyle from './styles/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={KaskoTheme}>
      <Router />
    </ThemeProvider>
  </>,
)
