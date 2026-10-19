import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: true })
export class Work {

    @Prop({ required: true })
    date!: string;

    @Prop({ required: false, default: "" })
    explanation!: string;
}

export const WorkSchema = SchemaFactory.createForClass(Work);