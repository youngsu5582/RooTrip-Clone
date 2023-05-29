import sdk from "@nestia/sdk";

export const NESTIA_CONFIG: sdk.INestiaConfig = {
    input: "src/controllers",
    output: "src/api",
    json: true,
    
    swagger: {
        output: "bin/swagger.json",
        security :{
            bearer : {
                type:'apiKey',
                in:'header',
                name:'Authorization'
            }
        }
    },
    
    primitive:false,
    
};
export default NESTIA_CONFIG;