let VARIABLES = {};
if (process.env.NODE_ENV === 'development') {
    VARIABLES = {
        NODE_ENV: process.env.NODE_ENV,
        HOST: 'localhost',
        PORT: '8080',
        MONGOATLAS_URI:
            'mongodb+srv://isaico:isaias159@cluster0.ai4r7.mongodb.net/ecommerce',
        MONGOATLAS_URI_SESSION:
            'mongodb+srv://isaico:isaias159@cluster0.ai4r7.mongodb.net/sessions',
        NODEMAILER_GMAIL_ADRESS: 'isaico40@gmail.com',
        COOKIE_EXP_TIME: 60000,
    };
} else {
    let VARIABLES = {
        NODE_ENV: 'deploy',
        HOST: 'otherhost',
        PORT: '4000',
        MONGOATLAS_URI:
            'mongodb+srv://isaico:isaias159@cluster0.ai4r7.mongodb.net/ecommerce',
        NODEMAILER_GMAIL_ADRESS:'isaico40@gmail.com',
        COOKIE_EXP_TIME: 60000,
    };
}
export default VARIABLES;
