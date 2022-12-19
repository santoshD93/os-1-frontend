import { Container, Paper } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SignUpForm } from "../../components/SignUpForm";
import { LocalRoutes } from "../../consts"
import { useCreateUser } from "../../hooks"
import { AuthLayout } from "../../layouts"
import { User } from "../../types";

export const SignUp = () => {
  const { isLoading, data, mutate } = useCreateUser();
  const navigate = useNavigate();

  const handleRegister = ({ eventTypes, email, name, surname, password}: Partial<User & { password: string }>) => {
    mutate({
      email,
      name,
      surname,
      password,
      eventTypes: {
        connect: eventTypes?.map(({ id }) => ({ id }))
      },
    })
  }

  useEffect(() => {
    if (data?.data) {
      navigate(LocalRoutes.SignIn);
    }
  }, [data]);

  return (
    <AuthLayout>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Paper sx={{p: 4}}>
          <SignUpForm 
            loading={isLoading}
            onSubmit={handleRegister}
          />
        </Paper>
      </Container>
    </AuthLayout>
  )
}