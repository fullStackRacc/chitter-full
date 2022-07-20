import { PhotographIcon, SearchCircleIcon, XIcon } from '@heroicons/react/outline'
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon } from '@heroicons/react/outline'
import React, { useState, useRef, useEffect } from 'react'
import TextareaAutoSize from 'react-textarea-autosize'
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from 'next-auth/react';

const Input = () => {
    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [charsLeft, setCharsLeft] = useState(280)
    const [loading, setLoading] = useState(false)

    const { data: session } = useSession();

    const maxPostSize = 280;
    const filePickerRef = useRef(null)

    const inputHandler = (e) => {
        setInput(e)
        handleWordCount(e.length)
    }

    const handleWordCount = (e) => {
        const charCount = e
        const charLeft = maxPostSize - charCount
        setCharsLeft(charLeft)
    }

    const postLengthBarText = () => {
        if (input.length >= 280 ) {
            return 'text-red-600 text-sm'
        }
        else if (input.length >= 260) {
            return 'text-gray-500 text-sm'
        }
        else {
            return 'hidden'
        }
    }

    const handleCircleSize = () => {
        if (input.length >= 260) {
            return 'w-[35px] h-[35px]'
        }
        else {
            return 'w-[22px] h-[22px]'
        }
    }

    const handlePathColor = () => {
        if (input.length >= 280 ) {
            return '#F4212E'
        }
        else if (input.length >= 260) {
            return '#FFD400'
        }
        else {
            return '#7F50F5'
        }
    }

    const sendPost = async () => {
        if(loading) return
        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, 'data_url')
                .then(async () => {
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db, 'posts', docRef.id), {
                        image: downloadURL,
                    })
            })
        }

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    }

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
    <div className={`border-b border-gray-700 p-3 flex space-x-3 ${loading && 'opacity-60'}`}>
        <img 
            src='https://pbs.twimg.com/profile_images/1523174916438253568/_NkIdHSd_400x400.jpg' 
            alt='' 
            className='h-11 w-11 rounded-full cursor-pointer'
        />
        <div className='w-full overflow-hidden divide-y divide-gray-700'>
            <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
                <TextareaAutoSize
                    value={input} 
                    onChange={(e) => {
                        inputHandler(e.target.value)
                    }}
                    minRows={2}
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
            {!loading && (
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
                <div className={input.trim() ? 'ml-auto mr-3' : 'hidden'}>
                    <CircularProgressbarWithChildren 
                        className={handleCircleSize()}
                        maxValue={maxPostSize}
                        styles={buildStyles({
                            pathColor: handlePathColor(),
                            pathTransitionDuration: 'none',
                            trailColor: '#2F3336',
                        })}
                        strokeWidth='8'
                        value={input.length}
                    >
                        <div className={postLengthBarText()}>{charsLeft}</div>
                    </CircularProgressbarWithChildren>
                </div>
                <button className='bg-chitter-base text-white rounded-full px-4 py-1.5 
                font-bold shadow-md hover:bg-chitter-dark disabled:hover:bg-chitter-dark 
                disabled:opacity-50 disabled:cursor-default' 
                disabled={!input.trim() && !selectedFile} onClick={sendPost}>
                    Screm
                </button>
                </div>
        )}
            
        </div>
    </div>
  )
}

export default Input