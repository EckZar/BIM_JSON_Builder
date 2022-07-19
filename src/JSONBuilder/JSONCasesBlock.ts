class JSONCasesBlock{
  field: string;
  value: any;   

  constructor(newColumnName: string){
    this.field = newColumnName
    this.value = {
            "handler": "switch",
            "cases": []
          }
               
  }

  set addCase(JSONCaseBlock: object){
    this.value.cases.push(JSONCaseBlock);
  }

}