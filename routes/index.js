const devRouter = require('./developer.router');


function routerApi(app){
    app.use('/api/developers', devRouter);
}

module.exports = routerApi;