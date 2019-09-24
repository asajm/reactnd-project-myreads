import React, { Component } from "react";
import PropTypes from 'prop-types';
import BookDetails from "./BookDetails";

class BookList extends Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{this.props.shelf}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    this.props.books.map(book => (
                                        <BookDetails
                                            book={book}
                                            update={this.props.update}
                                            key={book.id}
                                        ></BookDetails>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookList