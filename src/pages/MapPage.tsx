import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Paper } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { getClubs } from '../api/clubs'
import { Club } from '../types'

export default function MapPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [center, setCenter] = useState<[number, number]>([49.0, 32.0])
  const [userPos, setUserPos] = useState<[number, number] | null>(null)

  useEffect(() => {
    getClubs().then(setClubs)
  }, [])

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        setUserPos([latitude, longitude])
        setCenter([latitude, longitude])
      }
    )
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4">Карта спортивних секцій України</Typography>
          <Button variant="contained" onClick={handleMyLocation}>Моє місцезнаходження</Button>
        </Box>
      </Paper>
      <MapContainer center={center} zoom={6} style={{ height: '70vh', borderRadius: 8 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {userPos && (
          <Marker position={userPos} icon={L.icon({iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32,32]})}>
            <Popup>Ваше місцезнаходження</Popup>
          </Marker>
        )}
        {clubs.map(club => (
          <Marker key={club.id} position={club.coords}>
            <Popup>
              <Typography variant="subtitle1">{club.name}</Typography>
              <Typography variant="body2">{club.type}, {club.city}</Typography>
              <Button 
                variant="outlined" 
                target="_blank"
                href={`https://www.google.com/maps/dir/?api=1&destination=${club.coords[0]},${club.coords[1]}`}
              >
                Побудувати маршрут
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  )
}