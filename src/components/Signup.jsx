import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authFLow, getDataAuth} from "../setup.js";

const Signup = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleOnChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        const newValues ={
            ...form,
            [e.target.name]: e.target.value
        }
        console.log(newValues);
        setForm(newValues);
    }
    const handleLogin = async () => {
        const codeChallengeProm = await getDataAuth();
        authFLow(codeChallengeProm);
    };
    return (
      <>
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
        <div className={"flex pl-10 pr-10 flex-col items-center h-screen w-screen justify-center"}>
          <div
            className={
              " bg-gray-500/30 p-5 rounded-lg mt-10 hover:shadow-2xl hover:outline-spotify-green hover:outline transition-all ease-out"
            }
          >
            <div className={"text-2xl p-4 text-spotify-green font-bold"}>
              Login con spotify
            </div>
            <div className={"p-4"}>
              <p className={"text-spotify-green/90 p-2"}>Email</p>
              <input
                className={
                  "w-50 h-7 border-2 border-gray-700 rounded-lg bg-spotify-grey text-white"
                }
                placeholder=" Email"
                type="text"
                name="email"
                value={form.email}
                onChange={handleOnChange}
              />
            </div>
            <div className={"p-4 "}>
              <p className={"text-spotify-green/90 p-2"}>Password</p>
              <input
                className={
                  "w-50 h-7 border-2 border-gray-700 rounded-lg bg-spotify-grey text-white"
                }
                placeholder=" Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleOnChange}
              />
            </div>
            <div className={"p-5"}>
              <button
                className={
                  "rounded-full bg-spotify-green w-20 hover:bg-spotify-green/50"
                }
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
}
export default Signup;