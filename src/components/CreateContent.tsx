"use client";

import React, { startTransition, useState, useTransition } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Camera, Video, Text, MessageCircle } from "lucide-react";


import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { toast } from "sonner";
import { uploadImage } from "@/actions/create";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// const imageUploadSchema = z.object({
//     file: z.instanceof(File).refine((file) => {
//         const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"];
//         return acceptedFileTypes.includes(file.type);
//     }, {
//         message: "Invalid file type. Only .jpg, .png, and .gif are allowed.",
//     }),
// })
  
const CreateContent = () => {
    const [isPending, startTransition] = useTransition();

    // const imageForm = useForm<z.infer<typeof imageUploadSchema>>({
    //     resolver: zodResolver(imageUploadSchema),
    //     defaultValues: {
    //         file: undefined,
    //     },
    // })

    const handleSubmitImage = (file: File | null) => {
        startTransition(async () => {

            console.log('made it here')

            if (!file) {
                toast("Please select a file to upload.");
                return;
            }

            const imageUrl = await uploadImage(file);

            console.log(imageUrl);
    
            if (imageUrl) {
              toast("Image uploaded successfully: " + imageUrl);
            } else {
              toast("Error uploading image");
            }
          });
    };

    const [imageFile, setImageFile] = useState<File | null>(null); 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; 
    
        if (selectedFile) {       
          setImageFile(selectedFile); 
        }
      };


  return (
    <div className="flex w-full flex-1 flex-col px-4">
      <div className="xs:gap-0 xs:flex-row flex h-full flex-col gap-8">
        <div className="flex flex-1 flex-col items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full cursor-pointer" size="lg">
                        Add Video
                        <Video />
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Upload Video</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full cursor-pointer" size="lg">
                        Add Image
                        <Camera />
                    </Button>
                </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload Image</DialogTitle>

                                    <Input type="file" onChange={handleFileChange} />


                                <DialogDescription>
                                    Accepted file types: .jpg, .png, .gif
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button 
                                            className="w-full cursor-pointer mt-4"
                                            onClick={() => handleSubmitImage(imageFile)}
                                        >
                                            Upload
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogHeader>
                        </DialogContent>

            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer w-full" size="lg">
                        Text
                        <Text />
                    </Button>
                </DialogTrigger>

                
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Text</DialogTitle>
                            <Input type="file" className="mt-2 cursor-pointer"  />
                            <DialogDescription>
                                
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                
            </Dialog>


            <Toggle variant="outline" className="w-full" size="lg">
                
                <Text />
            </Toggle>

            <Toggle variant="outline" className="w-full" size="lg">
                Comments
                <MessageCircle />
            </Toggle>
            
        </div>
        <div className="flex flex-1 flex-col justify-center">
            
        </div>
      </div>
      
    </div>
  );
};

export default CreateContent;
