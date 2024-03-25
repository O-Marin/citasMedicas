import express from 'express';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment'
import _ from 'lodash'
import chalk from 'chalk';


//const axios = require('axios');
const app = express();
const port = 3000;
let url = 'https://randomuser.me/api/';
const usuarios = []

/**mar 25 11:49 
 * crear objetos usuarios agregando el id y el timestamp -done
 * para filtrar el array usar _.filter de lodash
*/

app.get('/usuarios',(req,res)=>{
    axios.get(url).then(response =>{   
        usuarios.push({gender:response.data.results[0].gender , name : response.data.results[0].name.first ,lastName: response.data.results[0].name.last , ID:uuidv4(), timeStamp: moment().format('LLL')})    
        const usuariosSeparadosPorGenero = _.partition(usuarios,{gender:'female'})
        const template = 
        `
            <h4> Mujeres </h4>
            <ol>
                ${usuariosSeparadosPorGenero[0].map(user=>{
                    return `<li>Nombre: ${user.name} - ${user.lastName} - ${user.ID} - ${user.timeStamp}</li>`
                })}
            </ol>


            <h4> Hombres </h4>
            <ol>
                ${usuariosSeparadosPorGenero[1].map(user=>{
                    return `<li>Nombre: ${user.name} - ${user.lastName} - ${user.ID} - ${user.timeStamp}</li>`
                })}
            </ol>
        `
                usuarios.forEach(user =>{
                    console.log(chalk.blue.bgWhite(`Nombre: ${user.name} - Apellido: ${ user.lastName} - ID: ${user.ID} - Timestamp: ${user.timeStamp}`))
                   
                })
                console.log(chalk.redBright('----------------------------------------------------'))
        res.send(template)
        }).catch(function(error){
            console.log(error)
        })
    })
    
    
   
app.listen(port,()=>{console.log(`servidor conectado al puerto ${port}`)});