import express from 'express';
import mapData from './map/110m';

const router=express.Router();

router.get('/test',(req,res)=>{
  res.send(mapData);
});


export default router;