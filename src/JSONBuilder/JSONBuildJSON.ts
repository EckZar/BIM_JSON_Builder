function buildJSONWithJSON_additional_entranceSheetData() {
    
    if(mainActive.getName().indexOf('st_') < 0)
    {
        throw Error('You are able to start that script only over statement(st_...) sheet');
    }

    let isMARules = mainActive.getRange(1, 2, 1, mainActive.getLastColumn()).getValues()[0];
    let operators = mainActive.getRange(2, 2, 1, mainActive.getLastColumn()).getValues()[0];
    let columnsNames = mainActive.getRange(3, 2, 1, mainActive.getLastColumn()).getValues()[0];

    let isAdvancedRulesCol = mainActive.getRange(4, 1, mainActive.getLastRow()-3, 1).getValues();

    let dataRange = mainActive.getRange(4, 2, mainActive.getLastRow()-3, mainActive.getLastColumn()-1).getValues();

    let colName = columnsNames[operators.indexOf('then')];

    let autoBIMJSon = new AutobimJSON();

    let additionalJSONBlock = new JSONAdditionalBlock();

    let casesBlock = new JSONCasesBlock(colName);

    let priorityBlock = new JSONPriorityBlock();
    priorityBlock.addPriorityColumn = colName;

    dataRange.forEach((values, i) => {

        let conditions = new JSONIfCondition();

        values.forEach((value, j) => {
            
            if(isMARules[j] && value && operators[j] != 'then')
            {   

                conditions.addCondition =  {
                                            field: columnsNames[j],
                                            operator: operators[j],
                                            value: value
                                        };
            }
            
            if(isAdvancedRulesCol[0][i] && !isMARules[j] && value && operators[j] != 'then')
            {                
                conditions.addCondition = {
                                            field: columnsNames[j],
                                            operator: operators[j],
                                            value: value
                                        };
            }

            if(operators[j] == 'then'){
                conditions.addThenResult = value;
            }

        })

        casesBlock.addCase = conditions;

    })

    additionalJSONBlock.addNewBlockIntoAdditionalJSON = casesBlock;

    autoBIMJSon.addParam = priorityBlock;

    autoBIMJSon.addParam = additionalJSONBlock;

    

    Logger.log(autoBIMJSon);

    let buildedJSON = JSON.stringify(autoBIMJSon.getAutobimJSON, null, 2);


    
    return buildedJSON;

}