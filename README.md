<p align="center">
<img width="560" height="200" src="https://user-images.githubusercontent.com/75932477/153735780-2f1164f5-ccf0-4bf1-ae02-46623f5fe9a5.png"/>
</p>


[![Codecov Coverage](https://img.shields.io/codecov/c/github/devSupporters/volder/master>.svg)](https://codecov.io/gh/devSupporters/volder/)
[![Package Size](https://img.shields.io/bundlephobia/minzip/volder?label=package%20size)](https://www.npmjs.com/package/volder)
[![Downloads](https://img.shields.io/npm/dm/volder)](https://www.npmjs.com/package/volder)
[![Version](https://img.shields.io/npm/v/volder)](https://www.npmjs.com/package/volder)
[![License](https://img.shields.io/npm/l/volder)](https://github.com/devSupporters/volder/blob/main/LICENSE)
[![Gitter](https://badges.gitter.im/voler-community/community.svg)](https://gitter.im/voler-community/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![CI](https://github.com/devSupporters/volder/actions/workflows/main.yml/badge.svg)](https://github.com/devSupporters/volder/actions/workflows/main.yml)
[![GitHub followers](https://img.shields.io/github/followers/alguerocode?style=social)](https://github.com/alguerocode)

[!["DevSupporters discord server](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/cfyQkKcd)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/alhashmis28)
<a href="https://www.producthunt.com/posts/volder?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-volder">
<img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=332017&theme=light" alt="volder - schema builder and data validation for javascript | Product Hunt" width="175" height="40"/>
</a>


 **volder** is powerful Object schema validation, it lets you describe your data using a simple and readable schema and transform a value to match the requirements, it has custom error messages, custom types and nested schemas.


## Installation

```
$ npm install --save volder
$ yarn add volder
```
visit [volder.vercel.app](https://volder.vercel.app) for API, documentation, and contributing.
## Table of Contents

- [Documentation and API](https://volder.vercel.app)
- [Usage](#usage)
- [Example](#Example)
- [Contributing](#Contributing)

## Usage

You define and create volder schema object. Schema objects are immutable, so each validate call returns a new schema object.

```js
import { Volder } from 'volder';

const personSchema = new Volder({
  name:{ type: String, required: true, maxLength: 10, trim: true },
  age: { type: Number, min: 18, sign: 'positive' }
})

const { valid, errors, value } = personSchema.validate({name: "max  ", age: 19});
// { valid: true, errors: {}, value: {name: "max", age: 19}}
```
## Example

let's took one example using volder for login validation.

```js
import { Volder, Email } from "volder";

// initialize using Volder constructor.
const userSchema = new Volder({
  username: {
    type: String,
    maxLength: 10,
    // use Custom Error Message feature.
    minLength: [4, "username should be at least 4 characters"],
    default: "guest user",
  },
  email: {
    // Email type imported for volder package, there are other types like UUID.
    type: [Email, "is not valid email"],
    trim: true,
    required: true,
  },
  // you can just Enter the type.
  birth_day: Date,
  password: {
    type: String,
    matches: /^[a-zA-Z0-9]{3,30}$/,
    // pattern config run and return true if value valid otherwise false.
    pattern: [(input) => input.includes("_"), "underscore not included"],
  },
});

const validInput = {
  user: "max123",
  email: "   test@gmail.test    ",
  birth_day: "1/2/2010",
  password: "new_Password123",
};

const { valid, errors, value } = userSchema.validate(validInput);
// { valid: true, errors: {}, value: {...validInput, email:"test@gmail.test"}}

const invalidInput = {
  user: "1",
  email: "test@gmail",
  birth_day: "2010",
  password: "newPassword123",
};

const { valid, errors, value } = userSchema.validate(invalidInput);
// {
//  valid: false,
//  errors: {
//     user: "username should be at least 4 characters"
//     email: "is not valid email",
//     password: "underscore not included",
//     birth_day: "birth_day is not valid date, date should be in 'mm/dd/yyyy' format"
// },
//  value: {}
//}
```
more example:
- [user login validation template powered by volder](https://github.com/alguerocode/js-volder)

## Contributing

#### I appreciate to contributing in this repository.[(go throw the guild lines)](/CONTRIBUTE.md)

## 📝 License

Copyright © 2021 [salah alhashmi](https://github.com/alguerocode).<br />
This project is [GPL-3.0](https://github.com/devSupporters/volder/blob/master/LICENSE) licensed.
