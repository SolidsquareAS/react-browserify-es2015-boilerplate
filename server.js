import express from 'express';
import path from 'path';
import React from 'react'
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import compression from 'compression';
import {host, port} from './src/private/js/components/Config';
import routes from './src/private/js/routes';
import streams from './src/private/js/api/streams';
var app = express();

app.use(express.static(path.join(__dirname, 'build/public')));
app.use(compression());

app.use('/api/streams', streams);

app.get('*', (req, res) => {
  match({routes: routes, location: req.url}, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message);
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props}/>);
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found');
    }
  })
});

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

app.listen(port, function () {
  process.stdout.write("serving " + path.join(__dirname, 'build'));
  process.stdout.write('Production Express server running at ' + host);
});
