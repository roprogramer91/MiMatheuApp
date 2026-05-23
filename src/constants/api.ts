const DEV_URL = 'https://mimatheuapp-dev.up.railway.app';
const PROD_URL = 'https://mimatheuapp-production.up.railway.app';

export const BASE_URL = __DEV__ ? DEV_URL : PROD_URL;
