import express, { Router } from 'express';
import membersRouter from './members/index';  // Import the Members router
import staffRouter from './staff';


// Create a main router to combine all submodules
const mainRouter = Router();

// Use members submodule router
mainRouter.use('/members', membersRouter);
mainRouter.use('/staffs', staffRouter); // Add staff routes here



export default mainRouter;
