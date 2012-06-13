//
//  dragon-grid.js
//
//  Dragon Grid
//  
//  v1.0.0
//  Terry Rosen
//  https://github.com/tcrosen/dragon-grid
//
//  A jQuery grid plugin that breathes fire and is built on Twitter Bootstrap.
//
//

;

(function($, window, document, undefined) {

    //-------------------------------------------------------------------------------------
    //
    //  Default options
    //
    var dragonGrid = 'dragonGrid',
        defaults = {
            cssClass: 'table',
            rowTmpl: '<tr><td>{{ID}}</td><td>{{Name}}</td></tr>',
            dataSource: []
        };

    //-------------------------------------------------------------------------------------
    //
    //  Constructor
    //

    function DragonGrid(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);

        this.init();
    }

    DragonGrid.prototype = {

        init: function() {
            this.$element.addClass(this.options.cssClass);
            this.loadData(this.$element, this.options);
        },

        loadData: function(el, options) {
            var that = this,
                template = Hogan.compile(options.rowTmpl);
            $tbody = el.find('tbody');

            $tbody.empty();

            $(options.dataSource).each(function() {
                $tbody.append(template.render(this));
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
