import React from 'react'
import {
    PaperAirplaneIcon,
    EmojiHappyIcon,
} from '@heroicons/react/outline'
import { MessagingInputProps } from '../../@types/Messaging'
import Picker, { IEmojiData } from 'emoji-picker-react'

interface MessageInputProps {
    values: MessagingInputProps
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export default function MessageInput({
    values,
    handleSubmit,
}: MessageInputProps): JSX.Element {
    const [message, setMessage] = React.useState('')
    const [emojiPicker, setEmojiPicker] = React.useState(false)

    return (
        <form
            className="flex sticky bottom-5 inset-x-0 shadow-sm bg-white border border-gray-200 rounded-md px-5 py-4 m-5"
            onSubmit={(e) => {
                e.preventDefault()
                values.message = message
                setEmojiPicker(false)
                handleSubmit()
                setMessage('')
            }}
        >
            <EmojiHappyIcon
                className="h-6 w-6 m-auto text-gray-400 cursor-pointer hover:text-varsity-500"
                aria-hidden="true"
                onClick={() => setEmojiPicker(!emojiPicker)}
            />

            <div
                className={`absolute bottom-20 left-0 ${!emojiPicker && 'hidden'
                    }`}
            >
                <Picker
                    onEmojiClick={(event: unknown, emojiObj: IEmojiData) =>
                        setMessage(`${message}${emojiObj.emoji}`)
                    }
                    disableAutoFocus={true}
                    disableSearchBar={true}
                ></Picker>
            </div>
            <input
                type="text"
                name="message"
                placeholder="Write A Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                className="block w-full bg-transparent text-base border-none focus:ring-white"
            />

            <PaperAirplaneIcon
                className="h-6 w-6 m-auto text-gray-400 transform-gpu rotate-90 transition hover:text-varsity-500 hover:translate-x-1 hover:ease-in-out cursor-pointer"
                aria-hidden="true"
                onClick={() => {
                    values.message = message
                    handleSubmit()
                    setMessage('')
                }}
            />
        </form>
    )
}
