const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const { config } = require('dotenv');
config();

const server_url = "http://localhost:8000";

// Fetch Telegram bot token from the server
const getTelegramBotToken = async () => {
  try {
    const response = await axios.get(`${server_url}/bot`);
    console.log(response);
    return response.data[0].token; // Assuming 'response.data' contains the token
  } catch (error) {
    console.error("Error fetching Telegram bot token:", error);
    return null;
  }
};

getTelegramBotToken().then((token) => {
  console.log(token);
  const bot = new TelegramBot(token, { polling: true });
  const openWeatherMapApiKey = process.env.Weather_Api_Key;

  const message =
    "Welcome to Weather bot \nHere are the list of commands \nTo subscribe to the weather bot - /subscribe\n To unsubscribe from the weather bot - /unsubscribe";

  let subscribers = new Map(); // Use Map to associate chatId with status

  // Function to fetch subscribers from the server
  const getSubscriber = async () => {
    try {
      const response = await axios.get(`${server_url}/user`);
      const users = response.data;

      // Add users with 'Active' status to subscribers
      users.forEach(user => {
        if (user.status === 'Active') {
          subscribers.set(user.chatId, user.status);
        } else if (user.status === 'Blocked') {
          subscribers.set(user.chatId, user.status);
        }
      });

      console.log("Subscribers:", subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  getSubscriber();

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === "/start") {
      bot.sendMessage(chatId, message);
      console.log(chatId);
    }

    if (messageText === "/subscribe") {
      // Check if the user is blocked before allowing subscription
      if (subscribers.get(chatId) === "Blocked") {
        bot.sendMessage(chatId, "You are blocked and cannot access the weather service.");
        return;
      }

      bot.sendMessage(
        chatId,
        "Subscribed to weather bot. Weather updates will be sent when you type a city name."
      );

      const firstName = msg.chat.first_name;

      const user = {
        firstName: firstName,
        chatId: chatId,
      };
      console.log(user);

      axios
        .post(`${server_url}/user`, user)
        .then((response) => {
          console.log(
            "Data sent successfully to localhost:3000",
            response.data
          );

          if (response.data === "User added successfully") {
            subscribers.set(chatId, "Active"); // Explicitly update status to Active
          }
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }

    if (messageText === "/unsubscribe") {
      subscribers.delete(chatId);

      axios
        .delete(`${server_url}/user/${chatId}`)
        .then((res) => {
          console.log("Data deleted successfully");
        })
        .catch((err) => {
          console.log("Error deleting user");
        });
      bot.sendMessage(chatId, "Unsubscribed from weather bot");
    }

    // Check if the user is blocked
    const userStatus = subscribers.get(chatId);

    if (userStatus === "Blocked") {
      bot.sendMessage(chatId, "You are blocked and cannot access the weather service.");
      return;
    }

    // Handle city name input and send weather data
    if (messageText && messageText !== "/start" && messageText !== "/subscribe" && messageText !== "/unsubscribe") {
      const city = messageText;

      // Call OpenWeatherMap API to get weather data
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}`)
        .then((response) => {
          const weatherData = response.data;

          // Extract weather information
          const temperature = weatherData.main.temp;
          const humidity = weatherData.main.humidity;
          const windSpeed = weatherData.wind.speed;
          const cloudDescription = weatherData.weather[0].description;
          const country = weatherData.sys.country;
          const timezone = weatherData.timezone; // This should be a number
          const timezoneOffset = Number(timezone) / 3600; // Convert seconds to hours

          // Prepare the detailed weather message
          const weatherMessage = `
            Weather in ${city}:
            Temperature: ${temperature} K
            Humidity: ${humidity}%
            Wind Speed: ${windSpeed} m/s
            Cloud Description: ${cloudDescription}
            Country: ${country}
            Timezone: UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset.toFixed(2)}
          `;

          // Send weather information back to the user
          bot.sendMessage(chatId, weatherMessage);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          bot.sendMessage(chatId, "Error fetching weather data. Please try again later.");
        });
    }
  });
});
