"use client"; // This is a client component 👈🏽

import React, { useState, FormEvent } from 'react'

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [body, setBody] = useState({
        name : "",
        api_token : "",
    });
    const [data, setData] = useState()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/wallet/create?api_token=' + body.api_token + '&name=' + body.name , {
                method: 'POST',
            }).then(response=>response.json()).then(data=>setData(data.data))

        } catch (error : any) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={onSubmit} className="w-1/3 justify-center border-2 flex flex-col gap-4 m-4 p-2">
                <label htmlFor="Api Token">Api Token</label>
                <input className="border-2 border-gray-200  p-2"
                       type="text" name="api_token" onChange={() => {
                    setBody({ ...body });
                }}></input>
                <label htmlFor="Wallet Name">Wallet Name</label>
                <input className="border-2 border-gray-200  p-2"
                       type="text" name="name" onChange={() => {
                    setBody({ ...body });
                }}></input>
                <button  className="bg-black text-white text-sm font-medium p-2 rounded "
                         type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            <h1>wallet info</h1>
            <pre className="p-2">{data ? JSON.stringify(data,null,3):''}</pre>
        </div>
    )
}