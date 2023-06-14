// export type ConfigType = {
//     db: DbConfigType;
// };

// export type DbConfigType = {
//     name?: string;
//     host: string;
//     port: number;
//     pageSize?: number;
//     user?: string; // todo - make secret
//     password?: string; //todo: make secret
// };

// export type EnvType = {
//     NODE_ENV: string;
// };

// export type DbConfigType = {
//     name?: string;
//     host: string;
// };

// export type ConfigType = {
//     env: string;
//     ip: string;
//     port?: number;
//     db: DbConfigType;
// };

// export class DatabaseSettings {
//     @key('database.server')
//     public server: string;

//     @key('database.name')
//     public name: string;

//     @key('database.password')
//     public password: string;

//     @key('database.user')
//     public user: string;
// }

export type AppSettings = {
    port: number;
    host: string;
    auth0Domain: string;
    databaseUri: string;
    apiKey: string;
};
