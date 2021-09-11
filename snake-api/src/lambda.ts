import serverlessExpress from '@vendia/serverless-express'
import app from './index'

exports.handler = serverlessExpress({ app })