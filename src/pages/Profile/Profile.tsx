import { Button, Container, Paper } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../../components/ProfileForm";
import { useCurrentUser, useUpdateUser } from "../../hooks";
import { DashboardLayout } from "../../layouts";
import { User } from "../../types";

export const Profile = () => {
  const { user, setUser } = useCurrentUser();
  const navigate = useNavigate();
  const { isLoading, data, mutate } = useUpdateUser();
 

  const handleUpdate = ({ eventTypes, ...values }: Partial<User>) => {
    mutate({
      id: user?.id,
      eventTypes: {
        set: eventTypes?.map(({ id }) => ({ id }))
      },
      ...values,
    })
  }

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data]);

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Paper sx={{p: 2}}>
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{mb: 4}}> 
            Back
          </Button>
          {
            user && (
              <ProfileForm 
                user={user}
                onSubmit={handleUpdate}
                loading={isLoading}
              />
            )
          }
        </Paper>
      </Container>
    </DashboardLayout>
  )
}