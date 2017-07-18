/* -------------------------------------------
 *  GLOBAL MODULES, REQUIRE
/* ----------------------------------------- */
module.exports = function(grunt) {

	"use strict";

	grunt.initConfig({
		'sw-precache': {
			options: {
				cacheId: 'web-starter-kit',
				workerFileName: 'sw.js',
				verbose: true,
			},

			importScripts: [
				'assets/js/sw/sw-toolbox.js',
				'assets/js/sw/runtinme-caching.js',
			],
			'default' : {
				staticFileGlobs: [
					'assets/images/**/*',
					'assets/js/**/*.js',
					'assets/css/*.css',
					'*.{html, json}'
				],
				stripPrefix: '',
			},
			'develop': {
				staticFileGlobs: [],
			},
		},
		pkg: grunt.file.readJSON('package.json'),

		/* SVG-STORE CONFIGURATION
		/* --------------------------------------------------- */
		svgstore: {
			options: {
				prefix: "shape-",
				cleanup: false,
				svg: {
					style: "display: none;"
				}
			},
			default: {
				files: {
					"assets/images/svg-sprite/svg-defs.svg": ["assets/images-uncompress/svg-unsprite/*.svg"]
				}
			}
		},

		/* SVG-SPRITE CONFIGURATION
		/* --------------------------------------------------- */
		svg_sprite: {
			basic: {

				// target basics
				expand: true,
				cwd: 'assets/images-uncompress/svg-unsprite',
				src: ['**/*.svg'],
				dest: 'assets/images/svg-sprite',

				// target options
				options: {
					mode: {
						// symbol mode to build the SVG
						symbol: {
							render: {
								css: false,
								scss: false
							}
						},
						sprite: 'sprite-svg.svg',
						example: true
					},
					shape: {
						dimension: {
							maxWidth: 300,
							maxHeight: 300
						}
					},
				},
			}
		},

		/* IMAGES SPRITE
		/* --------------------------------------------------- */
		sprite: {
			all: {
				src 	: "assets/images-uncompress/images-unsprite/*.png",
				dest 	: "assets/images-uncompress/images-sprite.png",
				destCss : "assets/css/images-sprite.css",
			}
		},

		/* IMAGES COMPRESS
		/* --------------------------------------------------- */
		imagemin: {
			options: {
				optimizationLeve: 3,
				progressive: true,
			},
			dynamic: {
				expand: true,
				cwd: 'assets/images-uncompress/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'assets/images/'
			}
		},

		/* SASS-LIBSASS CONFIGURATION
		 * includePath ['libs/bootstrap/bootstrap/scss'] if from
		 * bower
		/* --------------------------------------------------- */
		sass: {
			options: {
				includePath: ['sass'],
				sourceMap: true,
				outputStyle: 'expanded'
			},
			dist: {
				files: {
					'assets/css/app.css': 'assets/sass/application.sass'
				}
			}
		},

		/* CSS AUTOPREFIXER
		/* --------------------------------------------------- */
        autoprefixer: {
            options: {
                browser: [ 'ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome>= 34', 'safari >= 7', 'opera >= 23', 'ios >=7', 'android >= 4.4', 'bb >= 10']
                },
            global: {
                expand: true,
                flatten: true,
                src: "assets/css/app.css",
                dest: "assets/css/"
            }
        },

		/* CSS MEDIA QUERIES
		/* --------------------------------------------------- */
		cmq: {
			options		: {
				log: false
			},
			your_target : {
				files: {
					'assets/css/app.css' : 'assets/css/app.css'
				}
			}
		},

		/* CSS COMBINE & MINIFY
		/* --------------------------------------------------- */
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'assets/css/app-combine.min.css': ['assets/css/app.css', 'assets/css/images-sprite.css']
				}
			},
		},

		/* JS-HINT
		/* --------------------------------------------------- */
		jshint: {
			options: {
				force: true
			},
			all: ['Gruntfile.js', 'assets/js/scripts.js']
		},

		/* JS COMBINE
		/* --------------------------------------------------- */
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['assets/js/intro.js', 'assets/js/scripts.js'],
				dest: 'assets/js/combine-all-scripts.js'
			},
		},

		/* JS MINIFY
		/* --------------------------------------------------- */
		uglify: {
			my_advanced_target: {
				options: {
					beautify: {
						width: 80,
						beautify: true
					}
				},
				files: {
					"assets/js/combine-all-scripts.min.js": ["assets/js/combine-all-scripts.js"]
				}
			}
		},

		/* HTML-INCLUDES PARTIALS CONFIGURATION
		/* --------------------------------------------------- */
		includes: {
			files: {
				cwd 	: 'assets/site',
				src 	: [ '*.html', 'pages/*.html'],
				dest 	: './',
				options	: {
					silent 		: true,
					includePath : 'assets/include',
					banner 		: '<!-- I am a banner <% includes.files.dest %> -->'
				}
			}
		},

		/* BROWSERSYNC CONFIGURATION
		/* --------------------------------------------------- */
		browserSync: {
			dev: {
				bsFiles: {
					src: [ 'assets/css/app.css', '*.html']
				},
				options: {
					server: ['.tmp', 'dist', './'],
					background: true,
					watchTask: true,
					watchOptions: {
						ignored: ''
					},
				},
			},
		},

		bsReload: {
			css: {
				reload: 'assets/css/*.css'
			},
			all: {
				reload: true
			}
		},

		/* WATCH CONFIGURATION
		/* --------------------------------------------------- */
		watch: {
			options: {
				spawn 	: false,
			},

			scripts: {
				files: ['assets/js/sripts.js'],
				tasks: ['jshint'],
			},

			html_include: {
				files: ['assets/include/*.html', 'assets/site/*.html', 'assets/site/**/*.html'] ,
				tasks: ['includes:files'],
			},

			css: {
				files: ['assets/sass/*.sass', 'assets/sass/**/*.sass'],
				tasks: ['sass'],
			},

		},


	});

	require("load-grunt-tasks")(grunt);

	// REGISTER GRUNT TASKS
	// task for serve default
	grunt.registerTask( 'default', ['sass', 'autoprefixer', 'cmq'] );
	// task for serve default with include-html
	grunt.registerTask( 'serve', [ 'browserSync', 'watch', 'autoprefixer', 'cmq' ] );
	// task for combine all-css & minify *.css
	grunt.registerTask( 'css-combine-minify', [ 'cssmin' ] );
	// task for combine all-js & minify *.js
	grunt.registerTask( 'js-combine-minify', [ 'concat', 'uglify'] );
	// task for create images-sprite
	grunt.registerTask( 'images-create-sprite', [ 'sprite'] );
	// task for create compress images
	grunt.registerTask( 'images-create-compress', [ 'imagemin'] );
	// task for create svgstore
	grunt.registerTask( 'svgstore', ['svgstore'] );
	// task for create svg-sprites
	grunt.registerTask( 'svg-create-sprite', ['svg_sprite'] );

};