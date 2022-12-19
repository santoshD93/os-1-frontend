import { Box, styled, TextField, Typography } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { LocalRoutes } from "../../consts";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none !important',
  color: theme.palette.primary.main
}))

interface SignInFormProps {
  loading: boolean,
  onSubmit: (email: string, password: string) => void;
}

export const SignInForm = ({ loading, onSubmit }: SignInFormProps) => {
  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      email: 'testdevuser@gmail.com',
      password: 'Demo1234!',
    },
    validationSchema: schema,
    onSubmit: ({ email, password }) => {
      onSubmit(email, password)
    },
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isValid
  } = formik;
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={4}>Sign In</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: 320
          }}
        >
          <TextField 
            variant="standard"
            size="small"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField 
            variant="standard"
            size="small"
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <LoadingButton 
            size="large"
            variant="contained"
            type="submit"
            disabled={!isValid}
            loading={loading}
          >
            Sign in
          </LoadingButton>

          <Box sx={{display: 'flex', justifyContent: 'flex-end' }}>
            <StyledNavLink to={LocalRoutes.SignUp}>Sign Up</StyledNavLink>
          </Box>
        </Box>
      </form>
    </Box>
  )
}