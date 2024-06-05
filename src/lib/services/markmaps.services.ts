import { dbConnect } from "$lib/db";
import { MarkMapModel } from "$lib/models";
import type { MarkMap } from "$lib/interfaces";
import type { UpdateWriteOpResult } from "mongoose";

export const getMarkMaps = async (): Promise<MarkMap[]> => {
    await dbConnect();
    const res = await MarkMapModel.find({});
    console.log(res);
    return res;
};

export const getMarkMap = async (id: string): Promise<MarkMap> => {
    await dbConnect();
    const res = await MarkMapModel.findOne({ short_id: id });
    console.log(res);
    return res;
};

export const addMarkMap = async (markmap: MarkMap): Promise<MarkMap> => {
    await dbConnect();
    const res = await MarkMapModel.create(markmap);
    console.log(res);
    return res;
};

export const updateMarkMap = async (id: string, markmap: Partial<MarkMap>): Promise<UpdateWriteOpResult> => {
    await dbConnect();
    const res = await MarkMapModel.updateOne({ short_id: id }, markmap);
    console.log(res);
    return res;
};

export const deleteMarkMap = async (id: string) => {
    await dbConnect();
    const res = await MarkMapModel.deleteOne({ short_id: id });
    console.log(res);
    return res;
}