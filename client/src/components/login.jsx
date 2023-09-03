import React, { useState } from "react";
import { Button } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
const Login = () => {

    const [user, setUser] = useState({
        email: "", password: ""
    })

    const navigate = useNavigate();

    const handleInputs = (e) => {
        // console.log(e.target.value);
        const id = e.target.id;
        const value = e.target.value;
        setUser({ ...user, [id]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user;

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, password,
                }),
                credentials: "include"
            });

            const data = await res.json();

            if (res.status === 201) {
                window.alert("User login successfull");
                navigate("/")
            } else if (res.status === 400) {
                window.alert("Invalid user info");
            } else if (res.status === 422) {
                window.alert("Please fill all the fields");
            }
        } catch (error) {
            console.error("Error:", error);
            window.alert("An error occurred. Please try again later.");
        }
    }

    return (
        <div className="px-10 lg:px-28 mx:auto bg-gray-50 min-h-screen">
            <div className="flex flex-col items-center py-16">
                <h2 className="text-2xl text-gray-700 font-semibold mb-4">Login</h2>

                <form className="w-full max-w-md">

                    <div className="mb-4">
                        <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={user.email}
                            onChange={handleInputs}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={handleInputs}
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button color="black" className=" mt-5"
                            onClick={handleSubmit}
                        >Login</Button>
                    </div>
                </form>
                <p className="py-5 text-gray-700">don't have an account?
                    <button
                    onClick={()=>navigate("/register")}
                    className="ml-2 text-red-800 underline">Register here</button>
                </p>
            </div>
        </div>
    );

};

export default Login;
