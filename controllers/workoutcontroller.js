const Express = require('express');
const router = Express.Router();
const { LogModel } = require('../models');
const middleware = require('../middleware');

//router.get('/', (req, res) => {
//res.send('Hello!')
//});

router.get('/', async(req, res) => {
    try {
        const allLogs = await LogModel.findAll()    
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})
                    //does it need validateJWT
router.post("/log", async (req, res) => {
    const {definition, description, results} = req.body.log;
    const{ id } = req.user;
    const logEntry = {
        description,
        definition,
        results,
        ower_id: id
    }


    try{
      const logEntry = await LogModel.create({
        username, passwordhash
      })
        res.status(200).json({
          message: "User successfully created",
          updatedLog: updateLog
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to create user ${err}`
      })
    }
  })
//not sure how to add in owner_id


router.post("/log", async (req, res) => {
    const {description, definition, result
    } = req.body;


    try{
      const LogModel = await LogModel.create({
        description, definition, result
      })
        res.status(200).json({
          message: "Log successfully created",
          updatedLog: updateLog
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to create log ${err}`
      })
    }
  })



router.get("/read/owner_id:", async (req, res) => {
    try{
      const updateLog = await LogModel.update({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Log successfully updated",
          updatedLog: updateLog
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to update log ${err}`
      })
    }
  })


  router.get("/read/owner_id:", async (req, res) => {
    try{
      const viewLog = await LogModel.findAll({
        where: {id: req.params}
      })
        res.status(200).json({
          message: "Viewing All User Log Entries",
          viewedLog: viewLog
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to view user history logs ${err}`
      })
    }
  })
  router.get("/read/owner_id:", async (req, res) => {
    try{
      const viewLog = await LogModel.show({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Viewing Log",
          viewedLog: viewLog
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to view log ${err}`
      })
    }
  })

  router.put("/update/owner_id:", async (req, res) => {
    try{
      const updateLog = await LogModel.show({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Log Updated",
          updateLog: updateLog
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to update log ${err}`
      })
    }
  })

router.delete("/delete/owner_id:", async (req, res) => {
    try{
      const deleteLog = await LogModel.destroy({
        where: {id: req.params.id}
      })
        res.status(200).json({
          message: "Log successfully deleted",
          deletedLog: deleteLog
        })
    } catch(err){
      res.status(500).json({
        message: `Failed to delete log ${err}`
      })
    }
  })
module.exports = router;