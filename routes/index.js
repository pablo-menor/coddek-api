const devRouter = require('./developer.router');
const companyRouter = require('./company.router');

function routerApi(app){
    app.use('/api/developers', devRouter);
    app.use('/api/companies', companyRouter);
}

module.exports = routerApi;