const Pedidos = require('../models/Pedidos')


const ctrl = {}

//Crear nuevo pedido
ctrl.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body)

    try {
        
        await pedido.save()
        res.json({mensaje: 'Pedido agregado correctamente'})

    } catch (error) {
        
        console.log(error)
        next()

    }
}

//mostrar todos los pedidos
ctrl.mostrarPedidos = async (req, res, next) => {
    try {

        const pedidos = await Pedidos.find({})
                                    .populate('cliente')  //si el populate es muy sencillo
                                    .populate(
                                    {
                                        path: 'pedido.producto', //path a buscar, se pone el nombre que contiene el arreglo + nombre del campo a popular
                                        model: 'Productos'   //Colocar el nombre del modelo a popular, mismo modelo como se haya nombrado modelo externo
                                    })
        res.json(pedidos)

    } catch (error) {
               
        console.log(error)
        next()

    }
}

//mostrar pedidos por ID
ctrl.mostrarPedido = async (req, res, next) => {
    try {
        
        const pedido = await Pedidos.findById(req.params.id)
                                    .populate('cliente')
                                    .populate(
                                    {
                                        path: 'pedido.producto',
                                        model: 'Productos'
                                    })
        
        if(!pedido) {
            return res.json({mensaje: 'Pedidos no existe'})
        }

        return res.json(pedido)

    } catch (error) {
                     
        console.log(error)
        next()

    }
}


//actualizar pedido por ID
ctrl.actualizarPedido = async (req, res, next) => {
    try {

        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        })
        .populate('cliente')
        .populate(
        {
            path: 'pedido.producto',
            model: 'Productos'
        })

        return res.json(pedido)

    } catch (error) {
                          
        console.log(error)
        next()

    }
}

//eliminar pedido por ID
ctrl.eliminarPedido = async (req, res, next) => {
    try {
        
        await Pedidos.findOneAndDelete({_id: req.params.id})
        return res.json({mensaje: 'Pedido eliminado'})

    } catch (error) {
                           
        console.log(error)
        next()

    }
}

module.exports = ctrl