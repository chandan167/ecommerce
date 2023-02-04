import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useMemo, useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { ColorModeContext, getDesignTokens } from './theme';
import { constant } from './utils/constant';
import Routes from './Routes';


function App() {


  const [mode, setMode] = useState(localStorage.getItem('theme') || constant.themeMode.light);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const theme = prevMode === constant.themeMode.light ? constant.themeMode.dark : constant.themeMode.light
          localStorage.setItem('theme', theme);
          return theme;
        });
      },
    }),
    [],
  );



  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <Routes />
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}



export default App
