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
            cssClass: 'table',
            cols: [],
            dataSource: [],
            ajax: $.extend({}, $.ajaxSettings, {
                data: {
                    page: 1,
                    maxRows: 10,
                    orderBy: '',
                    where: ''
                }
            })
        };

    //-------------------------------------------------------------------------------------
    //
    //  Constructor
    //

    function DragonGrid(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.init();
        this.listen();
    }

    DragonGrid.prototype = {

        //-------------------------------------------------------------------------------------------
        //
        //  Initialize the grid
        //
        init: function() {
            var that = this;
            this.$element.addClass(this.options.cssClass);
            that.renderHeader();
            this.loadData(function(resp) {                
                that.renderBody(resp);
            });
        },

        loadData: function(success) {
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
        //  Render the grid
        //
        renderBody: function(dataSource) {
            var that = this;

            var $tbody = this.$element.find('tbody');

            if ($tbody.length > 0) {
                $tbody.empty();
            } else {
                $tbody = this.$element.append('<tbody></tbody>');
            }

            var data = dataSource.data || dataSource;
            $(data).each(function(i, obj) {
                var $row = $('<tr></tr>');

                $(that.options.cols).each(function(x, col) {
                    $row.append('<td>' + obj[col.field] + '</td>');
                });

                $tbody.append($row);
            });
        },

        renderHeader: function() {
            var $header = $('<thead></thead>');

            $.map(this.options.cols, function(col, i) {
                $header.append('<th data-field="' + col.field + '">' + (col.header || col.field) + '</th>');
            });

            this.$element.append($header);
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Listens for user events
        //
        listen: function() {
            this.$element.on('click', 'thead th', $.proxy(this.headerClick, this));
        },

        //-------------------------------------------------------------------------------------------
        //
        //  Handles clicking on the results list
        //
        headerClick: function(e) {
            var that = this;
            this.options.ajax.data.orderBy = $(e.currentTarget).attr('data-field');
            this.loadData(function(resp) {                
                that.renderBody(resp);
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
