import React from 'react'

import {
    DotsHorizontalIcon,
} from '@heroicons/react/outline'
import { MemberObj } from '../../@types/Messaging'
import { buildGravatar } from '../../utility/buildGravatar'

interface MessageHeaderProps {
    member: MemberObj
}

export default function MessageHeader({
    member,
}: MessageHeaderProps): JSX.Element {
    return (
        <div className="flex sticky top-0 inset-x-0 justify-between p-5 bg-white h-20 border-b border-gray-200 z-10">
            <div className="flex items-center">
                <img
                    src={
                        member?.profile_image ??
                        buildGravatar(
                            `${member.first_name} ${member?.last_name}`,
                        )
                    }
                    alt={`${member.first_name} ${member.last_name}`}
                    className="rounded-full w-8 h-8"
                />
                <div className="ml-4 text-xl text-varsity-900 font-bold">
                    {`${member.first_name} ${member.last_name}`}
                </div>
            </div>
            <div className="flex text-gray-500 hover:text-varsity-500 cursor-pointer">
                <DotsHorizontalIcon
                    className="h-8 w-8 px-1"
                    aria-hidden="true"
                />
            </div>
        </div>
    )
}
