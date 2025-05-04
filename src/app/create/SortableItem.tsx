"use client"

import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Image from 'next/image';
import { postItem } from './CreateContent';
import YouTube from 'react-youtube';

export function SortableItem(props: postItem) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="h-auto w-full cursor-pointer flex py-2 px-2 items-center ">

        {props.type === 'image' ? 
          // eventually make this a next/image component
          <div className="flex w-full items-center justify-center" >
            <img 
              src={props.content} 
              alt="image" 
              width={300} 
              height={300} 
              className="ml-2" 
            />
          </div>
          : null
        }

        {props.type === 'video' ? 
          <div className="flex w-full items-center justify-center" >
            <video 
              controls
              autoPlay={true} 
              preload="none" 
              width="100%"
              className="ml-2" 
            >
              <source src={props.content} type="video/mp4" />
            </video>
          </div>
          : null
        }

        {props.type === 'youtube' ? 
          <div className="flex w-full items-center justify-center" >
                <YouTube
                  videoId={props.content}
                  opts={{
                    height: "360",
                    width: "640",
                    playerVars: { autoplay: 0 },
                  }}
                />
          </div>
          : null
        }

        {props.type === 'text' ? 
          <p className="text-xs select-none">{props.content}</p>
          : null
        }

        {props.type === 'header' ? 
          <h1 className="text-lg font-bold select-none">{props.content}</h1>
          : null
        }
        
      </div>
        
    </div>
  );
}