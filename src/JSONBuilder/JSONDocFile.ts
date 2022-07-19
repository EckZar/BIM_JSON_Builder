function updateJSONDocument(){

    let buldedJSONText = buildJSONWithJSON_additional_entranceSheetData();

    let mainActiveSheetName = mainActive.getSheetName();
    let jsonDocId = getJSONDocIdBySheetName(mainActiveSheetName);

    if(jsonDocId)
    {
        pasteJSONToDoc(buldedJSONText, jsonDocId);
    } else {
        
        let newDoc = createJSONDoc(mainActiveSheetName);
        let newDocId = newDoc.getId();
        let newDocUrl = newDoc.getUrl();
        
        updateJSONDocInfo([[
            mainActiveSheetName,
            newDocUrl,
            newDocId
        ]]);

        pasteJSONToDoc(buldedJSONText, newDocId);
        moveFileToFolder(newDocId, JSONS_FOLDER_ID);
    }
}

function isJSONDocExist(docId: string){
   DocumentApp.openById(docId);
}

function pasteJSONToDoc(jsonText: string, JSONDocId: string){
    DocumentApp.openById(JSONDocId).getBody().setText(jsonText);
}

function getJSONDocIdBySheetName(sheetName:string, docIdCol: number = 2){
    if(mainJSONRulesSheet)
    {
        let values = mainJSONRulesSheet.getRange(1, 1, mainJSONRulesSheet.getLastRow(), 3).getValues()
        .filter(doc => doc[0] == sheetName)
        
        if(values.length > 0 )
        {
            return values[0][docIdCol];
        } else {
            return '';
        }
    } else {
        throw Error('Can\'t find JSONRules sheet!')
    }
}

function getJSONDocURLBySheetName(sheetName:string, docURLCol: number = 2){
    if(mainJSONRulesSheet)
    {
        let values = mainJSONRulesSheet.getRange(1, 1, mainJSONRulesSheet.getLastRow(), 3).getValues()
        .filter(doc => doc[0] == sheetName)
        
        if(values.length > 0 )
        {
            return values[0][docURLCol];
        } else {
            return '';
        }
    } else {
        throw Error('Can\'t find JSONRules sheet!')
    }
}

function createJSONDoc(documentName: string){
    return DocumentApp.create(documentName);
}   

function updateJSONDocInfo(valuesArray: Array<Array<string>>){
    if(mainJSONRulesSheet)
    {
        mainJSONRulesSheet.getRange(mainJSONRulesSheet.getLastRow() + 1, 1, 1, 3).setValues(valuesArray)
    } else {
        throw Error('Can\'t find mainJSONRulesSheet sheet!');
    }
} 

function moveFileToFolder(fileId:string, folderid:string){
    let parentFolder = DriveApp.getFolderById(folderid);
    DriveApp.getFileById(fileId).moveTo(parentFolder);
}