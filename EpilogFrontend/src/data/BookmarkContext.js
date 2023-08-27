import { createContext, useState } from 'react';

export const bookmarkContext = createContext();

const BookmarkProvider = (props) => {
    const [bookmark, setBookmark] = useState([]);

    return (
        <bookmarkContext.Provider value={[bookmark, setBookmark]}>
            {props.children}
        </bookmarkContext.Provider>
    );
};

export default BookmarkProvider;