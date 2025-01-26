"use client"
import React from 'react'
import LoginForm from './LoginForm'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ForgotPasswordForm from './ForgotPasswordForm'
import OTPForm from './OTPForm'

const Auth = () => {
    const pathname = usePathname()

    const renderFormComponent = () => {
        switch (pathname) {
            case "/forgot-password":
                return <ForgotPasswordForm />;
            case "/otp":
                return <OTPForm />;
            default:
                return <LoginForm />;
        }
    };
    return (
        <>
            <section className='w-full min-h-screen flex flex-row'>
                <div className='w-[55%] lg:flex lg:flex-col hidden min-h-screen relative z-10'>
                    <Image src="/images/auth/authBG.jpg" alt="authBG" className='object-cover' fill />
                    <span className='bg-black bg-opacity-30 absolute w-full h-full'></span>
                </div>
                <div className='lg:w-[45%] w-full flex justify-center items-center mx-auto md:px-[24px] sm:px-16 px-[16px]'>
                    <div className='max-w-lg sm:p-8 p-6 w-full flex flex-shrink-0 flex-col justify-center items-center rounded-xl lg:shadow-none shadow-xl'>
                        <div className='w-[140px] h-[100px] relative mb-6'>
                            <Image src="/images/common/anac_logo.svg" alt="logo" fill />
                        </div>
                        <div className='mb-6 text-center'>
                            <h1 className='text-3xl capitalize font-semibold mb-3'>
                                {pathname === "/login" ? "Sign in"
                                    :
                                    pathname === "/forgot-password" ? "Forgot Password"
                                        :
                                        pathname === "/otp" && "OTP Verification"
                                }
                            </h1>
                            <p className='text-charcoal text-base font-medium'>
                                {pathname === "/login" ? " Welcome to the Lubricants Anac Portal"
                                    :
                                    pathname === "/forgot-password" ? "Recover Your Password"
                                        :
                                        pathname === "/otp" && "Enter Your OTP"
                                }
                            </p>
                        </div>
                        {
                            renderFormComponent()
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Auth