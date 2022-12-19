import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useCurrentUser = () => {
  return useContext(AuthContext)
}