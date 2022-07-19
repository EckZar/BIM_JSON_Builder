class JSONPriorityBlock{

    priority: Array<string>;

    constructor(){
        this.priority = [];
    }

    set addPriorityColumn(priorityColumnName: string){
        this.priority.push(priorityColumnName);
    }


}