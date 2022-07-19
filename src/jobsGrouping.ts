function getUniqueJobs(){
    let thenOperator = mainActive.getRange(2, 2, 1, mainActive.getLastColumn()).getValues()[0].indexOf('then');
    Logger.log(thenOperator);
    let jobsCol = mainActive.getRange(2, 2, 1, thenOperator).getValues().map(e => e[0]);
    return [...new Set(jobsCol)];
}

function groupJobs(){
    
    if(mainActive.getName().indexOf('_short') < 0)
    {
        throw Error('You are able to group rown only over statement "..._short" sheets');
    }

    let rulesArray = mainActive.getRange(4, 1, mainActive.getLastRow() - 3, mainActive.getLastColumn()).getValues();

    let operators = mainActive.getRange(2, 2, 1, mainActive.getLastColumn()).getValues()[0];
    let isMARules = mainActive.getRange(1, 2, 1, mainActive.getLastColumn()).getValues()[0];

    let classicRulesArray = groupJobsByClassicRules(rulesArray.filter(rule => !rule[0]), operators, isMARules);
    let advancedRulesArray = groupJobsByAdvancedRules(rulesArray.filter(rule => rule[0]), operators, isMARules);

    let commonArray = [
        ...classicRulesArray,
        ...advancedRulesArray
    ];

    commonArray =deleteDuplicates(commonArray);

    mainActive.getRange(4, 1, mainActive.getLastRow() - 3, mainActive.getLastColumn()).clear();
    mainActive.getRange(4, 1, commonArray.length, commonArray[0].length).setValues(commonArray);

}

function groupJobsByClassicRules(classicRulesArray: Array<Array<string>>, operators: Array<string>, isMARules: Array<string>){

    let thenCol = operators.indexOf('then') + 1;
    Logger.log(thenCol);

    for(let w = 0; w < 10; w++)
    {
        for(let i = 0; i < classicRulesArray.length; i++)
        {
            if(!classicRulesArray[i]){continue}
            for(let j = i + 1; j < classicRulesArray.length; j++)
            {
                if(classicRulesArray[i][thenCol] == classicRulesArray[j][thenCol])
                {   

                    let isCompareable = compareClassicRulesArrays(classicRulesArray[i], classicRulesArray[j], isMARules);

                    if(!isCompareable){continue}

                    for(let q = 0; q < isMARules.length; q++)
                    {
                        if(isMARules[q] && operators[q] != 'then')
                        {   
                            classicRulesArray[i][q+1] += `|${classicRulesArray[j][q+1]}`;                       
                        }
                    }

                    classicRulesArray[j] = [];

                }
            }
        }
    }
    
    Logger.log(classicRulesArray);

    return classicRulesArray.filter(row => row.length == classicRulesArray[0].length);

}

function groupJobsByAdvancedRules(advancedRulesArray: Array<Array<string>>, operators: Array<string>, isMARules: Array<string>){

    let thenCol = operators.indexOf('then') + 1;
    for(let w = 0; w < 10; w++)
    {
        for(let i = 0; i < advancedRulesArray.length; i++)
        {
            if(!advancedRulesArray[i]){continue}
            for(let j = i + 1; j < advancedRulesArray.length; j++)
            {
                if(advancedRulesArray[i][thenCol] == advancedRulesArray[j][thenCol])
                {
                    let isCompareable = compareAdvancedRulesArrays(advancedRulesArray[i], advancedRulesArray[j]);
                    
                    if(!isCompareable){continue}

                    for(let q = 0; q < isMARules.length; q++)
                    {
                        if(operators[q] != 'then')
                        {
                            advancedRulesArray[i][q+1] += `|${advancedRulesArray[j][q+1]}`;                       
                        }                    
                    }

                    advancedRulesArray[j] = [];

                }
            }
        }
    }
    
    Logger.log(advancedRulesArray);

    return advancedRulesArray.filter(row => row.length == advancedRulesArray[0].length);

}

function deleteDuplicates(array: Array<Array<string>>){
    for(let i = 0; i < array.length; i++)
    {
        for(let j = 0; j < array[i].length; j++)
        {
            try{
                if(array[i][j].indexOf('|') >= 0)
                {
                    array[i][j] = unique(array[i][j]);
                }
            } catch(e) {
                Logger.log(i);
                Logger.log(j);
                Logger.log(array[i]);
                Logger.log(array[i][j]);
                Logger.log(e);
            }
        }
    }

    return array;

}

function unique(string: string) {
    let arr = string.split('|').filter(e=>e);
    string = [...new Set(arr)].join('|');
    return string;
}

function compareClassicRulesArrays(arrOne: Array<string>, arrTwo: Array<string>, isMARules: Array<string>){

    for (let i = 1; i < arrOne.length; i++) {
        if (isMARules[i - 1]) {
            if (arrOne[i] == '' && arrTwo[i] == '') {
                continue;
            }

            if (arrOne[i] == '' || arrTwo[i] == '') {
                return false;
            }
        }
    }
    return true;
}

function compareAdvancedRulesArrays(arrOne: Array<string>, arrTwo: Array<string>){

    for (let i = 1; i < arrOne.length; i++) {

        if (arrOne[i] == '' && arrTwo[i] == '') {
            continue;
        }

        if (arrOne[i] == '' || arrTwo[i] == '') {
            return false;
        }
    }
    
    return true;
}