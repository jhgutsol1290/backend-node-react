const Productos = require('../models/Productos')
const multer = require('multer')
const shortid = require('shortid')
const fs = require('fs-extra')
const path = require('path')

const ctrl = {}


const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');


//subir archivo
ctrl.subirArchivo = async (req, res, next) => {
    upload(req, res, (error) => {
        if(error) {
            return res.json({mensaje: error})
        }

        return next()
    })
}

//Crear un porducto
ctrl.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body)

    try {

        //si existe archivo instancia de producto se le asigna ese archivo
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }

        await producto.save()
        return res.json({mensaje: 'Producto agregado correctamente'})

    } catch (error) {
        
        console.log(error)
        next()

    }
}

//Mostrar todos los productos
ctrl.mostrarProductos = async (req, res, next) => {
    try {
        
        const productos = await Productos.find({})
        res.json(productos)

    } catch (error) {
               
        console.log(error)
        next()

    }
}

//mostrar un sólo producto por ID
ctrl.mostrarProducto = async (req, res, next) => {
    try {
        
        const producto = await Productos.findById(req.params.id)

        if(!producto) {
            return res.json({mensaje: 'No existe ese producto'})
        }

        return res.json(producto)

    } catch (error) {
                       
        console.log(error)
        next()

    }
}

//actualizar un porducto
ctrl.actualizarProducto = async (req, res, next) => {
    try {
        
        //construir un nuevo producto
        let nuevoProducto = req.body

        //verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {

            let productoAnterior = await Productos.findById(req.params.id)
            nuevoProducto.imagen = productoAnterior.imagen

        }

        const producto = await Productos.findOneAndUpdate({_id: req.params.id}, nuevoProducto, {
            new: true
        })

        res.json(producto)

    } catch (error) {
                               
        console.log(error)
        next()

    }
}

//eliminar producto por ID
ctrl.eliminarProducto = async (req, res, next) => {
    try {
        
        const producto = await Productos.findOne({_id: req.params.id})

        if(producto) {

            await fs.unlink(path.resolve('../restapis/uploads/' + producto.imagen))
            await producto.remove()
            return res.json({mensaje: 'Producto eliminado correctamente'})

        } else {
            return res.status(404).json({mensaje: 'ID no existe'})
        }

    } catch (error) {
                                   
        console.log(error)
        next()

    }
}

ctrl.buscarProducto = async (req, res, next) => {
    try {
        
        const { query } = req.params
        const producto = await Productos.find({nombre: new RegExp(query, 'i')})
        res.json(producto)

    } catch (error) {
        
        console.log(error)
        next()

    }
}


module.exports = ctrl
