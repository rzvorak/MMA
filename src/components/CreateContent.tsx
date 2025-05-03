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
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { getImages, uploadImage, deleteImage } from "@/actions/create";
import Image from "next/image";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


  
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

    const TextFormSchema = z.object({
        text: z
          .string()
          .min(0, {
            message: "Text must be at least 10 characters.",
          })
          .max(1000, {
            message: "Text must not be longer than 1000 characters.",
          }),
      })

    const form = useForm<z.infer<typeof TextFormSchema>>({
        resolver: zodResolver(TextFormSchema),
      })

    const handleSubmitText = (data: z.infer<typeof TextFormSchema>) => {
        console.log(JSON.stringify(data.text, null, 2));
    }

    const currentTextInput = form.watch("text") || ""


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
                            </DialogHeader>
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
                        </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer w-full" size="lg">
                        Add Text
                        <Text />
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitText)}>
                            <DialogHeader>
                                <DialogTitle>Add Text</DialogTitle>
                                    <FormField
                                        control={form.control}
                                        name="text"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Type your text here..."
                                                        className="resize-none mt-2 h-[12rem]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription >
                                                    {currentTextInput.length} / 1000 |   This can be a blog post, caption, announcement, etc.
                                                </FormDescription>

                                            </FormItem>
                                        )}
                                    />
                            </DialogHeader>
                            <DialogFooter>
                                <div className="w-full flex flex-row gap-4">

                                    <Button 
                                        variant="outline" 
                                        className="flex-1 cursor-pointer mt-4" 
                                        onClick={() => form.reset({text: ""})}
                                    >
                                        {isPending ? <Loader2 className="animate-spin" /> : "Clear"}
                                    </Button>


                                <DialogClose asChild>
                                    <Button 
                                        className="flex-1 cursor-pointer mt-4"
                                        type="submit"
                                        disabled={isPending 
                                            || !currentTextInput 
                                            || currentTextInput.length < 10
                                            || currentTextInput.length > 1000}
                                    >
                                        {isPending ? <Loader2 className="animate-spin" /> : "Upload"}
                                    </Button>
                                </DialogClose>


                                </div>

                            </DialogFooter>
                        </form>
                    </Form>
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
