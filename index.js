'use strict';
var through = require('through2');
var CSS = /<link(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/link>)*/gim;
var JS = /<script(?:.*?)src=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/gim;
var HREF = /href\=[\"|\'](.*)[\"|\']/i;
var SRC = /src\=[\"|\'](.*)[\"|\']/i;

function setTimeStamp() {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb();
            return;
        }

        var htmlContent = String(file.contents);

        htmlContent = htmlContent.replace(CSS, function (v, i) {
            var match = v.match(HREF);
            if (match[1]) {
                v = v.replace(new RegExp(match[1]), match[1] + '?_=' + date);
            }
            console.log(v);
            return v;
        });

        htmlContent = htmlContent.replace(JS, function (v, i) {
            var match = v.match(SRC);
            if (match[1]) {
                v = v.replace(new RegExp(match[1]), match[1] + '?_=' + date);
            }
            console.log(v);
            return v;
        });

        file.contents = new Buffer(htmlContent);

        cb(null, file);
    })
}

module.exports = setTimeStamp;
