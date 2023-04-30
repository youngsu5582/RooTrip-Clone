import sdk from "@nestia/sdk";

export const NESTIA_CONFIG: sdk.INestiaConfig = {
    input: "src/controllers",
    output: "src/api",
    json: true,
    
    swagger: {
        output: "bin/swagger.json",
        
    },
};
export default NESTIA_CONFIG;