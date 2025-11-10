import app from './src/app.js';

app.listen(app.get('port'), function () {
    console.log("Store Lock " + process.env.NODE_ENV + " started on Port No. ", app.get('port'));
});