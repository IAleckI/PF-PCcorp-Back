import { Model } from "sequelize";

export interface IUpload extends Model {
    id: string;
    url: string;
}