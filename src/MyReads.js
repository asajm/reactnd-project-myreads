import React, { Component } from "react";
import BookList from "./BookList";
import * as booksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class MyReads extends Component {
    state = {
        books: [],
        loading: true
    }

    getShelfBooks = (shelf) => {
        return this.state.books.filter(book => book.shelf === shelf)
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

    componentDidMount() {
        booksAPI.getAll().then((books) => this.setState({
            books: books,
            loading: false
        }));
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {
                    this.state.loading ? (
                        <div className="list-books-content">
                            <img style={{display: 'block', margin: '0 auto'}} alt="loading..." src="https://loading.io/spinners/book/lg.flip-book-loader.gif"></img>
                        </div>
                    ) : (
                            <div className="list-books-content">
                                <div>
                                    <BookList
                                        shelf='Currently Reading'
                                        books={this.getShelfBooks('currentlyReading')}
                                        update={this.updateBook}
                                    ></BookList>
                                    <BookList
                                        shelf='Want To Read'
                                        books={this.getShelfBooks('wantToRead')}
                                        update={this.updateBook}
                                    ></BookList>
                                    <BookList
                                        shelf='Read'
                                        books={this.getShelfBooks('read')}
                                        update={this.updateBook}
                                    ></BookList>
                                </div>
                            </div>
                        )
                }
                <div>
                    <Link className="open-search" to="/search" onClick={this.props.showSearchPage}>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MyReads