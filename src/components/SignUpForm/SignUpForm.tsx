import { Autocomplete, Box, styled, TextField, Typography } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { LocalRoutes } from "../../consts";
import { EventType, User } from "../../types";
import { useEventTypes } from "../../hooks";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none !important',
  color: theme.palette.primary.main
}))

interface SignUpFormProps {
  loading: boolean,
  onSubmit: (values: Partial<User>) => void;
}

export const SignUpForm = ({ loading, onSubmit }: SignUpFormProps) => {
  const { data: eventTypes } = useEventTypes();

  const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      eventTypes: [] as EventType[],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isValid,
    setFieldValue
  } = formik;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={4}>Sign Up</Typography>
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
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField 
            variant="standard"
            size="small"
            label="Surname"
            name="surname"
            value={values.surname}
            onChange={handleChange}
            error={!!errors.surname}
            helperText={errors.surname}
          />
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
          <TextField 
            variant="standard"
            size="small"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Autocomplete
            multiple
            id="types"
            options={eventTypes?.data || []}
            getOptionLabel={(option) => option ? option.name : ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={values.eventTypes}
            onChange={(e, newValue) => {
              setFieldValue('eventTypes', newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Interesting Event Types"
              />
            )}
          />

          <LoadingButton 
            size="large"
            variant="contained"
            type="submit"
            disabled={!isValid}
            loading={loading}
          >
            Sign up
          </LoadingButton>

          <Box sx={{display: 'flex', justifyContent: 'flex-end' }}>
            <StyledNavLink to={LocalRoutes.SignIn}>Sign In</StyledNavLink>
          </Box>
        </Box>
      </form>
    </Box>
  )
}