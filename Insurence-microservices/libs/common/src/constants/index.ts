export const protoPath = '../../../libs/common';
export const usersProto = 'users.proto';
export const claimsProto = 'claims.proto';

export const jwtSecret = process.env.JWT_SECRET || 'local auth test secret';
export const jwtExpirationHrs = Number(process.env.JWT_EXPIRATION) || 24;
