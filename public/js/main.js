var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines"				: "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about",
		"time"				: "time"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },
    
    time: function() {
    	if (!this.timeSummaryView) {
    		this.timeSummaryView = new TimeSummaryView();
    	}
    	$('#content').html(this.timeSummaryView.el);
    	this.headerView.selectMenuItem('time-menu');
    }
    

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView', 'TimeSummaryView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});