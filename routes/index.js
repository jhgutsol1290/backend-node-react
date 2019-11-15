const { Router } = require('express')
const { 
    nuevoCliente, 
    mostrarClientes, 
    mostrarCliente, 
    actualizarCliente, 
    eliminarCliente 
} = require('../controllers/clienteController')

const { 
    nuevoProducto,
    subirArchivo,
    mostrarProductos,
    mostrarProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProducto
} = require('../controllers/productosController')

const { 
    nuevoPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
} = require('../controllers/pedidosController')

const {
    registrarUsuario,
    autenticarUsuario
} = require('../controllers/usuariosController')

//middleware para proteger las rutas
const auth = require('../middleware/auth')

const router = Router()

/****************CLIENTES***************/

//Mostrar todos los clientes
router.get('/clientes', 
    auth,
    mostrarClientes
)

// Agrega nuevos clientes via POST
router.post('/clientes',
    auth,  
    nuevoCliente
)

//mostrar un sólo cliente por ID
router.get('/clientes/:id', 
    auth,
    mostrarCliente
)

//actualizar cliente
router.put('/clientes/:id', 
    auth,
    actualizarCliente
)

//eliminar cliente
router.delete('/clientes/:id', 
    auth,
    eliminarCliente
)


/****************PRODUCTOS***************/

//nuevos Productos
router.post('/productos', 
    auth,
    subirArchivo, 
    nuevoProducto
)

//mostrar productos
router.get('/productos', 
    auth,
    mostrarProductos
)

//mostrar producto por ID
router.get('/productos/:id', 
    auth,
    mostrarProducto
)

//actualizar producto
router.put('/productos/:id',
    auth,
    subirArchivo,
    actualizarProducto
)

//eliminar productos por ID
router.delete('/productos/:id', 
    auth,
    eliminarProducto
)

//busqueda de productos
router.post('/productos/busqueda/:query', 
    buscarProducto
)


/****************PEDIDOS***************/

//crear pedidos
router.post('/pedidos/nuevo/:id', 
    auth,
    nuevoPedido
)

//mostrar todos los pedidos
router.get('/pedidos', 
    auth,
    mostrarPedidos
)

//mostrar pedido por ID
router.get('/pedidos/:id', 
    auth,
    mostrarPedido
)

//actualizar pedido por ID
router.put('/pedidos/:id', 
    auth,
    actualizarPedido
)

//eliminar pedido por ID
router.delete('/pedidos/:id', 
    auth,
    eliminarPedido
)

/*********USUARIOS*******/

//crear cuenta
router.post('/crear-cuenta', 
    auth,
    registrarUsuario
)

//inicira sesión
router.post('/iniciar-sesion', autenticarUsuario)


module.exports = router