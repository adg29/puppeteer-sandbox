#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const consola_1 = __importDefault(require("consola"));
const _1 = require(".");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, etsyPersonUsername } = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Enter email:',
            default: process.env.ETSY_USERNAME,
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter password:',
            mask: '*',
            default: process.env.ETSY_PASSWORD,
        },
        {
            type: 'input',
            name: 'etsyPersonUsername',
            message: 'Enter Etsy Person Username:',
            default: process.env.ETSY_MARKETING_USERNAME,
        },
    ]);
    try {
        yield _1.marketEtsyPerson({
            personUsername: etsyPersonUsername,
            CONVO_SUBMIT_FLAG: Boolean(parseInt(process.env.ETSY_MARKETING_CONVO_SUBMIT_FLAG)),
        })({
            email,
            password,
        });
    }
    catch (error) {
        consola_1.default.error(error);
        process.exitCode = 1;
    }
}))();
//# sourceMappingURL=cli.js.map