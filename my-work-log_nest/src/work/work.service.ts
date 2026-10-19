import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Work } from './schema/work.schema';
import { Model } from 'mongoose';

@Injectable()
export class WorkService {

    constructor(@InjectModel(Work.name) private readonly workModel: Model<Work>) { }

    public async GetAllWork(){
        return await this.workModel.find().exec();
    }

    public async addWork(work: Work) {
        return await this.workModel.create(work);
    }

    public async deleteWork(id: string) {
        const result = await this.workModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Work #${id} bulunamadı`);
        }
    }

}
