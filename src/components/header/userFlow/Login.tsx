import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux"; // Импортируем useDispatch
import { useLoginMutation } from "../../../app/services/auth/auth"; // Импортируем хуки RTK Query
import { saveTokens } from "../../../features/authSlice"; // Импортируем действие saveTokens
import MainButton from "../../MainButton";
import UserContext from "../../../UserContext";
import { Tooltip } from "react-tooltip";
import CryptoJS from 'crypto-js';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const { toggleLogin } = useContext(UserContext);
  const dispatch = useDispatch(); // Добавлено

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoadingButton(true);
    e.preventDefault();
    try {
      let encryptedPassword = encryptWithAES(password);
      const response = await login({ email, password: encryptedPassword }).unwrap();
      dispatch(saveTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken }));
      toggleLogin();
    } catch (error) {
      console.log(error);
      const errorMessage = (error as any).data?.message || "Invalid email or password.";
      setErrorMessage(errorMessage);
    } finally {
      setLoadingButton(false);
    }
  };

  const encryptWithAES = (text: string) => {
    const passphrase = import.meta.env.VITE_PASSWORD_KEY;
    return CryptoJS.AES.encrypt(text, passphrase).toString();
  };

  return (
    <div className="flex items-center justify-center transition-all ">
      <div className="max-w-md w-full space-y-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        {errorMessage && (
          <div className="text-center text-red-500 ">{errorMessage}</div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              {[
                {
                  type: "email",
                  name: "email",
                  autoComplete: "email",
                  required: true,
                  value: email,
                  onChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value),
               },
               {
                 type: "password",
                 name: "password",
                 autoComplete: "current-password",
                 required: true,
                 value: password,
                 onChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value),
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
         </div>
         <div>
         <MainButton
              text="Sign in"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={() => { }}
              disabled={loadingButton}
              loading={loadingButton}
              submit
            />
         </div>
       </form>
       <Tooltip id="tooltip" content="Forgot your password?" />
     </div>
   </div>
 );
};

export default LoginPage;