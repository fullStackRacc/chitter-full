import { PhotographIcon, XIcon } from '@heroicons/react/outline'
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon } from '@heroicons/react/outline'
import React, { useState, useRef, useEffect } from 'react'
import TextareaAutoSize from 'react-textarea-autosize'
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
  

const Input = () => {
    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const filePickerRef = useRef(null)

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result);
        };
    };
    
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
      };

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll `}>
        <img 
            src='https://pbs.twimg.com/profile_images/1523174916438253568/_NkIdHSd_400x400.jpg' 
            alt='' 
            className='h-11 w-11 rounded-full cursor-pointer'
        />
        <div className='w-full divide-y divide-gray-700'>
            <div className={``}>
                <TextareaAutoSize 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    minRows={3}
                    className='bg-transparent outline-none text-chitter-text text-lg placeholder-gray-500 tracking-wide resize-none w-full' 
                    placeholder="Just screm"    
                />
                {selectedFile && (
                    <div className='relative'>
                    <div 
                        className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 
                        rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                        onClick={() => setSelectedFile(null)}    
                    >
                        <XIcon className='text-chitter-text h-5' />
                    </div>
                    <img 
                        src={selectedFile} 
                        alt="" 
                        className='rounded-2xl max-h-80 object-contain' 
                    />
                    </div> 
                )}
            </div>
            <div className='flex items-center justify-between pt-2.5'>
                <div className='flex items-center'>
                    <div className='icon' onClick={() => filePickerRef.current.click()}>
                        <PhotographIcon className='h-[22px] text-chitter-base' />
                        <input hidden type='file' onChange={addImageToPost} ref={filePickerRef} />
                    </div>
                    
                    <div className="icon rotate-90">
                        <ChartBarIcon className="text-chitter-base h-[22px]" />
                    </div>

                    <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                        <EmojiHappyIcon className="text-chitter-base h-[22px]" />
                    </div>

                    <div className="icon">
                        <CalendarIcon className="text-chitter-base h-[22px]" />
                    </div>

                    {showEmojis && (
                        <Picker
                            onSelect={addEmoji}
                            style={{
                            position: "absolute",
                            marginTop: "465px",
                            marginLeft: -40,
                            maxWidth: "320px",
                            borderRadius: "20px",
                            }}
                            theme="dark"
                        />
                    )}
                </div>
                <button className='bg-chitter-base text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-chitter-dark disabled:hover:bg-chitter-darker disabled:opacity-50 disabled:cursor-default'>Screm</button>
            </div>
        </div>
    </div>
  )
}

export default Input