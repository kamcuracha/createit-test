var elixir = require('laravel-elixir');

// Uncomment below for gulp --production 
//elixir.config.sourcemaps = false;

elixir((mix) => {
	mix
	.sass('bootstrap-custom.scss', 'assets/css/bootstrap.css', 'assets/scss/vendor/bootstrap')
	.sass('basscss-custom.scss', 'assets/css/basscss.css', 'assets/scss/vendor/basscss')
	.sass('font-awesome.scss', 'assets/css/font-awesome.css', 'assets/scss/vendor/font-awesome')
	.sass('main.scss', 'assets/css/main.css', 'assets/scss')
});
