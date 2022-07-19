function menu(){
    SpreadsheetApp.getUi()
    .createMenu('__MENU__')
    .addItem('st_ Построить JSON на базе текущего листа', 'updateJSONDocument')
    .addItem('_short Сгруппировать работы', 'groupJobs')
    .addToUi();
}