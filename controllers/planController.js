const planService = require('../services/planService')

const getPlanes = async(req, res) => {
    try {
        const planes = await planService.getPlanes();
        res.status(201).json(planes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getPlanById = async(req, res) => {
    const {id} = req.params;
    try {
        const plan = await planService.getPlanById(id);
        if (!plan) {
            return res.status(404).json({message: 'Plan no encontrado'})
        }
        res.status(201).json(plan)
        console.log("si se encontro el plan: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createPlan = async(req, res) => {
    try { 
        const Data = req.body;
        const newPlan = await planService.createPlan(Data);
        res.status(201).json(newPlan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updatePlan = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const planUpdate = await planService.updatePlan(id,Data);
        
        res.status(201).json(planUpdate);
        console.log("se actualizo el Plan en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPlanes, getPlanById, createPlan, updatePlan
}