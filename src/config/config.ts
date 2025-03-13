const jwt_key = process.env.JWT_KEY || "DefaultJWTkey";
export const JWT_KEY = new TextEncoder().encode(jwt_key);
