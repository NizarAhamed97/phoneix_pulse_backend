import express, { Router } from 'express';
import membersRouter from './members/index';  // Import the Members router
import staffRouter from './staff';
import attendanceRouter from './attendance';
import dashboardRouter from './dashboard';
import authRoutes from './auth'; 


// Create a main router to combine all submodules
const mainRouter = Router();



// Use members submodule router
mainRouter.use('/members', membersRouter);
mainRouter.use('/staffs', staffRouter); // Add staff routes here
mainRouter.use("/attendance",attendanceRouter)
mainRouter.use("/dashboard",dashboardRouter)
mainRouter.use('/auth', authRoutes);



export default mainRouter;
