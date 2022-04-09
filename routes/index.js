const devRouter = require('./developer.router');
const companyRouter = require('./company.router');
const authRouter = require('./auth.router');

function routerApi(app){
    app.use('/api/developers', devRouter);
    app.use('/api/companies', companyRouter);
    app.use('/api/auth', authRouter);
}

module.exports = routerApi;