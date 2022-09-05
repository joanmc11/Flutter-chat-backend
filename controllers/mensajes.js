
const Mensajes = require('../models/mensaje');

const obtenerChat = async(req, res)=>{
    const miId = req.uid;
    const mensajeDe = req.params.de;

    const last30 = await Mensajes.find({
        $or: [{ de: miId, para: mensajeDe }, {de: mensajeDe, para: miId}]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);



    res.json({
        ok:true,
        miId,
        mensajes: last30
    })

}

module.exports={
    obtenerChat
}