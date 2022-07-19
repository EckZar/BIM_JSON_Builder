class JSONIfCondition{
  if: Array<Object>;
  then: string;
  

  constructor(){
    this.if = []
    this.then = ''
  }

  set addCondition(JSONConditionBlock: object){
    this.if.push(JSONConditionBlock);
  }

  set addThenResult(then: string){
    this.then = then;
  }
  
}