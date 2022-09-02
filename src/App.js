import React from 'react'
import { BrowserRouter ,Route , Routes } from 'react-router-dom'
import Formcomponent from './Formcomponent/Component/Formcomponent'
import Gridcomponent from './GridComponent/Component/Gridcomponent'


function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route  path='/' element={< Formcomponent />}></Route>
     <Route  path='/grid' element={< Gridcomponent />}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App