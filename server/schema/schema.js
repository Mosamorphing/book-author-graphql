import { graphql } from 'graphql';
import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLInt, 
    GraphQLID, 
    GraphQLList, 
    GraphQLNonNull 
} from 'graphql';
import _ from 'lodash';
import Book from '../models/book.js';
import Author from '../models/author.js';

// commented out because data will be stored on mongoDB
// var books = [
//     { name: 'Lord of the Rings', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'A Song of Ice and Fire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Hobbit', genre: 'Fantasy', id: '3', authorId: '3' },
//     { name: 'The Silmarillion', genre: 'Fantasy', id: '4', authorId: '1' },
//     { name: 'The Children of Húrin', genre: 'Fantasy', id: '5', authorId: '1' },
//     { name: 'A Clash of Kings', genre: 'Fantasy', id: '6', authorId: '2' }
// ];

// var authors = [
//     { name: 'John Ronald Reuel Tolkien', age: 81, id: '1' },
//     { name: 'George Raymond Richard Martin', age: 76, id: '2' },
//     { name: 'John Ronald Reuel Tolkien', age: 81, id: '3' }
// ];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id });
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {type: AuthorType,
            resolve(parent,args){
                // return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId);
        }
        }
    })    
});

const RootQuery = new GraphQLObjectType({ 
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
            // return _.find(books, {id: args.id});
            return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
            // return _.find(authors, {id: args.id});
            return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
                return Author.find({});
            }
        }
    }

});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorId: { type: GraphQLID }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
        }
    }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});