export const inputValidator = ( input: any, key:string, validatorOption: any, errors: any) => {

    switch (validatorOption.type) {
////////////////////////////////// String //////////////////////////////////////////
        case String:
            if(!(typeof input[key] === 'string' || input instanceof String)) {
                errors[key] = `${key} should be a string`
                return false;
            }

            if(input[key].length < validatorOption.min) {
                errors[key] = `${key} should be at least ${validatorOption.min} characters`
                return false
            }

            if(validatorOption.max !== null && input[key].length > validatorOption.max) {
                errors[key] = `${key} should be at most ${validatorOption.max} characters`
                return false;
            }
            break;
////////////////////////////////// Number /////////////////////////////////////////////
        case Number:
            if(!(typeof input[key] === 'number' || input instanceof Number)) {
                errors[key] = `${key} should be a number`
                return false
            }

            if(input[key] < validatorOption.min) {
                errors[key] = `${key} should be at least ${validatorOption.min}`
                return false;
            }

            if(validatorOption.max !== null && input[key] > validatorOption.max) {
                errors[key] = `${key} should be at most ${validatorOption.max}`
                return false;
            }
            break;

        // case Boolean:
        //     if(input[key].constructor.name !== "Boolean") {
        //         validInput = false;
        //         errors[key] = `${key} should be a boolean`
        //     }
        //     break;

        // case Array:
        //     if(input[key].constructor.name !== "Array") {
        //         validInput = false;
        //         errors[key] = `${key} should be a array`
        //     }
        //     break;

        // case Object:
        //     if(input[key].constructor.name !== "Object") {
        //         validInput = false;
        //         errors[key] = `${key} should be a object`
        //     }
        //     break;
    }
    return;
};
