
var FancyFilter = function(data)
{
    // Cool way to avoid porblems of `this` being different it nested functions
    var self = this;

    // Configuration
    self.tableName;
    self.inputName;
    self.inputText;
    self.argumentDelimiter = ",";
    self.excludeDelimiter = "!";
    self.columnDelimiter = ":";

    // Return Value(s)
    self.resultCount = 0;

    self.getRows = function(table)
    {
        var body = table.getElementsByTagName('tbody');
        var rows = body[0].getElementsByTagName('tr');
        return rows;
    }

    self.getColumns = function(row)
    {
        var columns = row.getElementsByTagName('td');
        return columns;
    }

    self.update = function()
    {
        self.inputText = document.getElementById(self.inputName).value.toLowerCase();
        //console.log("update: " + self.inputText);

        var table = document.getElementById(self.tableName);
        var rows = self.getRows(table);

        var rowInterval = 0;
        for(; rowInterval < rows.length ; rowInterval++) {

            var fullRowText = '';
            var columns = self.getColumns(rows[rowInterval]);
            var columnInterval = 0
            for(; columnInterval < columns.length ; columnInterval++) {
                fullRowText += ' ' + columns[columnInterval].innerHTML;
            }

            fullRowText = fullRowText.toLowerCase();

            var regexObject = new RegExp(self.inputText, "g");
            var regexResult = fullRowText.match(regexObject);
            if (regexResult !== null) {
                rows[rowInterval].style.display = "";
            } else {
                rows[rowInterval].style.display = "none";
            }
        }
    }

    self.setInputEvent = function()
    {
        document.getElementById(self.inputName).oninput = function() {
            self.update();
        };
    }
}
