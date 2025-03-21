import { graphql } from 'graphql';
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLID } from 'graphql';
import _ from 'lodash';

var books = [
    { name: 'Lord of the Rings', genre: 'Fantasy', id: '1' },
    { name: 'A Song of Ice and Fire', genre: 'Fantasy', id: '2' },
    { name: 'The Hobbit', genre: 'Fantasy', id: '3' },
];

var authors = [
    { name: 'John Ronald Reuel Tolkien', age: 81, id: '1' },
    { name: 'George Raymond Richard Martin', age: 76, id: '2' },
    { name: 'John Ronald Reuel Tolkien', age: 81, id: '3' }
];


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })    
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })    
});

const RootQuery = new GraphQLObjectType({ 
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
            return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
            return _.find(authors, {id: args.id});
            }
        }
    }

});

export default new GraphQLSchema({
    query: RootQuery
});