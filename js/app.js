var localData = [{
    "id": 1,
    "name": "Terry"
}, {
    "id": 2,
    "name": "Mark"
}, {
    "id": 3,
    "name": "Jacob"
}, {
    "id": 4,
    "name": "Joe"
}, {
    "id": 5,
    "name": "Jason"
}, {
    "id": 6,
    "name": "Zeus"
}];

function localSorter(property, dir) {
    if (dir == 'desc') {
        return function(a, b) {
            return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        }
    } else {
        return function(a, b) {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
    }
}

$(function() {
/*    $('#test-grid').dragonGrid({
        cssClass: 'table table-striped',
        cols: [{
            field: 'id',
            header: 'ID',
            sortable: false
        }, {
            field: 'name'
        }],
        source: localData
    });*/

    $.mockjax({
        url: '/people/list',
        response: function(settings) {
            console.log(settings)
            this.responseText = {
                data: localData.sort(localSorter(settings.data.orderBy.split(' ')[0], settings.data.orderBy.split(' ')[1]))
            };
        }
    });

    $('#test-grid').dragonGrid({
        cssClass: 'table table-striped',
        cols: [{
            field: 'id',
            header: 'ID',
            sortable: false
        }, {
            field: 'name'
        }],
        ajax: {
            type: 'POST',
            url: '/people/list'
        }
    });
});
