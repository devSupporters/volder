// export const arrayCase = (
//   input: any,
//   optionName: string,
//   optionConfigs: any,
//   errors: any
// ): void | boolean => {
//   const isArray = Array.isArray(input[optionName]);

//   if (!isArray) {
//     errors[optionName] = `${optionName} should be an array`;
//     return false;
//   }

//   if (optionConfigs.min !== null && input[optionName] < optionConfigs.min) {
//     errors[optionName] = `${optionName} should be at least ${optionConfigs.min}`;
//     return false;
//   }

//   if (optionConfigs.max !== null && input[optionName] > optionConfigs.max) {
//     errors[optionName] = `${optionName} should be at most ${optionConfigs.max}`;
//     return false;
//   }
// };
