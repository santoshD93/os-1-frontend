import { Container } from "@mui/material";
import { ReactNode } from "react"
import { Header } from "../components/Header";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container 
      maxWidth={false} 
      disableGutters
      sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}
    >
      <Header />
      <Container 
        maxWidth="xl" 
        sx={{display: 'flex', flex: 1, py: 4}}
      >
        {children}
      </Container>
    </Container>
  )
}