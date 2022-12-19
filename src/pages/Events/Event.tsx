import { Button, Container, Paper } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom";
import { EventCard } from "../../components/EventCard";
import { useEvent } from "../../hooks";
import { DashboardLayout } from "../../layouts"

export const Event = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useEvent(!!id ? +id : 0);

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Paper sx={{p: 2}}>
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{mb: 4}}> 
            Back
          </Button>

          { data?.data && (
            <EventCard event={data.data} />
          ) }
        </Paper>
      </Container>
    </DashboardLayout>
  )
}