import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MapPage from './pages/MapPage'
import AdminPanel from './pages/AdminPanel'
import { CssBaseline } from '@mui/material'

export default function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}