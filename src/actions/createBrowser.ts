"use client";

import { createClient } from "@/auth/browser";
import { handleError } from "@/lib/utils";
import { getUser } from "./users";
import {v4 as uuidv4} from "uuid";

export const uploadVideo = async (file: File) => {
    try {
        const client = await createClient();
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const filePath = `${user.id}/${uuidv4()}`;

        const { data, error } = await client.storage
            .from("videos")
            .upload(filePath, file);

        if (error) throw error;

        const { data: urlData} = client.storage
            .from("videos")
            .getPublicUrl(filePath);

        if (!urlData) {
            console.error('Error fetching public URL:');
        }

        return urlData?.publicUrl; 
    } catch (error) {
        handleError(error);
        return null;
    }
};