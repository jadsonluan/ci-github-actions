import { config as setupDotEnv } from 'dotenv'
import { resolve, join } from 'path'

function getVar(name: string) {
  return process.env[name] || ''
}

const NODE_ENV = getVar('NODE_ENV')

const isTest = NODE_ENV === 'test'
const isProd = NODE_ENV === 'production'

const setup = () => {
  let currentPath = [__dirname, '..', '..']
  if (isProd) currentPath.push('..')
  return setupDotEnv({ path: resolve(...currentPath, `.env`) })
}

setup();


const MIGRATIONS_FOLDER = isTest || isProd
  ? join(__dirname, '..', '..', './dist/src/migrations')
  : join(__dirname, '..', './migrations')

const ENTITIES_FOLDER = join(__dirname, '..', './entities')

const DB_ENV = {
  DATABASE_HOST: getVar('DATABASE_HOST'),
  DATABASE_USER: getVar('DATABASE_USER'),
  DATABASE_PASSWORD: getVar('DATABASE_PASSWORD'),
  DATABASE_PORT: getVar('DATABASE_PORT'),
  DATABASE_SCHEMA: getVar('DATABASE_SCHEMA') || 'public',
  DATABASE_NAME: isTest ? 'test' : getVar('DATABASE_NAME'),
  DATABASE_LOG: isTest ? false : getVar('DATABASE_LOG') !== '',
  MIGRATIONS_FOLDER,
  ENTITIES_FOLDER,
  CLI: {
    MIGRATIONS_FOLDER,
    ENTITIES_FOLDER,
  },
}

export {
  DB_ENV,
  NODE_ENV,
}