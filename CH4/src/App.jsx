import { Routes, Route } from 'react-router-dom'
import Header from './component/Header.jsx'
import ProductList from './component/ProductList.jsx'
import ProductDetail from './component/ProductDetail.jsx'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  )
}

export default App