const express = require('express');
const { verifyToken } = require('../auth/middleware.cjs');
const prisma = require('../db/connection.cjs');
const availabilityRouter = express.Router();

//get availability
availabilityRouter.get('/:freelancerId/:serviceId', verifyToken, async (req, res, next) => {
  const { freelancerId, serviceId } = req.params;

  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        freelancerId: parseInt(freelancerId),
        serviceId: parseInt(serviceId)
      }
    });

    res.send(availabilities);
  } catch (error) {
    next(error);
  }
});

//create 
availabilityRouter.post('/', verifyToken, async (req, res, next) => {
  const { freelancerId, serviceId } = req.body;

  try {
    const newAvailability = await prisma.availability.create({
      data: {

        freelancerId: parseInt(freelancerId),
        serviceId: parseInt(serviceId)

      }
    });

    res.status(201).json(newAvailability);
  } catch (error) {
    next(error);
  }
});

//update 
availabilityRouter.put('/:id', verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { freelancerId, serviceId } = req.body;

  try {
    const updatedAvailability = await prisma.availability.update({
      where: {

        id: parseInt(id)
      },

      data: {

        freelancerId: parseInt(freelancerId),
        serviceId: parseInt(serviceId)

      }
    });

    res.json(updatedAvailability);
  } catch (error) {
    next(error);
  }
});

//Delete 
availabilityRouter.delete('/:id', verifyToken, async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.availability.delete({
      where: {

        id: parseInt(id)

      }
    });
      
  } catch (error) {
    next(error);
  }
});


module.exports = availabilityRouter;
