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
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
// add stealth plugin and use defaults (all evasion techniques)
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
puppeteer_extra_1.default.use(puppeteer_extra_plugin_stealth_1.default());
/**
 * Spawns a browser instance
 */
exports.launchBrowser = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_extra_1.default.launch(Object.assign({ userDataDir: './user_data', args: ['--disable-notifications'] }, options));
    return browser;
});
/**
 * Destroys the browser instance
 */
exports.closeBrowser = (browser) => __awaiter(void 0, void 0, void 0, function* () {
    yield browser.close();
});
/**
 * Opens a new browser tab on given URL
 */
exports.openNewPage = (url) => (browser) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield browser.newPage();
    yield page.goto(url);
    return page;
});
/**
 * Reloads page
 */
exports.reloadPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.reload();
});
//# sourceMappingURL=generic.js.map