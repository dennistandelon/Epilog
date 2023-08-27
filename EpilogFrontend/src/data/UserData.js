export default class UserData{
    static user = null;

    detail = null;

    static getUser(){
        if(!this.user){
            this.user = new UserData();
        }
        return this.user;
    }

    setData(loggedUser){
        this.detail = loggedUser;
    }

    getData(){
        return this.detail;
    }

}