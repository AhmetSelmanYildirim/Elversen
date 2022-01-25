const Responsible = require("../model/responsibleModel") 

const getResponsibles = async (req,res,next)=>{
    const responsibles = await Responsible.find({isActive: true})

    try {
        res.send(responsibles) 
    }
    catch (error) {
        res.send(error.message)
    }
}

module.exports={
    getResponsibles
}