import { Container, Paper, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { EventsTable } from "../../components/EventsTable";
import { useCurrentUser, useEvents } from "../../hooks";
import { DashboardLayout } from "../../layouts"

export const Events = () => {
  const { user } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const { data } = useEvents({
    type: user?.eventTypes?.map((et) => et.id),
    mode: activeTab
  }, !!user);

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Paper sx={{p: 2}}>
          <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ mb: 6 }}>
            <Tab label="Active" value="active" />
            <Tab label="Past" value="past" />
          </Tabs>

          <EventsTable events={data?.data || []} />
        </Paper>
      </Container>
    </DashboardLayout>
  )
}