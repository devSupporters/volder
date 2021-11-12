export const strictConfigs = (optionConfigs, strictedKeys) => {
    const curKeys = Object.keys(optionConfigs);
    curKeys.forEach(key => {
        if(!strictedKeys.includes(key)){
            throw new Error(`${key}: option config not allowed, allowed keys {${strictedKeys.join(", ")}}`)
        };
    })
}