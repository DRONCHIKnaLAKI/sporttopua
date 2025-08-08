import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { supabase } from '../../api/supabase'

export function BannerConstructor() {
  const [img, setImg] = useState('')
  const [link, setLink] = useState('')
  const [text, setText] = useState('')
  const [msg, setMsg] = useState('')

  async function handleAdd() {
    const { error } = await supabase.from('banners').insert([{
      image: img, link, text, active: true, position: 'main'
    }])
    setMsg(error ? 'Помилка' : 'Банер додано!')
  }

  return (
    <Box sx={{mt:2}}>
      <Typography variant="h6" mb={2}>Додати банер</Typography>
      <TextField label="Зображення (URL)" value={img} onChange={e=>setImg(e.target.value)} fullWidth sx={{mb:2}}/>
      <TextField label="Посилання (опц.)" value={link} onChange={e=>setLink(e.target.value)} fullWidth sx={{mb:2}}/>
      <TextField label="Текст (опц.)" value={text} onChange={e=>setText(e.target.value)} fullWidth sx={{mb:2}}/>
      <Button variant="contained" onClick={handleAdd}>Додати банер</Button>
      <Typography mt={2}>{msg}</Typography>
    </Box>
  )
}