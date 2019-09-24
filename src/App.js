import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import './MyReads.js'
import MyReads from './MyReads'
import Search from './Search'
import { Route } from "react-router-dom";

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads></MyReads>
        )}></Route>

        <Route path='/search' render={() => (
          <Search></Search>
        )}></Route>

      </div>
    )
  }
}

export default BooksApp
