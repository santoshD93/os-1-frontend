import { Container, Paper } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import store2 from 'store2';
import { SignInForm } from "../../components/SignInForm"
import { LocalRoutes, StorageKey } from "../../consts"
import { useCurrentUser, useLogin } from "../../hooks"
import { AuthLayout } from "../../layouts"

export const SignIn = () => {
  const { isLoading, data, mutate } = useLogin();
  const { setUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    mutate({ email, password});
  }

  useEffect(() => {
    if (data?.data) {
      const { token, user } = data.data;
      setUser(user);
      store2.set(StorageKey.Token, token);
      navigate(LocalRoutes.Events);
    }
  }, [data]);

  return (
    <AuthLayout>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Paper sx={{p: 4}}>
          <SignInForm 
            loading={isLoading}
            onSubmit={handleLogin}
          />
        </Paper>
      </Container>
    </AuthLayout>
  )
}