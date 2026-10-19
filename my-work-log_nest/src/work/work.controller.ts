import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { WorkService } from './work.service';
import { type AddWork } from './dto/addWork';
import { Work } from './schema/work.schema';

@Controller('work')
export class WorkController {

    constructor(private readonly workService: WorkService) {}

    @Get()
    public async getAllWork(){
        return await this.workService.GetAllWork();
    }

    @Post()
    public async addWork(@Body() work: AddWork) {
        const obj : Work = {
            date: work.date,
            explanation: work.explanation ?? ""
        }
        return await this.workService.addWork(obj);
    }

    @Delete(":id")
    public async deleteWork(@Param('id') id: string){
        await this.workService.deleteWork(id);
    }

}
