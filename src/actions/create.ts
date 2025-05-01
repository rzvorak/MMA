"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { getUser } from "./users";
import {v4 as uuidv4} from "uuid";

export const uploadImage = async (file: File) => {
    try {
        const client = await createClient();
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const filePath = `${user.id}/${uuidv4()}`;

        const { data, error } = await client.storage
            .from("images")
            .upload(filePath, file);

        if (error) throw error;

        const { data: urlData} = client.storage
            .from("images")
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

export const getImages = async () => {
    try {
        const client = await createClient();
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const { data, error } = await client.storage
            .from("images")
            .list(user.id, {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" },
            });

        if (error) throw error;

        const urls = data.map((image) => {
            const {data} = client.storage
                .from("images")
                .getPublicUrl(`${user.id}/${image.name}`);
            return data?.publicUrl;
        })

        return urls || [];
    } catch (error) {
        handleError(error);
        return null;
    }
}

export const deleteImage = async (imageName: string) => {
    try {
        const client = await createClient();
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const { error } = await client.storage
            .from("images")
            .remove([`${user.id}/${imageName}`]);

    } catch (error) {
        handleError(error);
        return null;
    }
}






