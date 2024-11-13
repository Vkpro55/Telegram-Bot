import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import axios from 'axios'; // Import axios for making HTTP requests
import * as dotenv from 'dotenv';  // Import dotenv

dotenv.config();

@Injectable()
export class TelegramBot {
  private bot: Telegraf<any>;

  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    this.setupCommands();
  }

  private setupCommands() {
    // Handle the /start command
    this.bot.start((ctx) => ctx.reply('Welcome to the Weather Bot! Please enter the name of a city to get the weather information.'));

    // Handle incoming messages
    this.bot.on('message', async (ctx) => {
      const message = ctx.message;

      // Type guard to ensure message is of type 'Message' and has a 'text' property
      if (this.isTextMessage(message)) {
        const city = message.text;

        try {
          // Call OpenWeatherMap API to get weather data
          const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
          const weatherData = weatherResponse.data;

          // Extract weather information
          const temperature = weatherData.main.temp;
          const humidity = weatherData.main.humidity;
          const windSpeed = weatherData.wind.speed;
          const cloudDescription = weatherData.weather[0].description;
          const country = weatherData.sys.country;
          const timezone = weatherData.timezone; // This should be a number
          const cod = weatherData.cod;

          // Convert timezone from seconds to hours, ensuring it's a number
          const timezoneOffset = Number(timezone) / 3600; // Convert seconds to hours

          // Prepare the sign for timezone
          const timezoneSign = timezoneOffset >= 0 ? '+' : '';

          // Prepare the detailed weather message
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

          // Send weather information back to the user
          ctx.reply(weatherMessage);
        } catch (error) {
          console.error('Error:', error.message);
          ctx.reply('Error fetching weather data. Please try again later.');
        }
      } else {
        // If the message is not text, notify the user to send a city name
        ctx.reply('Please send a city name to get the weather information.');
      }
    });
  }

  // Type guard to check if the message has a 'text' property
  private isTextMessage(message: any): message is { text: string } {
    return message && typeof message.text === 'string';
  }

  startPolling() {
    this.bot.launch();
  }
}
