import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import WorkList from "./pages/WorkList"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<WorkList />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
