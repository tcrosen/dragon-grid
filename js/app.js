var data = [{
        id: 1,
        name: 'Terry'
    }, {
        id: 2,
        name: 'Mark'
    }, {
        id: 3,
        name: 'Jacob'
    }, {
        id: 4,
        name: 'Joe'
    }, {
        id: 5,
        name: 'Jason'
    }, {
        id: 6,
        name: 'Zeus'
    }];

$(function() {
    $('#test-grid').dragonGrid({
        cssClass: 'table table-striped',
        cols: [{ field: 'id', header: 'ID' }, { field: 'name', header: 'Name' }],
        ajax: {
            type: 'GET',
            url: 'remote.json',
            dataType: 'json'
        }
    });
});
