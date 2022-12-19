import { Autocomplete, Box, TextField, Typography } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { User } from "../../types";
import { useEventTypes } from "../../hooks";

interface ProfileFormProps {
  loading: boolean;
  user: User;
  onSubmit: (values: Partial<User>) => void;
}

export const ProfileForm = ({ loading, user, onSubmit }: ProfileFormProps) => {
  const { data: eventTypes } = useEventTypes();

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: user.name,
      surname: user.surname,
      eventTypes: user.eventTypes || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  });

  const {
    dirty,
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid
  } = formik;

  return (
    <Box sx={{ display: 'flex' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={4}>Profile</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: 420
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
                label="Event Types to follow"
              />
            )}
          />

          <LoadingButton 
            size="large"
            variant="contained"
            type="submit"
            loading={loading}
            disabled={!dirty || !isValid}
          >
            Update
          </LoadingButton>
        </Box>
      </form>
    </Box>
  )
}