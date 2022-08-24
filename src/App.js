import Nav from "./components/Nav"
import React, { useState, useEffect } from "react"
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Routes/Home";
import Books from "./Routes/Books"
import BookInfo from './Routes/BookInfo'
import { books } from "./data"
import Cart from "./Routes/Cart";

function App() {
  const [cart, setCart] = useState([])

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }])
  }

  function changeQuantity(book, quantity) {
    setCart(cart.map(item => item.id === book.id
      ? {
        ...item,
        quantity: +quantity,
      }
      : item
    )
    )
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<BookInfo books={books} addToCart={addToCart} cart={cart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                key={books.id}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
