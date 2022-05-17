import React from 'react'
import { CheckIcon } from '@heroicons/react/outline'
interface MessageProps {
    body?: string
    inbound?: boolean
    status?: string
}

export default function Message({
    body,
    inbound,
    status,
}: MessageProps): JSX.Element {
    return (
        <div
            className={`flex m-2 p-1 relative ${
                inbound ? 'justify-start' : 'justify-end'
            }`}
        >
            <div
                className={`flex flex-col w-auto lg:max-w-3/4 px-5 py-2 rounded-full justify-end overflow-hidden ${
                    inbound
                        ? 'bg-gradient-to-r from-gray-50 to-gray-100'
                        : 'bg-gradient-to-r from-varsity-500 to-varsity-600'
                }`}
            >
                <div
                    className={`px-1 mr-2 ${
                        inbound ? 'text-varsity-900' : 'text-white'
                    }`}
                >
                    {body}
                </div>
                <div className="absolute flex right-2.5">
                    {status === 'delivered' && (
                        <CheckIcon
                            className="h-4 w-4 text-white absolute left-1"
                            aria-hidden="true"
                        />
                    )}
                    <CheckIcon
                        className="h-4 w-4  text-white"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    )
}
 