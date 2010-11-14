Ext.onReady(function(){

	// Read-only MixedCollection containing defined fields for stored records
	var fields = [
		{
			name : 'text',
			mapping : 'text'
		},
		{
			name : 'image',
			mapping : 'profile_image_url'
		},
		{
			name : 'user',
			mapping : 'from_user'
		}
	];
	
	// Pulls the data from the datasource so it can be used by a datastore
	var proxy =  new Ext.data.ScriptTagProxy({
		url : 'http://search.twitter.com/search.json?q=nettuts', // from%3Amb2o	
	});
	
	// JsonReader will be automagically configured. It grabs the raw data and organizes it
	var store = new Ext.data.JsonStore({
		proxy : proxy,
		fields : fields,
		baseParams : {
			rpp : 10
		},
		root : 'results',
		autoLoad : true
	});		
	
	var panel = new Ext.Panel({
	    id : 'twitter-view',
	    frame : true,
    	layout: 'fit',
	    collapsible : true,
	    layout : 'fit',
	    title : 'Twitter Example',
	    autoScroll : true,
	    
	    items : new Ext.DataView({
	        store : store,
	        autoScroll : true,
	        tpl : new Ext.XTemplate(
				'<ul id="tweets">',
					'<tpl for=".">',
						'<li class="tweet">',
							'<img class="profile-image" src="{image}" />',
							'<h2>{user}</h2>',
							'<p>{text}</p>',
						'</li>',
					'</tpl>',
				'</ul>'
			),
	        autoHeight : true,
	        multiSelect : true,
	        overClass : 'x-view-over',
	        itemSelector : 'li',
	        emptyText : 'No tweets to display'
	    }),
	    tbar : [
			{
				iconCls : 'refresh',
				text : 'Refresh',
				handler : function() {
					store.load();
				}
			}	    
	    ]
	});
	
	// Render our panel to the document.body
	panel.render(Ext.getBody());
		
});