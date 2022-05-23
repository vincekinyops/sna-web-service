// import { useEffect, useContext } from "react"
import { Navigate } from 'react-router-dom';

export const RouteGuard = ({ children }:{children:any}) => {
  let user = localStorage.getItem('loginData')

  // useEffect(() => {
  //   if(!!user) {
      
  //   }
  // // eslint-disable-next-line
  // }, [])

  if (!user) {
    return <Navigate to="/" replace />;
  } 

  return children;
};