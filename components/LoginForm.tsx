"use client"

import { useState } from "react"

export default function LoginPage(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password})
        })
        
        const data = await res.json()

        if(data.token){
            localStorage.setItem("token", data.token) 
            alert("登入成功")
        }
        else{
            alert("登入失敗")
        }        
    }

    return (
        <div className="container">
            <h1>Login</h1>

            <input 
              placeholder="username" 
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
        </div>
    )

}