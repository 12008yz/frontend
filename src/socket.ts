import { io } from "socket.io-client";

// Подключение к серверу WebSocket
const socket = io("http://localhost:3000", { // Изменено на имя сервиса
  autoConnect: true, // Автоматическое подключение
  reconnection: true, // Включение повторного подключения
  reconnectionAttempts: Infinity, // Бесконечные попытки переподключения
  reconnectionDelay: 1000, // Задержка перед повторным подключением
});

// Обработка события подключения
socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

// Обработка события отключения
socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

// Обработка ошибок
socket.on("connect_error", (error) => {
  console.error("WebSocket connection error:", error);
});

// Экспорт socket для использования в других частях приложения
export default socket;