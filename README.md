Dragon Grid (ALPHA)
===============

v1.0.0 (June 2012)<br />
Terry Rosen [@rerrify](https://twitter.com/rerrify)

A jQuery grid plugin built on Twitter Bootstrap...made from real dragons.<br />

Why did you create another grid plugin? 
-----------------

Because I'm tired of all these grids with complicated configurations and/or bloated features that I never use.
I wanted something small, **simple** and elegant.  Hopefully you'll agree I've achieved that.

**How simple is it?**

    <link href="bootstrap.css" rel="stylesheet">
    <script src="jquery.js"></script>
    <script src="dragon-grid.js"></script>

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

1. Applied the Bootstrap classes `table table-striped` cause I'm sure most people prefer alternating row styles by default.
2. No columns were specified, so it used the property names with camel casing as headers.  Ya that's right, camel casing.  Now you can be insanely lazy.
3. Sorting functionality was added.  By default the grid makes each column sortable.  If you supply a local dataset it handles the sorting for you.  Otherwise if you use a remote data source it passes an *order by* statement (more on this in documentation).
