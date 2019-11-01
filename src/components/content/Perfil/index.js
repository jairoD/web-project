import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, TextField, ListItem, ListItemText } from '@material-ui/core';
import { getUser, updateUser } from './../../services/firebase';

function Perfil() {
    const [files, setFile] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [userInfo, setInfo] = useState(null);
    const uid = sessionStorage.getItem("user");
    useEffect(() => {
        getUser(uid).onSnapshot((res) => {
            setInfo(res);
        });
    });

    function update(e){
        e.preventDefault();
        console.log(files[0]);
        updateUser(uid).update({
            nombre: nombre,
            perfil: files
        }).then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }


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
                <div>
                    <h1>Previsualizacion</h1>
                    <img src={files} height="100" width="100" />
                    </div>
                }
                <input type="file" name="file" onChange={handleUploaded} />
                {
                    userInfo &&
                    <div>
                        <h1>Imagen Perfil</h1>
                        <img src={userInfo.data().perfil} height="100" width="100" />
                        <ListItem button>

                            <ListItemText>
                                <TextField
                                    id="standard-password-input"
                                    label="Nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    margin="normal"
                                />
                                <br></br>
                                {'Correo: ' + userInfo.data().correo}
                            </ListItemText>
                        </ListItem>
                    </div>
                    
                }
                <button type="button" onClick={update}>Actualizar</button>
                {/** 
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
                        */}
            </form>


        </div>
    );
}

export default Perfil;