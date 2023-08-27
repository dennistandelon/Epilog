export default class BookData{
    static book = null;

    detail = null;
    bookmarked = null;
    byGenre = null;

    static getBook(){
        if(!this.book){
            this.book = new BookData();
        }
        return this.book;
    }


    setBookmarked(datas){
        const bookmarkBook = [];


        datas.map((item)=>{
                if(item.isBookmarked){
                    bookmarkBook.push({
                        BookID: item.BookID,
                        Title: item.Title,
                        CoverImage: item.CoverImage,
                        Content:item.Content,
                        Description:item.Description,
                        Bookmark: item.Bookmark,
                        isBookmarked: item.isBookmarked,
                        Category: item.Category,
                    });
                }
        });

        this.bookmarked = bookmarkBook;
    }


    setData(datas, email){
        const dataContainer = datas;

        const selected = [];
        const bookmarkBook = [];

        dataContainer.map((item)=>{
            let isBookmarked = false;
            if(item.Bookmark.indexOf(email) > -1){
                isBookmarked = true;
                bookmarkBook.push({
                    BookID: item.BookID,
                    Title: item.Title,
                    CoverImage: item.CoverImage,
                    Content:item.Content,
                    Description:item.Description,
                    Bookmark: item.Bookmark,
                    isBookmarked: isBookmarked,
                    Category: item.Category,
                });
            }
            selected.push({
                BookID: item.BookID,
                Title: item.Title,
                CoverImage: item.CoverImage,
                Content:item.Content,
                Description:item.Description,
                Bookmark: item.Bookmark,
                isBookmarked: isBookmarked,
                Category: item.Category,
            })
        })


        this.detail = selected;
        this.bookmarked = bookmarkBook;
    }

    setDetail(datas){
        this.detail = datas;
    }

    async reloadData(email){
        let url =  process.env.REACT_APP_API_URL;

        await fetch(url)
        .then((response) => response.json())
        .then((json) => {
          this.setDetail(json);
          this.setData(this.detail,email);
        })
        .catch((error) => console.log(error))
        .finally(() => {})
    }


    getBookBygenre(data,genre){
        const genreBook = [];

        data.map((item)=>{
            if(item.Category == genre){
                genreBook.push(item);
            }
        });

        this.byGenre = genreBook;
        return genreBook;
    }

    getByGenreInstance(){
        const genre = this.byGenre[0].Category;

        this.getBookBygenre(this.detail,genre);

        return this.byGenre;
    }

    getData(){
        return this.detail;
    }

    getBookmarked(){
        return this.bookmarked;
    }

    getSearch(data,key){
        const searchBook = [];

        if(key == ''){
            return this.detail;
        }

        data.map((item)=>{
                if(item.Title.toLowerCase().indexOf(key.toLowerCase()) > -1){
                    searchBook.push({
                        BookID: item.BookID,
                        Title: item.Title,
                        CoverImage: item.CoverImage,
                        Content:item.Content,
                        Description:item.Description,
                        Bookmark: item.Bookmark,
                        isBookmarked: item.isBookmarked,
                        Category: item.Category,
                    });
                }
        });

        return searchBook;
    }
}