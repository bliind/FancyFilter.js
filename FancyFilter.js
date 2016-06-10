
var FancyFilter = function(data)
{
    // Added the contains method to the String
    String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

    // Cool way to avoid problems of `this` changing in anonymous functions
    var self = this;

    // User Configuration Options
    self.subjectSelector;
    self.subjectTableHeaderSelector;
    self.resultCountSelector;
    self.inputSelector;
    self.inputDelimiter = ',';
    self.inputExclude = '!',
    self.inputColumnDelimiter = ':',
    self.subjectExcludeClass = 'ffExclude',

    // "Public" proporties
    self.resultCount;

    // "Private" proporties
    self.subjectArray;
    self.subjectTableHeaderElements;
    self.inputElement;
    self.inputContent;
    self.inputArray;

    self.subjectColumnArray = [];

    //
    self.filter = function(inputValue)
    {
        // TODO: add easy way to force a refresh of subjectArray
        if (typeof self.subjectArray === 'undefined') {
            self.setSubjectArray();
        }

        // TODO: Add easy way to override inputContent via Javascript
        self.inputContent = self.inputElement.value;

        self.inputArray = self.inputContent.toLowerCase().split(self.inputDelimiter);

        self.resultCount = 0;
        var subjectInterval = 0;
        for (; subjectInterval < self.subjectArray.length ; subjectInterval++) {
            var subjectElement = self.subjectArray[subjectInterval];
            var filterResult = self.testElement(subjectElement);

            if (filterResult) {
                subjectElement.style.display = '';
                self.resultCount++;
            } else {
                subjectElement.style.display = 'none';
            }
        }

        if (typeof self.resultCountSelector !== 'undefined') {
            document.querySelector(self.resultCountSelector).innerHTML = self.resultCount;
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

    self.setSubjectArray = function()
    {
        self.subjectArray = document.querySelectorAll(self.subjectSelector);
    }

    self.testElement = function(element)
    {
        var elementContent = element.innerText.toLowerCase().trim();
        var containsExcudeClass = element.classList.contains(self.subjectExcludeClass);
        if (containsExcudeClass === true) { return true; }

        self.setSubjectColumnArray();

        var result = false;

        var inputInterval = 0;
        for (; inputInterval < self.inputArray.length ; inputInterval++) {
            var excludeMode = false;

            var input = self.inputArray[inputInterval].trim();

            // Checks for use of the inputColumnDelimiter character
            var inputContainsColumnDelimiter = input.contains(self.inputColumnDelimiter);
            if (inputContainsColumnDelimiter) {
                var inputColumnArray = input.split(self.inputColumnDelimiter);
                var columnName = inputColumnArray[0].trim();
                var matchingColumnIndex = self.subjectColumnArray.indexOf(columnName);
                if (matchingColumnIndex !== -1) {
                    input = inputColumnArray[1].trim();
                    elementContent = element.querySelectorAll('td')[matchingColumnIndex].innerText.toLowerCase().trim();
                }
            }

            // Checks for use of the inputExclude character
            if (input.substring(0, 1) == self.inputExclude) {
                excludeMode = true;
                input = input.substring(1);
            }

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

    self.setSubjectColumnArray = function()
    {
        self.subjectColumnArray = [];
        self.subjectTableHeaderElements = document.querySelectorAll(self.subjectTableHeaderSelector);
        var headerInterval = 0;
        for (; headerInterval < self.subjectTableHeaderElements.length ; headerInterval++) {
            var columnText = self.subjectTableHeaderElements[headerInterval].innerText.toLowerCase().trim();
            self.subjectColumnArray.push(columnText);
        }
    }
}

var ff = FancyFilter;
