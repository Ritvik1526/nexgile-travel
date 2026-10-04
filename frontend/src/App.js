import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReservationsPage } from './pages/pms/ReservationsPage';
import { GuestsPage } from './pages/pms/GuestsPage';
import { RevenuePage } from './pages/revenue/RevenuePage';
import ModulePage from './pages/ModulePage';

export default function App(){const {user,loading}=useAuth();const [page,setPage]=useState('dashboard');if(loading)return <div className="app-loading">Loading Nexgile-TravAI…</div>;if(!user)return <LoginPage/>;const props={onNavigate:setPage};if(page==='dashboard')return <DashboardPage {...props}/>;if(page==='reservations')return <ReservationsPage {...props}/>;if(page==='guests')return <GuestsPage {...props}/>;if(page==='revenue')return <RevenuePage {...props}/>;return <ModulePage page={page} {...props}/>}
