import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NotFound } from 'http-errors';
import { connect, set } from 'mongoose';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config/env.config';
import { dbConnection } from '@config/database.config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middleware/error.middleware';
import {apiResponse} from '@middleware/api-response.middleware';
import { logger, stream } from '@utils/logger';
import { ApiResponse } from '@utils/api-response';


declare global {
  namespace Express {
    interface Response {
      apiResponse: ApiResponse
    }
  }
}



class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    // this.initializeSwagger();
    this.initializeNotFoundRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    try{
      await connect(dbConnection.url, dbConnection.options);
    }catch(error){
      console.log(error)
      logger.error(["mongoose connection error ",error])
    }
  }

  private initializeMiddleware() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(apiResponse);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeNotFoundRoutes(){
    this.app.use((req, res, next) =>{
      next(new NotFound('Route not found'))
    })
  }
  // private initializeSwagger() {
  //   const options = {
  //     swaggerDefinition: {
  //       info: {
  //         title: 'REST API',
  //         version: '1.0.0',
  //         description: 'Example docs',
  //       },
  //     },
  //     apis: ['swagger.yaml'],
  //   };

  //   const specs = swaggerJSDoc(options);
  //   this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  // }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
