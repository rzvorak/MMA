"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export const uploadImage = async (file: File) => {
    try {
        const filePath = `images/${Date.now()}_${file.name}`;

        // Upload file to Supabase storage
        const { data, error } = await supabase.storage
            .from("images")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        // Debugging: Check if there was an error or if data is returned
        if (error) {
            console.error('Upload error:', error);
            throw error;
        }

        console.log('Upload success:', data); // Check what data you get back after upload

        // Get the public URL of the uploaded file
        const { data: urlData} = supabase.storage
            .from("images")
            .getPublicUrl(filePath);

        if (!urlData) {
            console.error('Error fetching public URL:');
        }

        console.log('Public URL:', urlData?.publicUrl); // Debug the public URL
        return urlData?.publicUrl; // Return the public URL
    } catch (error) {
        handleError(error); // Handle any errors that may occur
        return undefined;
    }
};






