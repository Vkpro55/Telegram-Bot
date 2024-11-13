"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBot = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
let TelegramBot = class TelegramBot {
    constructor() {
        this.bot = new telegraf_1.Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        this.setupCommands();
    }
    setupCommands() {
        this.bot.start((ctx) => ctx.reply('Welcome to the Weather Bot! Please enter the name of a city to get the weather information.'));
        this.bot.on('message', async (ctx) => {
            const message = ctx.message;
            if (this.isTextMessage(message)) {
                const city = message.text;
                try {
                    const weatherResponse = await axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
                    const weatherData = weatherResponse.data;
                    const temperature = weatherData.main.temp;
                    const humidity = weatherData.main.humidity;
                    const windSpeed = weatherData.wind.speed;
                    const cloudDescription = weatherData.weather[0].description;
                    const country = weatherData.sys.country;
                    const timezone = weatherData.timezone;
                    const cod = weatherData.cod;
                    const timezoneOffset = Number(timezone) / 3600;
                    const timezoneSign = timezoneOffset >= 0 ? '+' : '';
                    const weatherMessage = `
            Weather in ${city}:
            Temperature: ${temperature} K
            Humidity: ${humidity}%
            Wind Speed: ${windSpeed} m/s
            Cloud Description: ${cloudDescription}
            Country: ${country}
            Timezone: UTC${timezoneSign}${timezoneOffset.toFixed(2)}
            Response Code: ${cod}
          `;
                    ctx.reply(weatherMessage);
                }
                catch (error) {
                    console.error('Error:', error.message);
                    ctx.reply('Error fetching weather data. Please try again later.');
                }
            }
            else {
                ctx.reply('Please send a city name to get the weather information.');
            }
        });
    }
    isTextMessage(message) {
        return message && typeof message.text === 'string';
    }
    startPolling() {
        this.bot.launch();
    }
};
TelegramBot = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TelegramBot);
exports.TelegramBot = TelegramBot;
//# sourceMappingURL=telegram.bot.js.map