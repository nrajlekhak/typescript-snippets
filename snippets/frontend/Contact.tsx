import React from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import { MemberObj } from '../../@types/Messaging'
import { buildGravatar } from '../../utility/buildGravatar'

interface ContactProps {
    number: string
    message?: string
    active?: boolean
    member: MemberObj
    handleSelectConversation: (id: string) => void
    handleActiveMember: (member: MemberObj) => void
    status: string
}

const getName = (member: MemberObj): string => {
    return `${member.first_name} ${member.last_name}`
}

export default function Contact({
    number,
    message,
    active,
    member,
    handleSelectConversation,
    handleActiveMember,
    status,
}: ContactProps): JSX.Element {
    return (
        <div
            onClick={() => {
                handleSelectConversation(number)
                handleActiveMember(member)
            }}
            className={`flex items-center p-2 cursor-pointer hover:bg-white rounded ${
                active ? 'bg-gray-200' : ''
            } `}
        >
            <div className="px-4">
                <img
                    src={
                        member?.profile_image ??
                        buildGravatar(
                            `${member?.first_name} ${member?.last_name}`,
                        )
                    }
                    alt={getName(member)}
                    width="48"
                    height="48"
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <div className="font-semibold text-gray-700">
                        {getName(member) !== '' && getName(member)}
                        {getName(member) === '' && number}
                    </div>
                    <div className="flex">
                        <span className="ml-1 w-10 text-xs text-gray-700">
                            {/* 10:02 PM */}
                        </span>
                        <CheckIcon className="h-4 w-4 " aria-hidden="true" />
                        {status === 'delivered' && (
                            <CheckIcon
                                className="h-4 w-4 absolute"
                                style={{ right: `10px` }}
                                aria-hidden="true"
                            />
                        )}
                    </div>
                </div>
                <div className="text-sm text-gray-700">{message}</div>
            </div>
        </div>
    )
}
 