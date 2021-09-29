export const inputValidator = ( input: any, optionName:string, optionConfigs: any, errors: any) => {

    switch (optionConfigs.type) {
////////////////////////////////// String //////////////////////////////////////////
        case String:
            if(!(typeof input[optionName] === 'string' || input instanceof String)) {
                errors[optionName] = `${optionName} should be a string`
                return false;
            }

            if(optionConfigs.min !== null && input[optionName].length < optionConfigs.min) {
                errors[optionName] = `${optionName} should be at least ${optionConfigs.min} characters`
                return false
            }

            if(optionConfigs.max !== null && input[optionName].length > optionConfigs.max) {
                errors[optionName] = `${optionName} should be at most ${optionConfigs.max} characters`
                return false;
            }
            break;
////////////////////////////////// Number /////////////////////////////////////////////
        case Number:
            if(!(typeof input[optionName] === 'number' || input instanceof Number)) {
                errors[optionName] = `${optionName} should be a number`
                return false
            }

            if(optionConfigs.min !== null &&  input[optionName] < optionConfigs.min) {
                errors[optionName] = `${optionName} should be at least ${optionConfigs.min}`
                return false;
            }

            if(optionConfigs.max !== null && input[optionName] > optionConfigs.max) {
                errors[optionName] = `${optionName} should be at most ${optionConfigs.max}`
                return false;
            }
            break;

        // case Boolean:
        //     if(input[optionName].constructor.name !== "Boolean") {
        //         validInput = false;
        //         errors[optionName] = `${optionName} should be a boolean`
        //     }
        //     break;

        // case Array:
        //     if(input[optionName].constructor.name !== "Array") {
        //         validInput = false;
        //         errors[optionName] = `${optionName} should be a array`
        //     }
        //     break;

        // case Object:
        //     if(input[optionName].constructor.name !== "Object") {
        //         validInput = false;
        //         errors[optionName] = `${optionName} should be a object`
        //     }
        //     break;
    }
    return;
};
