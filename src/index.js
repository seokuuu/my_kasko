import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import KaskoTheme from "./styles/GlobalTheme";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={KaskoTheme}>
		<Router />
	</ThemeProvider>
);
