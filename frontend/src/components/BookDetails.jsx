import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId }
    });

    if (loading) return <div>Loading book details...</div>;
    if (error) return <div>Error loading book details: {error.message}</div>;

    const displayBookDetails = () => {
        if (data.book) {
            return (
                <div>
                    <h2>{data.book.name}</h2>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {data.book.author.books.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <div>No book selected...</div>;
        }
    };

    return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;