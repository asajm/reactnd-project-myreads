import React, { Component } from "react";
import PropTypes from 'prop-types';

class BookDetails extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        update: PropTypes.func.isRequired
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        {
                            this.props.book.imageLinks && this.props.book.imageLinks.thumbnail && (
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                            )
                        }
                        <div className="book-shelf-changer">
                            <select
                                onChange={(e) => this.props.update(this.props.book, e)}
                                value={this.props.book.shelf ? this.props.book.shelf : 'none'}
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>

                    {
                        this.props.book.authors && (
                            this.props.book.authors.map((author, index) => (
                            <div className="book-authors" key={index}>{author}</div>
                        )))
                    }

                </div>
            </li>

        )
    }
}

export default BookDetails