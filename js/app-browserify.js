// es5 polyfills, powered by es5-shim
require("es5-shim")

// es6 polyfills, powered by babel
require("babel/polyfill")

global.jQuery = require('jquery');


var Promise = require('es6-promise').Promise
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

require("bootstrap")
// just Node?
// var fetch = require('node-fetch')
// Browserify?
// require('whatwg-fetch') //--> not a typo, don't store as a var

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
    // start app
    // new Router()
// }

//////------------models---------------//////
var PageModel = new Backbone.Model.extend({

});
//////------------collection-------------//////
var PageCollection = new Backbone.Collection.extend({
	model: PageModel
});
//////------------views-----------------//////
var BaseView = Backbone.View.extend({
    el: '#main-div',

    initialize: function(){
    	this.render();
    },

    render: function() {
    	this.$el.html(this.baseTemplate({}));
    },

    baseTemplate: _.template($('#base-template').html())
});

//!!!!!!!!!!!!!!!!! skills view !!!!!!!!!!!!!!!!!!//
var SkillsNestedView = Backbone.View.extend({
    el: '#skills-wrapper', 

    render: function() {
        this.$el.html(this.allSkillsTemplate({}));
    },

    allSkillsTemplate: _.template($('#all-skills-template').html())
});

var AllSkillsView = Backbone.View.extend({
    el: '#content-container', 

    initialize: function() {
    	this.$el.html(this.skillsContainerTemplate({}));

        var skillsNestedView = new SkillsNestedView();
        skillsNestedView.render();
    },

    skillsContainerTemplate: _.template($('#skills-container-template').html())
});

//!!!!!!!!!!!!!!!!! about view !!!!!!!!!!!!!!!!!!!!!!!!!!//
var AboutNestedView = Backbone.View.extend({
    el: '#about-wrapper', 

    render: function() {
        this.$el.html(this.aboutTemplate({}));
    },

    aboutTemplate: _.template($('#about-template').html())
});

var AboutView = Backbone.View.extend({
    el: '#content-container', //<----correct

    initialize: function() {
    	this.$el.html(this.aboutContainerTemplate({}));

        var aboutNestedView = new AboutNestedView();
        aboutNestedView.render();
    },

    aboutContainerTemplate: _.template($('#about-container-template').html())
});

//////------------router----------------//////
var SiteRouter = Backbone.Router.extend({
    routes: {
    	"about": "about",
        "*default": "skills"
    },

    skills: function(){
    	var baseView = new BaseView();
    	var allSkillsView = new AllSkillsView();
    },

    about: function(){
    	var baseView = new BaseView();
    	var aboutView = new AboutView();
    },

    initialize: function(){
        Backbone.history.start();
    }
});

var siteRouter = new SiteRouter();