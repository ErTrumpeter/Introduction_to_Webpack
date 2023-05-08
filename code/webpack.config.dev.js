const path = require('path')                         // Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.js',                        // el punto de entrada de mi aplicación
    output: {                                       // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),      // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo para no tener conflictos entre Linux, Windows, etc
        filename: '[name].[contenthash].js',                        // EL NOMBRE DEL ARCHIVO FINAL,
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],                         // LOS ARCHIVOS QUE WEBPACK VA A LEER
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [ MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                // test: /\.(woof|woof2)$/,
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000,       // O LE PASAMOS UN BOOLEANOS TRUE O FALSE  // Habilita o deshabilita la transformación de archivos en base64.
                //         mimetype: 'application/font-woff',      // Especifica el tipo MIME con el que se alineará el archivo. // Los MIME Types (Multipurpose Internet Mail Extensions) son la manera standard de mandar contenido a través de la red.
                //         name: '[name].[contenthash].[ext]',                   // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN. PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria ubuntu-regularhola.woff
                //         outputPath: './assets/fonts/',          // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                //         publicPath: '../assets/fonts/',          // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                //         esModule: false,                        // AVISAR EXPLICITAMENTE SI ES UN MODULO
                //     },
                // }

                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                filename: "assets/fonts/[hash][ext]",
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                }
            ]
        }),
        new Dotenv(),
    ],
}

