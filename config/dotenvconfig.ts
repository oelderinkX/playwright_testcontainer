export class DotEnvConfig {
    public pass: string = process.env.dotnet_pass || 'fail';
}