import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { supabase } from '../../api/supabase'

export function ClubForm() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [msg, setMsg] = useState('')

  async function handleAdd() {
    const { error } = await supabase.from('clubs').insert([{
      name, type, city, coords: [parseFloat(lat), parseFloat(lng)]
    }])
    setMsg(error ? 'Помилка' : 'Додано!')
  }

  return (
    <Box sx={{mt:2}}>
      <Typography variant="h6" mb={2}>Додати гурток/секцію</Typography>
      <TextField label="Назва" value={name} onChange={e=>setName(e.target.value)} fullWidth sx={{mb:2}}/>
      <TextField label="Тип (спорт)" value={type} onChange={e=>setType(e.target.value)} fullWidth sx={{mb:2}}/>
      <TextField label="Місто" value={city} onChange={e=>setCity(e.target.value)} fullWidth sx={{mb:2}}/>
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Широта" value={lat} onChange={e=>setLat(e.target.value)} />
        <TextField label="Довгота" value={lng} onChange={e=>setLng(e.target.value)} />
      </Box>
      <Button variant="contained" onClick={handleAdd}>Додати</Button>
      <Typography mt={2}>{msg}</Typography>
    </Box>
  )
}