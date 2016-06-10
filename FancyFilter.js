
var FancyFilter = function(data)
{
    // Added the contains method to the String
    String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

    // Cool way to avoid problems of `this` changing in anonymous functions
    var self = this;

    // User Configuration Options
    self.subjectSelector;
    self.columnHeaderSelector;
    self.resultCountOutputSelector;
    self.subjectExcludeClass = 'ffExclude',
    self.inputSelector;
    self.inputDelimiter = ',';
    self.inputExcludeDelimiter = '!',
    self.inputColumnDelimiter = ':',

    // "Public" proporties
    self.resultCount;

    // "Private" proporties
    self.subjectElementArray;
    self.columnHeaderElementArray;
    self.inputElement;
    self.inputContent;
    self.inputArray;
    self.columnHeaderArray = [];

    // Performs the actual filter logic
    self.filter = function(inputValue)
    {
        // TODO: add easy way to force a refresh of subjectElementArray
        if (typeof self.subjectElementArray === 'undefined') {
            self.setSubjectElementArray();
        }

        // TODO: Add easy way to override inputContent via Javascript
        self.inputContent = self.inputElement.value;

        self.inputArray = self.inputContent.toLowerCase().split(self.inputDelimiter);

        self.resultCount = 0;
        for (subjectInterval = 0; subjectInterval < self.subjectElementArray.length ; subjectInterval++) {
            var subjectElement = self.subjectElementArray[subjectInterval];
            var filterResult = self.testElement(subjectElement);

            if (filterResult) {
                subjectElement.style.display = '';
                self.resultCount++;
            } else {
                subjectElement.style.display = 'none';
            }
        }

        if (typeof self.resultCountOutputSelector !== 'undefined') {
            document.querySelector(self.resultCountOutputSelector).innerHTML = self.resultCount;
        }
    }

    // Creates the on input event on the text box
    self.setInputEvent = function(inputSelector)
    {
        if (typeof inputSelector !== 'undefined') {
            self.inputSelector = inputSelector;
        }

        self.inputElement = document.querySelector(self.inputSelector);
        self.inputElement.addEventListener('input', self.filter);
    }

    // Sets the array of subjects to filter
    self.setSubjectElementArray = function()
    {
        self.setColumnArray();
        self.subjectElementArray = document.querySelectorAll(self.subjectSelector);
    }

    // Acually tests the element if it matches any of the input arguments
    self.testElement = function(element)
    {
        var elementContent = element.innerText.toLowerCase().trim();

        // Checks if the element has the subjectExcludeClass and if so just stop and return true
        var containsExcudeClass = element.classList.contains(self.subjectExcludeClass);
        if (containsExcudeClass === true) { return true; }

        // Starts with result being false unless changed to true later
        var result = false;

        // Loops over all items in the input array
        for (inputInterval = 0; inputInterval < self.inputArray.length ; inputInterval++) {
            // formats the input value
            var input = self.inputArray[inputInterval].trim();

            // Checks for use of the inputColumnDelimiter character
            var inputContainsColumnDelimiter = input.contains(self.inputColumnDelimiter);
            if (inputContainsColumnDelimiter) {
                var inputColumnArray = input.split(self.inputColumnDelimiter);
                var columnName = inputColumnArray[0].trim();
                var matchingColumnIndex = self.columnHeaderArray.indexOf(columnName);
                // if the column name is valid  change the value of input and elementContent for the test
                if (matchingColumnIndex !== -1) {
                    input = inputColumnArray[1].trim();
                    elementContent = element.querySelectorAll('td')[matchingColumnIndex].innerText.toLowerCase().trim();
                }
            }

            // Checks for use of the inputExcludeDelimiter character
            if (input.substring(0, 1) == self.inputExcludeDelimiter) {
                var excludeMode = true;
                input = input.substring(1);
            } else {
                var excludeMode = false;
            }


            // tests to see if the input matches the elementContent
            var elementContentContainsInput = elementContent.contains(input);
            if (input != '') {
                if (!elementContentContainsInput && !excludeMode) {
                    result = false;
                    break;
                } else if (elementContentContainsInput && excludeMode) {
                    result = false;
                    break;
                } else {
                    result = true;
                }
            } else {
                result = true;
            }
        }

        return result;
    }

    // Sets the array of column headers if any are found
    self.setColumnArray = function()
    {
        // Reset the column array
        self.columnHeaderElementArray = document.querySelectorAll(self.columnHeaderSelector);

        // create an array of just the text from the columnHeaderSelector
        self.columnHeaderArray = [];
        for (headerInterval = 0; headerInterval < self.columnHeaderElementArray.length ; headerInterval++) {
            var columnText = self.columnHeaderElementArray[headerInterval].innerText.toLowerCase().trim();
            self.columnHeaderArray.push(columnText);
        }
    }
}
