function getConfigSheetValueByField(field: String): string{

  let fields: Array<Array<string>>;

  if(mainConfigSheet)
  {
    fields = mainConfigSheet.getRange(1, 1, mainConfigSheet.getLastRow(), 2).getValues();
  } else {
    return '';
  }

  let searchValue = fields.filter(row => row[0] === field)[0][1];

  if(searchValue){
    return searchValue;
  } else {
    return '';
  }

}

