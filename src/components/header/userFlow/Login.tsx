import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useLazyMeQuery } from "../../../app/services/auth/auth"; // Изменено
import { saveTokens } from "../../../features/authSlice";
import MainButton from "../../MainButton";
import { useUserContext } from "../../../UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const { toggleUserFlow, toggleUserData } = useUserContext(); // Добавлено toggleUserData
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();
  const [triggerMeQuery] = useLazyMeQuery(); // Используем useLazyMeQuery
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingButton(true);
    setErrorMessage("");

    // Проверка заполненности полей
    if (!email || !password) {
      setErrorMessage("Пожалуйста, заполните все поля.");
      setLoadingButton(false);
      return;
    }

    try {
      const data = { email, password };
      const response = await login(data).unwrap();
      dispatch(saveTokens({ accessToken: response.token, refreshToken: '', user: response.user }));
      await triggerMeQuery(response.user); // Запрос текущего пользователя
      toggleUserData(response.user); // Обновление состояния пользователя
      toggleUserFlow(); // Обновление состояния пользовательского интерфейса
      console.log("Данные пользователя при входе", response.user)
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Неправильный логин или пароль");
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="flex items-center justify-center transition-all">
      <div className="max-w-md w-full space-y-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Войдите в аккаунт
          </h2>
        </div>
        {errorMessage && (
          <div className="text-center text-red-500">{errorMessage}</div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {[ 
              {
                type: "email",
                name: "email",
                autoComplete: "email",
                required: true,
                value: email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value),
              },
              {
                type: "password",
                name: "password",
                autoComplete: "current-password",
                required: true,
                value: password,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value),
              },
            ].map((inputProps, index) => (
              <div key={index} className="mb-4">
                <input
                  {...inputProps}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={inputProps.name.charAt(0).toUpperCase() + inputProps.name.slice(1)}
                />
              </div>
            ))}
          </div>
          <div>
            <MainButton
              text="Войти"
              onClick={() => { }}
              disabled={loadingButton}
              loading={loadingButton}
              submit
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
