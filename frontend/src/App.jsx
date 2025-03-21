import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import BookList from './components/BookList'
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
<ApolloProvider client={client}>
      <div id="main">
        <h1>
          Exploring GraphQL with MongoDB!
        </h1>
        <BookList />
        <AddBook />
      </div>
      </ApolloProvider>
  );
}

export default App;
