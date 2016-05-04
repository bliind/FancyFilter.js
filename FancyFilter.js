
var FancyFilter = function(data)
{
    // Cool way to avoid porblems of `this` being different it nested functions
    var self = this;

    // Configuration
    self.subjectId;
    self.subjectType = 'table';
    self.inputName;
    self.inputText;
    self.argumentDelimiter = ",";
    self.excludeDelimiter = "!";
    self.columnDelimiter = ":";

    // Return Value(s)
    self.resultCount = 0;

    self.getSubjects = function()
    {
        var subject = document.getElementById(self.subjectId);
        self.subjectType = subject.tagName;

        if (self.subjectType == 'TABLE') {

            var body = subject.getElementsByTagName('tbody');
            var subjects = body[0].getElementsByTagName('tr');

        } else if(self.subjectType == 'UL') {
            var subjects = subject.getElementsByTagName('li');
        }

        return subjects;
    }

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

        result = result.toLowerCase();

        return result;
    }

    self.getMatchResult = function(needle, haystack)
    {
        var regexObject = new RegExp(needle, "g");
        var regexResult = haystack.match(regexObject);
        return regexResult;
    }

    self.update = function()
    {
        self.inputText = document.getElementById(self.inputName).value.toLowerCase();


        var subjects = self.getSubjects();

        var subjectInterval = 0;
        for(; subjectInterval < subjects.length ; subjectInterval++) {
            var subject = subjects[subjectInterval];
            if (self.subjectType == 'TABLE') {

            } else if(self.subjectType == 'UL') {
                var fullSubjectText = subject.innerHTML.toLowerCase();
            }

            var fullSubjectText = self.formatSubject(subject);

            var matchResult = self.getMatchResult(self.inputText, fullSubjectText);


            if (matchResult !== null) {
                subject.style.display = "";
            } else {
                subject.style.display = "none";
            }
        }
    }

    self.setInputEvent = function()
    {
        document.getElementById(self.inputName).addEventListener('input', self.update);
    }
}
