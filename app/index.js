'use strict';

var path = require('path');

var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var _ = require('lodash');

var Gnomo = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	askFor: function () {
		var done = this.async();

		this.log(this.yeoman);
		this.log(chalk.magenta('You\'re using the awesome Gnomo generator.'));

		var prompts = [{
			name: 'name',
			message: 'Application name',
			default: path.basename(process.cwd())
		},{
			name: 'homepage',
			message: 'Application homepage',
			default: ''
		},{
			name: 'license',
			message: 'License',
			default: 'MIT'
		},{
			name: 'version',
			message: 'Version number',
			default: '1.0.0'
		},{
			name: 'authorName',
			message: 'Author\'s name:',
			default: 'The awesome Gnomo'
		},{
			name: 'sourceFolderName',
			message: 'Source folder name',
			default: 'src'
		},{
			name: 'primaryColor',
			message: 'Primary color (HEX)',
			default: '00427F'
		},{
			name: 'secondaryColor',
			message: 'Secondary color (HEX)',
			default: 'E5C100'
		},{
			name: 'primaryFont',
			message: 'Primary font (Google Font)',
			default: 'Droid+Serif:400'
		},{
			name: 'secondaryFont',
			message: 'Secondary Font (Google font)',
			default: 'Open+Sans:300,400,400italic,600'
		}];

		this.currentYear = (new Date()).getFullYear();

		this.prompt(prompts, function (props) {
			this.name = props.name;
			this.slugname = props.name.replace(' ', '_');
			this.homepage = props.homepage;
			this.license = props.license;
			this.version = props.version;
			this.authorName = props.authorName;

			this.primaryColor = (props.primaryColor.charCodeAt(0) == 35) 
				? props.primaryColor : '#' + props.primaryColor;

			this.secondaryColor = (props.secondaryColor.charCodeAt(0) == 35) 
				? props.secondaryColor : '#' + props.secondaryColor;

			this.sourceFolderName = props.sourceFolderName;

			// this used by Angular as app name
			// - replace all non-letters characters
			this.appName = _.trim(props.name.replace(/\W+/g, "").toLowerCase()); 

			var d = new Date();
			this.year = d.getFullYear();

			this.options = {

			};

			done();
		}.bind(this));
	},

	app: function () {
		this.mkdir(this.sourceFolderName + '/assets/images');
		this.mkdir(this.sourceFolderName + '/assets/js');
		this.mkdir(this.sourceFolderName + '/assets/styles');

		this.directory('views', this.sourceFolderName + '/views');
		this.directory('styles/modules', this.sourceFolderName + '/assets/styles/modules');

		this.copy('_package.json', 'package.json');
		this.copy('_gulpfile.js', 'gulpfile.js');
		this.copy('_bower.json', 'bower.json');
		this.copy('_bowerrc', '.bowerrc');
	}
});

module.exports = Gnomo;