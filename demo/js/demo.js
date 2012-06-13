$(function() {
    var data = [{
        ID: 1,
        Name: 'Terry'
    }, {
        ID: 2,
        Name: 'Mark'
    }, {
        ID: 3,
        Name: 'Jacob'
    }];

    $('.dragon-grid').dragonGrid({
        cssClass: 'table table-striped',
        dataSource: data
    });
});
