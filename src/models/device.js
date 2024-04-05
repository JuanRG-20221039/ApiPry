import mongoose from 'mongoose';

const dispositivoSchema = new mongoose.Schema({
    name:{type:String},
    estado: { type: Number, required: true },
    cerradura: { type: Number, required: true },
    pir: { type: Number, required: true },
    lluvia: { type: Number, required: true },
    asignado: { type: Boolean }
}, { timestamps: true });

const Dispositivo = mongoose.model('Dispositivo', dispositivoSchema);

export default Dispositivo;