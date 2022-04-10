const devRouter = require('./developer.router');
const companyRouter = require('./company.router');
const authRouter = require('./auth.router');
const offerRouter = require('./offer.router');

function routerApi(app){
    app.use('/api/developers', devRouter);
    app.use('/api/companies', companyRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/offers', offerRouter);
}

module.exports = routerApi;