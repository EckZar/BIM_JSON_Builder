class JSONAdditionalBlock{
  additional: Array<Object>;

  constructor(){
    this.additional = [];    
  }

  set addNewBlockIntoAdditionalJSON(blockArray: Object){
    this.additional.push(blockArray);
  }

  get getAdditionalJSONBlock(){
    return this;
  }

}