'use strict';

const {parallel, series} = require('gulp');
const {spawn} = require("child_process");
const del = require('del');

// tasks
function clean() {
    return del(["./public"]);
}

function build_hugo() {
    return spawn("hugo", ["--minify"], {stdio: 'inherit'});
}

// complex tasks
const build = series(clean, build_hugo);

// export tasks
exports.build = build;
exports.default = build;