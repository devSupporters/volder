export const inputValidator = ( input: any, key:string, validatorOption: any, validInput:boolean, errors: any) => {
    switch (validatorOption.type) {
////////////////////////////////// String //////////////////////////////////////////
        case String:
            if(input[key].constructor.name !== "String") {
                validInput = validInput && false;
                errors[key] = `${key} should be a string`
                break;
            }

            if(input[key].length < validatorOption.min) {
                validInput = validInput && false;
                errors[key] = `${key} should be at least ${validatorOption.min} length`
                break;
            }

            if(input[key].length > validatorOption.max) {
                validInput = validInput && false;
                errors[key] = `${key} should be at most ${validatorOption.max} length`
                break;
            }
            break;
////////////////////////////////// Number /////////////////////////////////////////////
        case Number:
            if(input[key].constructor.name !== "Number") {
                validInput = validInput && false;
                errors[key] = `${key} should be a number`
            }

            if(input[key] < validatorOption.min) {
                validInput = validInput && false;
                errors[key] = `${key} should be at least ${validatorOption.min}`
                break;
            }

            if(input[key] > validatorOption.max) {
                validInput = validInput && false;
                errors[key] = `${key} should be at most ${validatorOption.max}`
                break;
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
};
