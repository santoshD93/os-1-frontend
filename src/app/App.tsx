import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AppRoutes } from './AppRoutes';
import { theme } from './theme';
import { AuthProvider } from '../context/AuthContext';

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
