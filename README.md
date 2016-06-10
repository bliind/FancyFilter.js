# FancyFilter.js
A super simple way to filter items in on a web page.

### Simple Usage Example
```
<script>
    var ffPeople = new FancyFilter();
    ffPeople.setInputEvent('#ffInput');
    ffPeople.subjectSelector = '#people tbody tr';
    ffPeople.columnHeaderSelector = '#people thead th';
    ffPeople.resultCountOutputSelector = '#peopleCount';
    ffPeople.filter();
</script>
```
