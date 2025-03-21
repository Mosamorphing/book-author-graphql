import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const displayBooks = () => {
        if (loading) {
            return <div>Loading books...</div>;
        }
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        return data.books.map(book => (
            <li key={book.id} onClick={() => setSelectedBookId(book.id)}>
                {book.name}
            </li>
        ));
    };

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selectedBookId} />
        </div>
    );
};

export default BookList;