//
//
//  dragon-grid.js
//
//  Dragon Grid
//  
//  v1.0.0
//  Terry Rosen
//  https://github.com/tcrosen/dragon-grid
//
//  A jQuery grid plugin built on Twitter Bootstrap...and it breathes fire.
//
//

;

(function($, window, document, undefined) {

    //-------------------------------------------------------------------------------------
    //
    //  Plugin declaration & default options
    //
    var dragonGrid = 'dragonGrid',
        defaults = {
            ajax: $.extend(true, {}, $.ajaxSettings, {
                data: {
                    page: 1,
                    maxRows: 10,
                    orderBy: '',
                    where: ''
                }
            }),
            colDefaults: {
                field: null,
                header: null,
                sortable: true,
                sortDir: 'asc'
            },
            cols: [],
            cssClass: 'table table-striped',
            source: []
        };

    //-------------------------------------------------------------------------------------
    //
    //  Constructor
    //

    function DragonGrid(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.cols = [];
        this.isRemoteData = false;
        this.init();
        this.listen();
    }

    DragonGrid.prototype = {

        //-------------------------------------------------------------------------------------------
        //
        //  Initialize the grid
        //
        init: function() {
            this.$element.addClass(this.options.cssClass);
            this.loadData($.proxy(this.createGrid, this));
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Load the data source
        //
        loadData: function(callback) {
            var that = this;

            // If a local datasource was specified use it, otherwise load from remote source
            //  This is done first because if no columns are included in the options the datasource is used to define them 
            if (that.options.source.length > 0) {
                callback();
            } else {
                that.isRemoteData = true;
                that.loadRemoteData(function(resp) {
                    that.options.source = resp.data || resp;
                    callback();
                });
            }
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Retrieve data from remote source
        //
        loadRemoteData: function(success) {
            $.ajax({
                type: this.options.ajax.type,
                url: this.options.ajax.url,
                data: this.options.ajax.data,
                dataType: this.options.ajax.dataType,
                success: success
            });
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Run the various pieces required to create the grid object
        //
        createGrid: function() {
            this.defineCols();
            this.renderHeader();
            this.renderBody();
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Defines the grid columns
        //  If no columns were defined, loop through the first datasource object properties and create them
        //
        defineCols: function() {
            var that = this;

            if (!that.options.cols.length) {
                for (var prop in that.options.source[0]) {   
                    that.options.cols.push({ field: prop });
                }
            }

            $(that.options.cols).each(function() {
                var col = this;
                col.header = this.header || that.toCamel(this.field);
                col = $.extend({}, that.options.colDefaults, this);
                that.cols.push(col);
            });
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Render the table header
        //
        renderHeader: function() {
            var $header = this.$element.find('thead');

            if ($header.length > 0) {
                $header.empty();
            } else {
                $header = $('<thead></thead>');
            }

            $.map(this.cols, function(col, i) {
                var $col;

                if (col.sortable) {
                    $col = $('<th data-field="' + col.field + '"><a href="#">' + (col.header || col.field) + '</a>&nbsp; <i></i></th>');
                } else {
                    $col = $('<th data-field="' + col.field + '">' + (col.header || col.field) + '</th>');
                }

                $header.append($col);
            });

            this.$element.append($header);
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Render the table body
        //
        renderBody: function() {
            var that = this;

            var $tbody = this.$element.find('tbody');

            if ($tbody.length > 0) {
                $tbody.empty();
            } else {
                $tbody = $('<tbody></tbody>');
            }

            $(that.options.source).each(function(i, obj) {
                var $row = $('<tr id="' + (that.options.rowIdentifier ? obj[that.options.rowIdentifier] : 'dragon-grid-row-' + i) + '"></tr>');

                $(that.cols).each(function(x, col) {
                    $row.append('<td>' + obj[col.field] + '</td>');
                });

                $tbody.append($row);
            });

            that.$element.append($tbody);
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Sorts the local datasource or retrieves remote source with new params
        //
        sorter: function(field, dir) {
            var that = this;

            if (that.isRemoteData) {
                that.options.ajax.data.orderBy = field + ' ' + dir;
                that.loadRemoteData(function(resp) {
                    that.options.source = resp.data || resp;
                    that.renderBody();
                });
            } else {
                that.options.source.sort(that.localSorter(field, dir));
                that.renderBody();
            }
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Custom client sorter for a local dataset
        //
        localSorter: function(property, dir) {
            if (dir == 'desc') {
                return function(a, b) {
                    return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
                }
            } else {
                return function(a, b) {
                    return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                }
            }
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Listens for user actions
        //
        listen: function() {
            this.$element.on('click', 'thead th a', $.proxy(this.headerClick, this));
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Column header click
        //
        headerClick: function(e) {
            e.preventDefault();

            var $th = $(e.currentTarget).parent();

            if ($th.attr('data-sort-dir') === 'asc') {
                $th.attr('data-sort-dir', 'desc');  
                $th.find('i').attr('class', 'icon-chevron-down');              
            } else {
                $th.attr('data-sort-dir', 'asc');
                $th.find('i').attr('class', 'icon-chevron-up');
            }            

            this.sorter($th.attr('data-field'), $th.attr('data-sort-dir'));
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Utils
        //
        toCamel: function(str) {
            return str.replace(/(?:^|\s)\w/g, function(match) {
                return match.toUpperCase();
            });
        }
    };

    $.fn[dragonGrid] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + dragonGrid)) {
                $.data(this, 'plugin_' + dragonGrid, new DragonGrid(this, options));
            }
        });
    }

})(jQuery, window, document);
