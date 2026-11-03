import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Corporate } from './pages/Corporate'
import { FAQ } from './pages/FAQ'
import { Fleet } from './pages/Fleet'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Services } from './pages/Services'
import { VehicleDetail } from './pages/VehicleDetail'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="fleet" element={<Fleet />} />
        <Route path="vehicle/:id" element={<VehicleDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="corporate" element={<Corporate />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
