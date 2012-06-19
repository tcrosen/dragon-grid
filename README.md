Dragon Grid
===============

v1.0.0<br />
Terry Rosen [@rerrify](https://twitter.com/rerrify)

A jQuery grid plugin built on Twitter Bootstrap...made from real dragons.<br />

Latest Update (June 19, 2012)
-------------------------

+ **Development status**: Current version is usable but very rough - **USE AT YOUR OWN RISK!**
+ **In progress**:  Unit tests and documentation before adding any new features.

Why did you create another grid plugin? 
-----------------

Because I'm tired of all these grids with complicated configurations and/or bloated features that I never use.
I wanted something small, *simple* and elegant.

How simple is it?
-----------------

    <link href="bootstrap.css" rel="stylesheet">
    <script src="jquery.js"></script>
    <script src="dragon-grid.js"></script>

	$('#myTable').dragonGrid({
		source: [{ id: 1, name: 'Terry'}, { id: 2, name: 'Mark'}, { id: 3, name: 'Jacob'}]
	});

	<table id="myTable">
    </table>

That looks way too simple, what does it produce?
-----------------

![wtf](https://github.com/tcrosen/dragon-grid/raw/master/docs/basic.png)

Decent, can you sort?
-----------------

![wtf](https://github.com/tcrosen/dragon-grid/raw/master/docs/basic_sorted_desc.png)

Cool, what went on there behind the scenes?
-----------------

1. Applied the Bootstrap classes `table table-striped` cause I'm sure most people prefer alternating row styles by default.
2. No columns were specified so it used the property names with camel casing as headers.  Built-in camel casing, now you can be insanely lazy.
3. Sorting functionality was added.  By default the grid makes each column sortable.  If you supply a local dataset it handles the sorting for you.  Otherwise if you use a remote data source it passes an *order by* statement (more on this in documentation).

What are some other options?
-----------------------------

Development is still ongoing, but as of this writing (see latest update date above) these are the options:

    	defaults = {

    		//
            //  Optional - can use a local datasource instead
            //
            //  Extends a jQuery object with your settings and jQuery AJAX defaults.
            //      Ya that's right, you don't have to learn a custom AJAX settings object to use this beast.
            //      The ajax.data custom object is used for passing paging/sorting params to the server query.
            //
            ajax: $.extend(true, {}, $.ajaxSettings, {
                data: {                    
                    page: 1,                    
                    maxRows: 10,
                    orderBy: '',
                    where: ''
                }
            }),

            //
            //  Optional - will use default values
            //
            //  Default values that will be applied to all columns, 
            //      specifying columns individually will overwrite these.
            //
            colDefaults: {
                field: null,
                header: null,
                sortable: true,
                sortDir: 'asc'
            },

            //
            //  Optional - will use data source properties & default values to generate columns
            //
            //  Specify columns individually with the same options as the colDefaults.  
            //      All values are optional except 'field'.
            //      
            //      Ex.  cols: [{ field: first_name, header: 'First Name' },
            //                  { field: phone, sortable: false }]
            //
            cols: [],

            //
            //  Optional - will use default value
            //
            //  Can add any class(es) you want to the table.
            //
            cssClass: 'table table-striped',

            //
            //  Optional - can use AJAX source instead 
            //                  you can also leave this empty but your grid will suck :(
            //
            //  If you specify a value here it will use this instead of the AJAX.
            //
            source: []
        };
