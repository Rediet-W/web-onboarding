'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store'; 
import Dashboard from '../../components/dashboard';


export default function Home() {
  return (
    <Provider store={store}>
        <Dashboard />
    </Provider>
  );
}