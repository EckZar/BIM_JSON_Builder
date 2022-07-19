const main = SpreadsheetApp.getActiveSpreadsheet();
const mainActive = main.getActiveSheet();

const mainJSONAddSheet = main.getSheetByName('JSON_additional_entrance');
const mainConfigSheet = main.getSheetByName('config.ini');

const mainJSONRulesSheet = main.getSheetByName('JSONRules');

const JSONS_FOLDER_ID = getConfigSheetValueByField('JSONS_FOLDER_ID');

const compareOperators = [
    '<='
];

const newRow = String.fromCharCode(10);