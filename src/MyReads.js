import React, { Component } from "react";
import PropTypes from 'prop-types';
import BookList from "./BookList";
import * as booksAPI from "./BooksAPI";

class MyReads extends Component {
    static propTypes = {
        showSearchPage: PropTypes.func.isRequired
    }

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
                            <img src="https://loading.io/spinners/book/lg.flip-book-loader.gif"></img>
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
                <div className="open-search">
                    <button onClick={this.props.showSearchPage}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default MyReads