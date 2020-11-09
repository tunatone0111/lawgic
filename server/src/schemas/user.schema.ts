import {Document, Types} from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prec } from './prec.schema';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    isAdmin: boolean;

    @Prop({type: [Types.ObjectId], ref: Prec.name})
    likedPrecs: [Prec];
}

export const UserSchema = SchemaFactory.createForClass(User);