#!/usr/bin/env node

'use strict';

var path = require('path')
    , fs = require('fs')
    , yaml = require('js-yaml')
    , uuid = require('node-uuid')
    , clc = require('cli-color')
    , moment = require('cli-color')
    // , lowdb = require('lowdb')
    // , db = lowdb('ghost-generated.json')
    , readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// default color messages
var logError = clc.red.bold;
var logWarn = clc.yellow;
var logNotice = clc.blue;
var logSuccess = clc.green;


/**
 * Class/Constructor JekyllToGhost responsible to boostrap the conversion to Ghost format (json)
 * @param {[string]} posts [contain path to Jekyll posts]
 * @class JekyllToGhost
 */
function JekyllToGhost(pathPosts) {
    this.posts = '' + pathPosts + '';
    
    this.readPosts();
}

JekyllToGhost.prototype.readPosts = function() {
    var folder = this.posts;

    if ( fs.exists('./posts/') ) {
        console.log( logWarn('reading posts at ' + folder) );
    } else {
        console.log( logWarn('Folder > ' + folder + ' < does not exists.') );
        console.log( logWarn('Make sure to include a folder with Jekyll markdown files inside.') );
    }
}

/**
 * Responsible to initialize program
 */
function startUp() {
    console.log( logSuccess('Running...') )

    rl.question('Type the name of the folder where Jekyll posts are hosted: ', function(pathPosts) {
        var app = new JekyllToGhost(pathPosts);
        rl.close();
    });
}

// initialize
startUp()