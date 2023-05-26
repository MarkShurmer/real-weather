import { z } from 'zod';

const envVariables = z.object({
    API_KEY: z.string(),
    POSTCODE_INFO_URL: z.string(),
    OBSERVATIONS_SITES_URL: z.string(),
    OBSERVATIONS_URL: z.string(),
});

envVariables.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {}
    }
}
