const express=require('express');
const router=express.Router();
const initializeDatabase=require('../controllers/initializeController');

router.post('/',initializeDatabase);

module.exports=router;