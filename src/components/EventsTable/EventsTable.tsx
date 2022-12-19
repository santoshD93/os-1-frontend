import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { styled } from "@mui/system"
import dayjs from 'dayjs'
import { NavLink } from "react-router-dom"
import { LocalRoutes } from "../../consts"
import { Event } from "../../types"

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none !important',
  color: theme.palette.primary.main
}))

interface EventsTableProps {
  events: Event[]
}

export const EventsTable = ({ events }: EventsTableProps) => {
  
  return (
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Type</TableCell>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Created At</TableCell>
          <TableCell align="right">Updated At</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((event) => (
          <TableRow
            key={`row-${event.id}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>
              {event.name}
            </TableCell>
            <TableCell align="right">{event.description}</TableCell>
            <TableCell align="right">{event.eventType.name}</TableCell>
            <TableCell align="right">
              {dayjs(event.date).format('DD MMM YYYY - HH:mm')}
            </TableCell>
            <TableCell align="right">
              {dayjs(event.createdAt).format('DD MMM YYYY - HH:mm')}
            </TableCell>
            <TableCell align="right">
              {dayjs(event.updatedAt).format('DD MMM YYYY - HH:mm')}
            </TableCell>
            <TableCell align="right">
              <StyledNavLink to={LocalRoutes.Event.replace(':id', event.id + '')}>
                View
              </StyledNavLink>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}