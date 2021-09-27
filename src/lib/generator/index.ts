// generally :
// config the default values


export const objectToMap  = (config:any) => {
    const generatedMap = new Map();

    for(const option in config) {
        console.log(config[option])
        // for every loop set new [string, {all configs for that prop}]
    }
    return generatedMap;
}