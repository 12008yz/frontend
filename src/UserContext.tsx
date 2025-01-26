import { User } from "./app/types"; // Импортируем тип User
import { createContext, useContext, useState } from "react";

// Определение интерфейса для контекста
interface UserContextType {
    user: User | null; // Данные пользователя
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // Функция для установки пользователя
    toggleUserFlow: () => void; // Функция для переключения состояния пользовательского интерфейса
    isLogged: boolean; // Статус входа пользователя
    openUserFlow: boolean; // Статус открытия пользовательского интерфейса
    toggleUserData: (data: User | null) => void; // Функция для обновления данных пользователя
}

// Создание контекста
const UserContext = createContext<UserContextType | undefined>(undefined);

// Провайдер контекста
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); // Состояние пользователя
    const [isLogged, setIsLogged] = useState<boolean>(false); // Статус входа
    const [openUserFlow, setOpenUserFlow] = useState<boolean>(false); // Статус открытия пользовательского интерфейса

    // Функция для переключения состояния пользовательского интерфейса
    const toggleUserFlow = () => {
        setOpenUserFlow(prev => !prev);
    };

    // Функция для обновления данных пользователя
  const toggleUserData = (data: User | null) => {
    console.log('Обновление данных пользователя:', data); // Проверка данных
    if (data) {
        setUser(data);
        setIsLogged(true); // Устанавливаем статус входа
    } else {
        setUser(null);
        setIsLogged(false); // Устанавливаем статус входа
    }
};

    return (
        <UserContext.Provider value={{ user, setUser , toggleUserFlow, isLogged, openUserFlow, toggleUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Хук для использования контекста
const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser Context must be used within a UserProvider");
    }
    return context;
};

export { UserProvider, useUserContext };