import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { Event } from "../../types"

interface EventCardProps {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Typography color="GrayText">Name: </Typography>
        <Typography>{event.name}</Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Typography color="GrayText">Description: </Typography>
        <Typography>{event.description}</Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Typography color="GrayText">Type: </Typography>
        <Typography>{event.eventType?.name}</Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Typography color="GrayText">Date: </Typography>
        <Typography>{dayjs(event.date).format('DD MMM YYYY - HH:mm')}</Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Typography color="GrayText">Created: </Typography>
        <Typography>{dayjs(event.createdAt).format('DD MMM YYYY - HH:mm')}</Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Typography color="GrayText">Updated: </Typography>
        <Typography>{dayjs(event.updatedAt).format('DD MMM YYYY - HH:mm')}</Typography>
      </Box>
    </Box>
  )
}