all: styler-tm.js

styler.js: styler.coffee
	coffee --compile styler.coffee

style.css: style.styl
	stylus style.styl

styler-tm.js: styler.js package.coffee style.css
	coffee package.coffee
