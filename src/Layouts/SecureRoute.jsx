import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const SecureRoute = () => {
    const { auth,loading } = useAuth();
    console.log("loading",auth,loading)
    if(loading){ return  (
        <>
            <div className='w-100 flex flex-row mx-auto'>
               Cargando...
            </div>
        </>
    )}




    return (
        <>
            { auth?._id ? (
                <div className='w-100 mx-auto'>
                    <Header/>
                    <div className='md:flex md:min-h-screen flex-row'>
                        <Sidebar/>
                        <main className='flex-1 justify-center h-full px-2 py-3 md:px-5'>
                            <Outlet/> 
                        </main>
                    </div>
                </div>): 
                <Navigate to={"/"}/>
            }
        </>
    )
}
