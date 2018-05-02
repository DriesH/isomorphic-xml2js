import * as path from "path";
import * as webpackMiddleware from "webpack-dev-middleware";
import webpack = require("webpack");
import express = require("express");
import testconfig = require("../webpack.testconfig");

const port = parseInt(process.env.PORT!) || 3004;
const app = express();

if (process.argv.indexOf("--no-webpack") === -1) {
    app.use(webpackMiddleware(webpack(testconfig), {
        publicPath: "/"
    }));
}

app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.join(__dirname, "../test/resources/")));

app.post("/fileupload", function(req, res) {
    res.status(200);
    req.pipe(res);
});

app.listen(port, function() {
    console.log(`isomorphic-xml2js testserver listening on port ${port}...`);
});