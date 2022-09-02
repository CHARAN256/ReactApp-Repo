import React from 'react'
import { BrowserRouter ,Route , Routes } from 'react-router-dom'
import Formcomponent from './Formcomponent/Component/Formcomponent'
import Gridcomponent from './GridComponent/Component/Gridcomponent'


function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route  path='/ReactApp-Repo' element={< Formcomponent />}></Route>
     <Route  path='/ReactApp-Repo/grid' element={< Gridcomponent />}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App