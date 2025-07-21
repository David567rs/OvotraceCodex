//export const TOKEN_SECRET ='some secret token'

export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'some secret token';
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Variables de entorno para cloudinary 
export const CLOUDINARY_CLOUD_NAME = process.CLOUDINARY_CLOUD_NAME || 'OvoTrace'
export const CLOUDINARY_API_KEY = process.CLOUDINARY_API_KEY || '471261372767695'
export const CLOUDINARY_API_SECRET= process.CLOUDINARY_API_SECRET || '8_Zk83HUgUC6D-tj2UB2IOYPUww'

