import mongoose from "mongoose";
import type { MarkMap } from "$lib/interfaces";

export const MarkMapSchema = new mongoose.Schema<MarkMap>(
    {
        title: {
            type: String,
            required: true
        },
        short_id: {
            type: String,
            required: true
        },
        markdown: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: "markmaps"
    }
);

export const MarkMapModel = mongoose.models['markmaps'] || mongoose.model('markmaps', MarkMapSchema);