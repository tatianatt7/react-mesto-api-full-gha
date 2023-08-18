const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { PORT, MONGODB, origin } = require('./config');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const handlerError = require('./middlewares/handlerError');
const { createUser, login } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./utils/validator');
const { NotFoundError } = require('./utils/errors');

mongoose.connect(MONGODB);
mongoose.set('strictQuery', false);

const app = express();
app.use(cors({ origin }));
app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(cookieParser());

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет!');
  }, 0);
});

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => { next(new NotFoundError('Запрашиваемый эндпоинт не найден')); });

app.use(errorLogger);
app.use(errors());
app.use(handlerError);

app.listen(PORT, () => console.info('Server is started on port:', PORT));
