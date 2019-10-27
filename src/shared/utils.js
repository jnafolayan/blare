const FORCE_PROD = true;

export const buildUrl = (endpoint) => {

  if (!FORCE_PROD && process.env.NODE_ENV == 'development')
    return `http://192.168.4.211:3000/api/v1${endpoint}`
  else
    return `https://parrotbackend.herokuapp.com/api/v1${endpoint}`;

}
