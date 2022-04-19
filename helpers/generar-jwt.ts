import jwt from 'jsonwebtoken'
export const generarJWT = (uid = '')=>{
    return new Promise((resolve,reject)=>{
        const payload = { uid };
        const secretkey = process.env.SECRETORPRIVATEKEY || '';
        jwt.sign(payload, secretkey,{
            expiresIn: '4h'
        },(err, token)=>{
            if (err) {
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}