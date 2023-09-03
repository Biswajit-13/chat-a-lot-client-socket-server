import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import Layout from './layout';

const About = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const callAbout = async () => {
        try {
            const res = await fetch("http://localhost:5000/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }, credentials: "include"
            })
            const data = await res.json();
            console.log("the user", data)
            setUser(data)
            if (res.status !== 200) {
                const error = new Error(res.error)
                throw error;
            }

        }

        catch (err) {
            console.log(err);
            navigate("/login")
        }
    }


    useEffect(() => {
        callAbout();
    }, [])

    return (
        <Layout>
        <div className='items-center bg-gray-50 justify-center flex'>
            <Card className="w-96">
                <CardHeader floated={false} className="h-80">
                    <img src="/img/team-3.jpg" alt="profile-picture" />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                 {user.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                      {user.email}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                    {user._id}
                  </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <Tooltip content="Like">
                        <Typography
                            as="a"
                            href="#facebook"
                            variant="lead"
                            color="blue"
                            textGradient
                        >
                            <i className="fab fa-facebook" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#twitter"
                            variant="lead"
                            color="light-blue"
                            textGradient
                        >
                            <i className="fab fa-twitter" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#instagram"
                            variant="lead"
                            color="purple"
                            textGradient
                        >
                            <i className="fab fa-instagram" />
                        </Typography>
                    </Tooltip>
                </CardFooter>
            </Card>
            </div>
        </Layout>
    );
}

export default About;
