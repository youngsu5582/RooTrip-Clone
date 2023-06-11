import {INestiaConfig} from "@nestia/sdk";

export const NESTIA_CONFIG: INestiaConfig = {
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
        },
        servers:[
            {
                "url": "http://165.229.86.126:8000/api/",
                "description": "insert your server url"
            }
        ]
    },
    primitive:false,
    
};
export default NESTIA_CONFIG;