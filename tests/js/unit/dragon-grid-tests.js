$(function() {

    module("dragonGrid");

    test("should be defined on jquery object", function() {
        ok($(document.body).dragonGrid, 'method is defined');
    });

    test("should return element", function() {
        ok($(document.body).dragonGrid()[0] == document.body, 'document.body returned');
    });

    test("should return element when instantiated on table", function() {
        var $table = $('<table></table>');
        ok($table.dragonGrid().is('table'), 'table returned');
    });

    test("should not create thead with null source", function() {
        var $table = $('<table></table>');
        $thead = $table.dragonGrid().find('thead');
        ok($thead.length === 0, 'did not create thead');
    });

    test("should not create tbody with null source", function() {
        var $table = $('<table></table>');
        $tbody = $table.dragonGrid().find('tbody');
        ok($tbody.length === 0, 'did not create tbody');
    });

});
