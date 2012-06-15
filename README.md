Dragon Grid (ALPHA)
===============

v1.0.0 (June 2012)<br />
Terry Rosen [@rerrify](https://twitter.com/rerrify)

A jQuery grid plugin built on Twitter Bootstrap...made from real dragons.<br />



Required
-----------------
* Twitter Bootstrap 2.0.x
* jQuery 1.7.x

Installation
-----------------
1) Download [Bootstrap](https://github.com/twitter/bootstrap) & [jQuery](http://docs.jquery.com/Downloading_jQuery)

2) Download this plugin.

- [ZIP](https://github.com/tcrosen/dragon-grid/zipball/master)
- [Clone in Windows](github-windows://openRepo/https://github.com/tcrosen/dragon-grid) 
- `git clone git://github.com/tcrosen/dragon-grid.git`

3) Include files in your HTML. The minimum required for this plugin are:

    <link href="/path/to/bootstrap.css" rel="stylesheet">
    <script src="/path/to/jquery.js" type="text/javascript"></script>
    <script src="/path/to/dragon-grid.js" type="text/javascript"></script>

4) Execute the plugin:

    $(myTable).dragonGrid(options);


Why did you create another grid plugin? 
-----------------

Because I'm tired of all these grids with complicated configurations and/or bloated features that I never use.
I wanted something small, **simple** and elegant.  Hopefully you'll agree I've achieved that.

**How simple is it?**

	var mySource = [{ id: 1, name: 'Terry'}, { id: 2, name: 'Mark'}, { id: 3, name: 'Jacob'}];

	$('#myTable').dragonGrid({
		source: mySource
	});

**That looks way too simple, what could it possibly produce?**

![wtf](https://github.com/tcrosen/dragon-grid/raw/master/docs/basic.png)

**Decent, can you sort that shizzle?**

![wtf](https://github.com/tcrosen/dragon-grid/raw/master/docs/basic_sorted.png)

![wtf](https://github.com/tcrosen/dragon-grid/raw/master/docs/basic_sorted_desc.png)

**Wow! WTF did this magical grid do to make all that happen?**

1. Applied the Bootstrap styling of `table table-striped`.

Good idea, most people would probably prefer alternate row styling anyways.  That's one less option I have to configure.

2. No columns were specified, so it used the property names with camel casing as headers.

Camel casing!  Genius!  Now if I want to be incredibly lazy I can just use the data fields. 

3. Sorting functionality was added.

By default the grid makes each column sortable.  If you supply a local dataset it handles the sorting for you.  Otherwise if you use a remote data source it passes an *order by* statement (more on this in documentation).
