
import { Navigate } from "react-router-dom";


export const ProtectRoute = ({ children }) => {

  const userToken = localStorage.getItem('user_token')

  if (userToken === null || userToken === '') {
    return <Navigate to={'/signin'} replace={true}></Navigate>
  }
  return children
}