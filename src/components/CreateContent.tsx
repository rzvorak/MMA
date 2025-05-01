"use client";

import React, { startTransition, useState, useTransition } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Camera, Video, Text, MessageCircle, Loader2 } from "lucide-react";
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
import { getImages, uploadImage, deleteImage } from "@/actions/create";
import Image from "next/image";


  
const CreateContent = () => {
    const [isPending, startTransition] = useTransition();
    const [currrentImage, setCurrentImage] = useState<string | null>(null);

    const handleSubmitImage = (file: File | null) => {
        startTransition(async () => {

            if (!file) {
                toast("Please select a file to upload.");
                return;
            }

            const imageUrl = await uploadImage(file);
    
            if (imageUrl) {
              toast("Image uploaded successfully: " + imageUrl);
            } else {
              toast("Error uploading image");
            }

            const images = await getImages()

            setCurrentImage(images ? images[0] : null)
            setImageFile(null)

        });
    };

    const handleDeleteImage = (imageUrl: string) => {
        startTransition(async () => {
            const imageName = imageUrl.split("/").pop()

            if (!imageName) {
                toast("Error deleting image: Image name not found.");
                return;
            }

            await deleteImage(imageName)
            setCurrentImage(null)

            toast("Image deleted successfully: " + imageName);
        });
    }

    const [imageFile, setImageFile] = useState<File | null>(null); 

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; 
    
        if (selectedFile) {
          // this is a double check       
          if (!selectedFile.name.endsWith(".png") 
            && !selectedFile.name.endsWith(".jpg") 
            && !selectedFile.name.endsWith(".jpeg")) {
            toast("Please select a valid image file.");
            return;
          }
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
                                    <Input 
                                        type="file" 
                                        onChange={handleImageFileChange} 
                                        className="mt-2 cursor-pointer"
                                        disabled={isPending}
                                        accept=".jpg, .jpeg, .png"
                                    />
                                <DialogDescription>
                                    Accepted file types: .jpg, .jpeg, .png
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button 
                                            className="w-full cursor-pointer mt-4"
                                            onClick={() => handleSubmitImage(imageFile)}
                                            disabled={isPending || !imageFile}
                                        >
                                            {isPending ? <Loader2 className="animate-spin" /> : "Upload"}
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
            {imageFile ? imageFile.name : "No file selected"}

            {currrentImage ?             
            <>
                <img src={currrentImage} alt="image" width={500} height={500}/>
                <Button onClick={() => handleDeleteImage(currrentImage)} >Delete</Button>
            </>
            : null}
        </div>
      </div>
      
    </div>
  );
};

export default CreateContent;
