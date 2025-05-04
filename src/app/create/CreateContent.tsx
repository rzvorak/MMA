"use client";

import React, { startTransition, useState, useTransition } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Camera, Video, Text, MessageCircle, Loader2, Star, Scroll, ScrollText, Brain, Heart } from "lucide-react";
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

import { toast } from "sonner";
import { getImages, uploadImage, deleteImage } from "@/actions/create";
import { uploadVideo } from "@/actions/createBrowser";
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
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { Card } from "../../components/ui/card";

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
  } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import {SortableItem} from './SortableItem';
import { ScrollArea } from "../../components/ui/scroll-area";
import {v4 as uuidv4} from 'uuid'

export type postItem = {
    id: string;
    content: string;
    type: "image" 
        | "text" 
        | "header" 
        | "video" 
        | "survey" 
        | "quiz" 
        | "youtube";
}
  
const CreateContent = () => {
    const [isPending, startTransition] = useTransition();
    const [imageFile, setImageFile] = useState<File | null>(null); 
    const [videoFile, setVideoFile] = useState<File | null>(null); 
    const [youtubeLink, setYoutubeLink] = useState<string>("");


    const handleSubmitImage = (file: File | null) => {
        startTransition(async () => {

            if (!file) {
                toast("Please select a file to upload.");
                return;
            }

            const imageUrl = await uploadImage(file);

            if (!imageUrl) {
                toast("Error uploading image.");
                return;
            }

            setPostItems((prev) => [
                ...prev,
                {id: uuidv4(), content: imageUrl, type: "image"}
            ])
            
            setImageFile(null)

        });
    };

    const handleSubmitVideo= (file: File | null) => {
        startTransition(async () => {

            if (!file) {
                toast("Please select a file to upload.");
                return;
            }

            const videoUrl = await uploadVideo(file);

            if (!videoUrl) {
                toast("Error uploading video.");
                return;
            }

            setPostItems((prev) => [
                ...prev,
                {id: uuidv4(), content: videoUrl, type: "video"}
            ])
            
            setVideoFile(null)

        });
    };

    const handleDeleteImage = (imageUrl: string) => {
        startTransition(async () => {
            const imageName = imageUrl.split("/").pop()

            if (!imageName) {
                toast("Error deleting image.");
                return;
            }

            await deleteImage(imageName)

            toast("Image deleted successfully: " + imageName);
        });
    }

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

    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; 
    
        if (selectedFile) {
          // this is a double check       
          if (!selectedFile.name.endsWith(".mov") 
            && !selectedFile.name.endsWith(".mp4")) {
            toast("Please select a valid video file.");
            return;
          }
          setVideoFile(selectedFile); 
        }
    };

    const TextSchema = z.object({
        text: z.string().min(10).max(1000),
      });
      
      const HeaderSchema = z.object({
        header: z.string().min(1).max(50),
      });
      

      const textForm = useForm<z.infer<typeof TextSchema>>({
        resolver: zodResolver(TextSchema),
      });
      
      const headerForm = useForm<z.infer<typeof HeaderSchema>>({
        resolver: zodResolver(HeaderSchema),
      });
      

    const handleSubmitText = (data: z.infer<typeof TextSchema>) => {
        setPostItems((prev) => [
            ...prev,
            {id: uuidv4(), content: data.text, type: "text"}
        ])
        textForm.reset({ text: "" });
    }

    const handleSubmitHeader = (data: z.infer<typeof HeaderSchema>) => {
        setPostItems((prev) => [
            ...prev,
            {id: uuidv4(), content: data.header, type: "header"}
        ])
        headerForm.reset({ header: "" });
    }

    const currentTextInput = textForm.watch("text") || ""
    const currentHeaderInput = headerForm.watch("header") || ""

    const [postItems, setPostItems] = useState<postItem[]>([{id: "test", content: "QIyc6NKS5J0", type: "youtube"}]);


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

      function handleDragEnd(event: { active: any; over: any; }) {
        const { active, over } = event;
        if (active.id !== over.id) {
          setPostItems((items) => {
            const oldIndex = items.findIndex(i => i.id === active.id);
            const newIndex = items.findIndex(i => i.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }


  return (
    <div className="flex w-full flex-1 flex-col px-4 h-auto">
      <div className="xs:gap-2 xs:flex-col md:flex-row flex h-full flex-col gap-8">
        <div className="flex flex-col h-auto items-center">

            <div className="grid grid-cols-3 md:grid-cols-1 w-full">
                {/* video */}
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
                        
                            <Input 
                                type="file" 
                                onChange={handleVideoFileChange} 
                                className="mt-2 cursor-pointer"
                                disabled={isPending}
                                accept=".mov, .mp4"
                            />
                            <DialogDescription>
                                Accepted file types: .mov, .mp4
                            </DialogDescription>

                            <div className="w-full flex justify-center text-muted-foreground">
                                <p>- OR -</p>
                            </div>

                            <Input 
                                type="text"
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)} 
                                className="mt-2"
                                disabled={isPending}
                                accept=".mov, .mp4"
                            />
                            <DialogDescription>
                                Copy and paste a YouTube link here.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button 
                                    className="w-full cursor-pointer mt-4"
                                    onClick={() => handleSubmitVideo(videoFile)}
                                    disabled={isPending || !videoFile}
                                >
                                    {isPending ? <Loader2 className="animate-spin" /> : "Upload"}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* image */}
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

                {/* text */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer w-full" size="lg">
                            Add Text
                            <Text />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <Form {...textForm}>
                            <form onSubmit={textForm.handleSubmit(handleSubmitText)}>
                                <DialogHeader>
                                    <DialogTitle>Add Text</DialogTitle>
                                        <FormField
                                            control={textForm.control}
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
                                            onClick={() => textForm.reset({text: ""})}
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

                {/* header */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer w-full" size="lg">
                            Add Header
                            <Star />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <Form {...headerForm}>
                            <form onSubmit={headerForm.handleSubmit(handleSubmitHeader)}>
                                <DialogHeader>
                                    <DialogTitle>Add Header</DialogTitle>
                                        <FormField
                                            control={headerForm.control}
                                            name="header"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Type your header here..."
                                                            className="resize-none mt-2 h-[3rem]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription >
                                                        {currentHeaderInput.length} / 50 | This can title a photo, group sections, etc.
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
                                            onClick={() => headerForm.reset({header: ""})}
                                        >
                                            {isPending ? <Loader2 className="animate-spin" /> : "Clear"}
                                        </Button>


                                    <DialogClose asChild>
                                        <Button 
                                            className="flex-1 cursor-pointer mt-4"
                                            type="submit"
                                            disabled={isPending 
                                                || !currentHeaderInput 
                                                || currentHeaderInput.length <= 0
                                                || currentHeaderInput.length > 50}
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

                {/* survey */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer w-full" size="lg">
                            Add Survey
                            <ScrollText />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Survey</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button 
                                    className="flex-1 cursor-pointer mt-4"
                                >
                                    {isPending ? <Loader2 className="animate-spin" /> : "Save"}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* quiz */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer w-full" size="lg">
                            Add Quiz
                            <Brain />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Quiz</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button 
                                    className="flex-1 cursor-pointer mt-4"
                                >
                                    {isPending ? <Loader2 className="animate-spin" /> : "Save"}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>



            <div className="w-full flex flex-row justify-center gap-4 mt-2">
                <div className="flex flex-row items-center p-2">
                    <Switch 
                        id="likes" 
                        defaultChecked={true} 
                        className="cursor-pointer" 
                    />
                    <p className="ml-3 mr-2">Allow Likes</p>
                    <Heart size="1.1rem" />
                </div>

                <div className="flex flex-row items-center p-2">
                    <Switch 
                        id="comments" 
                        defaultChecked={true} 
                        className="cursor-pointer" 
                    />
                    <p className="ml-3 mr-2">Allow Comments</p>
                    <MessageCircle size="1.1rem" />
                </div>
            </div>
        </div>
        
        <ScrollArea className="max-h-115 md:w-2/3 mt-2 md:mt-0">
            <div className="h-full flex-col justify-center">
                <Card className="w-full rounded-none bg-background py-1">
                    <ScrollArea className="h-full w-full ">
                        <DndContext 
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
                        >
                            <SortableContext 
                                items={postItems.map(item => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {postItems.map(item => 
                                    <SortableItem 
                                        key={item.id} 
                                        id={item.id} 
                                        content={item.content}
                                        type={item.type}
                                    />
                                )}
                            </SortableContext>
                        </DndContext>
                    </ScrollArea>
                </Card>
                
            </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CreateContent;
