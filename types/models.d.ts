import mongoose from 'mongoose';

interface ISped extends mongoose.Document {
    speed: number;
    timestamp: Date;
}

interface IStat extends mongoose.Document {
    mean: number;
    std: number;
    min: number;
    median: number;
    max: number;
    sampleSize: number;
    timestamp: Date;
}

interface IRawStats {
    mean: number;
    std: number;
    min: number;
    median: number;
    max: number;
    sampleSize: number;
    timestamp: Date;
}

export { ISped, IStat, IRawStats };
