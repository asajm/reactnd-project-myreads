import React, { Component } from "react";
import * as booksAPI from "./BooksAPI";
import BookList from "./BookList";
import { Link } from "react-router-dom";

class Search extends Component {
    state = {
        books: []
    }

    onSearch = (event) => {
        booksAPI.search(event.target.value).then(books => {
            if(typeof books !== 'undefined' && books instanceof Array && books.length > 0) this.setState({books: books})
            else this.setState({books: []})
        });
    }

    updateBook = (book, event) => {
        const shelf = event.target.value
        booksAPI.update(book, shelf).then(res => {
            this.setState(prevState => ({
                books: prevState.books.map(_book => {
                    if(_book.id === book.id) _book.shelf = shelf
                    return _book
                })
            }))
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                        onClick={this.props.showMyReadsPage}>Close</Link>
                    <div className="search-books-input-wrapper">
                        {}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.onSearch}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookList
                        // shelf='Currently Reading'
                        books={this.state.books}
                        update={this.updateBook}
                    ></BookList>
                </div>
            </div>
        )
    }
}

export default Search