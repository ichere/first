import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';

import router from '@/api/router/v1';

const expressApp = express();
expressApp.use(cors());
expressApp.use(helmet());
expressApp.use(compression());
expressApp.use(fileUpload());
expressApp.use(bodyParser.json());
expressApp.use('/api/v1', router);

export default expressApp;
