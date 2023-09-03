import React, { useState } from "react";
import { Button } from "@material-tailwind/react"
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
const Register = () => {
const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", password: "", cpassword: "",
    })


    const handleInputs = (e) => {
        // console.log(e.target.value);
        const id = e.target.id;
        const value = e.target.value;
        setUser({ ...user, [id]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, cpassword } = user;

        try {
            const res = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone, password, cpassword
                })
            });

            const data = await res.json();

            if (res.status === 201) {
                window.alert("User Registered");
                navigate("/login")
            } else if (res.status === 409) {
                window.alert("Email already in use");
            } else if (res.status === 400) {
                window.alert("Password does not match");
            } else if(res.status === 422){
                window.alert("Please fill all the fields");
            }
        } catch (error) {
            console.error("Error:", error);
            window.alert("An error occurred. Please try again later.");
        }
    }

    return (
        <div className="px-10 min-h-screen lg:px-28 mx:auto bg-gray-50">
            <div className="flex flex-col items-center py-16">
                <h2 className="text-2xl  text-gray-700 font-semibold mb-4">Register</h2>
               
                <form className="w-full max-w-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={user.name}
                            onChange={handleInputs}
                        />
                    </div>
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
                            Phone
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="tel"
                            placeholder="10 digit mobile number"
                            value={user.phone}
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
                    <div className="mb-4">
                        <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Confirm Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="cpassword"
                            type="password"
                            value={user.cpassword}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button color="black" className=" mt-5"
                            onClick={handleSubmit}
                        >Register</Button>
                    </div>
                </form>
                <p className="py-5 text-gray-700">Already have an account?
                <button
                onClick={()=>navigate("/login")}
                className="ml-2 text-red-800 underline">Login here</button>
            </p>
            </div>
        </div>
    );

};

export default Register;
