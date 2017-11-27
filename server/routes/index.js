const router = require('express').Router()
const taskController = require('../controllers/taskController')
const verifyLogin = require('../middlewares/verifyLogin')


router.get('/', taskController.findAll)
router.post('/', taskController.create)
router.put('/false/:id', taskController.updatefalse)
router.put('/true/:id', taskController.updatetrue)
router.delete('/:id', taskController.destroy)
// router.put('/:id/join', taskController.join)

module.exports = router
