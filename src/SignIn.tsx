import { useState } from "react"
import { useNavigate } from "react-router"

type InitialDataUp = {
    email: string;
    password: string;
}

const initialDataUp = {
    email: '',
    password: ''
}

const SignIn: React.FC =() => {
    const navigate = useNavigate()

    const [dataUp, setDataUp] = useState<InitialDataUp>(initialDataUp)

    const handleDataUp = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target 
        setDataUp({
            ...dataUp,
            [name]: value
        })
    }

    const hendleAutorizete = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try {
           const response = await fetch('https://todo-redev.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUp),           
        }) 

        const result = await response.json()
            if(response.ok) {
                localStorage.setItem('token', result.token);
               navigate('/todo')
            } else {
                console.log('Ошибка', result.message)
                navigate('/registre')
            }
        } catch (error) {
            console.log(error)
        }
        


    }

    return <>
    <h1>Вход</h1>
    <form className="form-login" style={{gap:'20px'}} onSubmit={hendleAutorizete}>
        <div>
        <label style={{marginRight: '10px'}} htmlFor="email">E-mail</label>
        <input className="form-input" type="text" placeholder="Введите Email" id="email" value={dataUp.email} name="email" onChange={handleDataUp}/>
        </div>
        <div>
         <label style={{marginRight: '10px'}} htmlFor="password">Пароль</label>
        <input className="form-input" type="text" placeholder="Введите пароль" id="password" value={dataUp.password} name="password" onChange={handleDataUp}/>   
        </div>
        
        <button className="search-btn" type="submit">Войти</button>
    </form>
    </>
}

export default SignIn;