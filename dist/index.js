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
const consola_1 = __importDefault(require("consola"));
const automation_1 = require("./automation");
const etsy_1 = require("./automation/etsy");
const defaultMarketingOptions = {
    personUsername: process.env.ETSY_MARKETING_USERNAME,
    CONVO_SUBMIT_FLAG: Boolean(parseInt(process.env.ETSY_MARKETING_CONVO_SUBMIT_FLAG)),
};
exports.marketEtsyPerson = (marketingOptions = defaultMarketingOptions) => (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const operationalOptions = Object.assign(Object.assign({}, defaultMarketingOptions), marketingOptions);
    const { email, password } = credentials;
    const browser = yield automation_1.launchBrowser({ headless: false });
    const page = yield automation_1.openNewPage('https://etsy.com')(browser);
    consola_1.default.info('LOGGING IN...');
    yield automation_1.loginEtsyUser({ email, password })(page);
    consola_1.default.info(`NAVIGATING TO people/${marketingOptions.personUsername}...`);
    yield automation_1.navigateToEtsyPeoplePage({ username: marketingOptions.personUsername })(page);
    consola_1.default.info(`SUBMITTING MESSAGE TO ${marketingOptions.personUsername}...`);
    yield etsy_1.submitEtsyMarketingMessage(operationalOptions)(page);
});
//# sourceMappingURL=index.js.map