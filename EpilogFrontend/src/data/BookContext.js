import { createContext, useState } from 'react';

export const bookContext = createContext();

const BookProvider = (props) => {
    const [book, setBook] = useState([]);
    const [bookmark, setBookmark] = useState([]);
    const [genreBook, setGenreBook] = useState([]);
    const [searchBook, setSearchBook] = useState([]);

    return (
        <bookContext.Provider value={[[book, setBook],[bookmark, setBookmark],[genreBook, setGenreBook],[searchBook, setSearchBook]]}>
            {props.children}
        </bookContext.Provider>
    );
};

export default BookProvider;