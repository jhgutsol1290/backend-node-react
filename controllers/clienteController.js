const Clientes = require('../models/Clientes')
const ctrl = {}


//Ctrl para mostrar todos los clientes
ctrl.mostrarClientes = async (req, res, next) => {
    try {
        
        const clientes = await Clientes.find({})
        res.json(clientes)

    } catch (error) {
        console.log(error)
        next()
    }
}


//Ctrl para crear nuevo cliente
ctrl.nuevoCliente = async (req, res, next) => {
    
    const cliente = new Clientes(req.body)

    try {
        //atlmacenar el registro
        await cliente.save()
        return res.json({mensaje: 'Cliente agregado satisfactoriamente'})
        
    } catch (error) {

        res.send(error)
        next()

    }
}


//Ctrl para mostrar sólo un cliente en específico (ID)
ctrl.mostrarCliente = async (req, res, next) => {

    const { id } = req.params
    try {
        
        const cliente = await Clientes.findById(id)

        if(!cliente) {
            return res.json({mensaje: 'ID no existe'})
        }

        return res.json(cliente)

    } catch (error) {
        
        console.log(error)
        next()

    }

}

//Actualiza cliente por ID
ctrl.actualizarCliente = async (req, res, next) => {

    const { id } = req.params

    try {

        const cliente = await Clientes.findOneAndUpdate({ _id: id }, req.body, {
            new: true
        })

        res.json(cliente)

    } catch (error) {
               
        res.send(error)
        next()

    }
}

//Eliminar cliente por ID
ctrl.eliminarCliente = async (req, res, next) => {

    const { id } = req.params

    try {

        const cliente = await Clientes.findByIdAndDelete({ _id: id })

        res.json({mensaje: 'El cliente se ha eliminado'})

    } catch (error) {
               
        console.log(error)
        next()

    }
}

module.exports = ctrl