const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet())
//Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
app.use(helmet.hidePoweredBy())

//Mitigate the Risk of Clickjacking with helmet.frameguard()
app.use(helmet.frameguard({action: 'deny'}))

//Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()
app.use(helmet.xssFilter())

//Avoid Inferring the Response MIME Type with helmet.noSniff()
app.use(helmet.noSniff())

//Prevent Internet Explorter from Opening Untrusted HTML with helmet.ieNoOpen()
app.use(helmet.ieNoOpen())

//Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts() for a set time
const ninetyDaysInSeconds = 90*24*60*60;
timeInSeconds = ninetyDaysInSeconds
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}))

//Disable DNS Prefetching with helmet.dnsPrefetchControl()
app.use(helmet.dnsPrefetchControl())

//Disable Client-Side Caching with helmet.noCache()
app.use(helmet.noCache())

//Set a Content Security Policy with helmet.contentSecurityPolicy()
app.use(helmet.contentSecurityPolicy(
  { directives: 
    { 
      defaultSrc: ["'self'"], 
      scriptSrc: ["'self'", "trusted-cdn.com"] 
    }
  } 
)) 

//Understand BCrypt Hashes































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
