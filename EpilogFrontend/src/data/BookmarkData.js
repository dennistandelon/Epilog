export default class BookmarkData{
    static book = null;

    detail = null;

    static getBookmark(){
        if(!this.book){
            this.book = new BookmarkData();
        }
        return this.book;
    }

    setData(datas, email){
        const dataContainer = datas;

        const selected = [];

        dataContainer.map((item)=>{
            let isBookmarked = false;
            if(item.Bookmark.indexOf(email) > -1){
                isBookmarked = true;
            }
            selected.push({
                BookID: item.BookID,
                Title: item.Title,
                CoverImage: item.CoverImage,
                Content:item.Content,
                Description:item.Description,
                Bookmark: item.Bookmark,
                isBookmarked: isBookmarked,
            })
        })

        this.detail = selected;
    }

    setDetail(datas){
        this.detail = datas;
    }

    async reloadData(email){
        let apiURL =  process.env.REACT_APP_BOOKMARK_API;

        console.log(email);
        let url = apiURL + email;
        await fetch(url)
        .then((response) => response.json())
        .then((json) => {
          this.setDetail(json);
          this.setData(this.detail,email);
        })
        .catch((error) => console.log(error))
        .finally(() => {console.log("finish")})
    }


    getData(){
        return this.detail;
    }

}