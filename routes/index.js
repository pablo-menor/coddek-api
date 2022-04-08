const devRouter = require('./developer.router');
const companyRouter = require('./company.router');
const loginRouter = require('./login.router');

function routerApi(app){
    app.use('/api/developers', devRouter);
    app.use('/api/companies', companyRouter);
    app.use('/api/login', loginRouter);
}

module.exports = routerApi;