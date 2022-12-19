import { useMutation, useQuery } from "react-query"
import { API } from "../../axios"

export const useLogin = () => {
  return useMutation((data: { email: string; password: string }) => API.post('/auth/login', data))
}

export const useCreateUser = () => {
  return useMutation((data: any) => API.post(`/users`, data))
}

export const useUpdateUser = () => {
  return useMutation((data: any) => API.patch(`/users/${data.id}`, data))
}

export const useProfile = (enabled: boolean) => {
  return useQuery('profile', () => API.get('/auth/profile'), { enabled })
}

export const useEvents = (params: any, enabled: boolean) => {
  return useQuery(['events', params.mode], () => API.get('/events', {
    params
  }), { enabled })
}

export const useEventTypes = () => {
  return useQuery('eventTypes', () => API.get('/event-types'))
}

export const useEvent = (id: number) => {
  return useQuery('event', () => API.get(`/events/${id}`))
}

