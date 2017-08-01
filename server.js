import Config from './config';
import express from 'express';

import apiRouter from './api';

const server=express();

//set listening port
server.listen(Config.port,()=>{
  console.info('Express listening on port', Config.port);
});

server.use(express.static('public'));/*use the static content in public folder
                                        to serve*/

server.get('/',(req,res)=>{
  res.render('index');
});

server.use('/api',apiRouter);



// server.get('/recharts',(req,res)=>{
//
// });
