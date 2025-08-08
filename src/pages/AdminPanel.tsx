import React from 'react'
import { useAdminAuth } from '../utils/auth'
import { ClubForm } from '../components/admin/ClubForm'
import { BannerConstructor } from '../components/admin/BannerConstructor'
import { Box, Typography, Paper, Tabs, Tab, Container } from '@mui/material'

export default function AdminPanel() {
  const { user, signIn, signOut } = useAdminAuth()
  const [tab, setTab] = React.useState(0)

  if (!user) return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h5" mb={2}>Тільки для адміністратора</Typography>
      <button onClick={signIn}>Увійти через Email</button>
    </Box>
  )

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4">Адмін-панель</Typography>
          <button onClick={signOut}>Вийти</button>
        </Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 3 }}>
          <Tab label="Гуртки/Секції"/>
          <Tab label="Банери"/>
        </Tabs>
        {tab === 0 && <ClubForm />}
        {tab === 1 && <BannerConstructor />}
      </Paper>
    </Container>
  )
}