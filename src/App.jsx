import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import Contacts from './pages/Contacts'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element ={<Homepage/>}/>
          <Route path='/contacts' element={<Contacts></Contacts>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
