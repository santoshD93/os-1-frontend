import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { LocalRoutes } from '../consts';
import { Event, Events, Profile, SignIn, SignUp } from '../pages';

export const AppRoutes = () => {
  return (
      <Routes>
        <Route path={LocalRoutes.Root} element={<SignIn />} />
        <Route path={LocalRoutes.SignIn} element={<SignIn />} />
        <Route path={LocalRoutes.SignUp} element={<SignUp />} />
        <Route path={LocalRoutes.Events} element={<PrivateRoute><Events /></PrivateRoute>} />
        <Route path={LocalRoutes.Event} element={<PrivateRoute><Event /></PrivateRoute>} />
        <Route path={LocalRoutes.Profile} element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={LocalRoutes.Root} />} />
      </Routes>
  );
}