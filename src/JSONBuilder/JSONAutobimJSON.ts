class AutobimJSON{

    AutobimJSON: {};

    constructor(){
        this.AutobimJSON = {};
    }

    set addParam(param: any){
        this.AutobimJSON = {...this.AutobimJSON, ...param};
    }

    get getAutobimJSON(){
        return this.AutobimJSON;
    }
        
}