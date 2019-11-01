import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, TextField } from '@material-ui/core';
import {getUser} from './../../services/firebase';

function Perfil() {
    const [files, setFile] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [userInfo, setInfo] = useState(null);
    const uid = sessionStorage.getItem("user");
    useEffect(() => {
        getUser(uid).onSnapshot((res)=>{
            setInfo(res);
        });
        
    });
    
    
    const handleUploaded = e => {
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        reader.onload = function () {
            setFile(reader.result)
        }

        reader.readAsDataURL(file);

    }
    return (
        <div>
            <form>
                {files &&
                    <img src={files} height="100" width="100" />
                }
                <input type="file" name="file" onChange={handleUploaded} />
                <TextField
                            id="standard-name"
                            label="Correo"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                            type="email"
                            margin="normal"
                        />
                        <TextField
                            id="standard-password-input"
                            label="Nombre"
                            type="password"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            margin="normal"
                        />
            </form>


        </div>
    );
}

export default Perfil;