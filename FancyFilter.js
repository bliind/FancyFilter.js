
var FancyFilter = function(data)
{
    // Cool way to avoid porblems of `this` being different it nested functions
    var self = this;

    // Configuration
    self.subjectId;
    self.resultCountId;
    self.subjectType = 'table';
    self.inputName;
    self.argumentText;
    self.argumentDelimiter = ",";
    self.excludeDelimiter = "!";
    self.columnDelimiter = ":";

    // Gets an array of all the subjects to filter
    self.getSubjects = function()
    {
        var subject = document.getElementById(self.subjectId);
        self.subjectType = subject.tagName;

        if (self.subjectType === 'TABLE') {
            var body = subject.getElementsByTagName('tbody');
            var subjects = body[0].getElementsByTagName('tr');
        } else if(self.subjectType === 'UL') {
            var subjects = subject.getElementsByTagName('li');
        }

        return subjects;
    }

    // converts the subject to a single string
    self.formatSubject = function(subject)
    {
        var result = '';

        if (self.subjectType == 'TABLE') {
            var columns = subject.getElementsByTagName('td');
            var columnInterval = 0
            for(; columnInterval < columns.length ; columnInterval++) {
                result += ' ' + columns[columnInterval].innerHTML;
            }
        } else if(self.subjectType == 'UL') {
            var result = subject.innerHTML;
        }

        result = result.toLowerCase().trim();

        return result;
    }

    // Returns true or false if the subject should be hidden or not
    self.getMatchResult = function(arguments, haystack)
    {
        var result = false;

        var argumentInterval = 0;
        for (; argumentInterval < arguments.length ; argumentInterval++) {
            var argument = arguments[argumentInterval].trim();

            var regexObject = new RegExp(argument, "g");
            var regexResult = haystack.match(regexObject);

            if (regexResult == null) {
                result = false;
                break;
            } else {
                result = true;
            }
        }

        return result;
    }

    // Gets the array of arguments to use in the filter process
    self.getArguments = function()
    {
        if (self.argumentText === undefined) {
            var fullArgumentText = document.getElementById(self.inputName).value;
        } else {
            var fullArgumentText = self.argumentText;
        }

        var arguments = fullArgumentText.toLowerCase().trim().split(self.argumentDelimiter);

        return arguments;
    }

    // Preforms an update on the subject using the arguemntText
    self.update = function()
    {
        var resultCount = 0;

        var arguments = self.getArguments();

        var subjects = self.getSubjects();
        var subjectInterval = 0;
        for(; subjectInterval < subjects.length ; subjectInterval++) {
            var subject = subjects[subjectInterval];
            var fullSubjectText = self.formatSubject(subject);

            var matchResult = self.getMatchResult(arguments, fullSubjectText);
            if (matchResult) {
                subject.style.display = "";
                resultCount++;
            } else {
                subject.style.display = "none";
            }
        }
        self.updateResultCount(resultCount);
    }

    // Writes the count to the resultCountId element
    self.updateResultCount = function(resultCount)
    {
        if (self.resultCountId !== undefined) {
            document.getElementById(self.resultCountId).innerHTML = resultCount;
        }
    }

    // Appends an on input event on the for the input text box
    self.setInputEvent = function()
    {
        document.getElementById(self.inputName).addEventListener('input', self.update);
    }
}
