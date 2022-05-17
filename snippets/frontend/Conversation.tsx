import React from 'react'
import Message from './Message'
import { LOAD_MESSAGES } from '../../graphql/Messaging'
import { useSubscription } from '@apollo/client'
import { MessageObj } from '../../@types/Messaging'
import Loader from '../Loader'

interface ConversationProps {
    conversationId: string
}

export default function Conversation({
    conversationId,
}: ConversationProps): JSX.Element {
    const messagesEndRef = React.useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    const { data, error, loading } = useSubscription(LOAD_MESSAGES, {
        variables: { conversationId },
        onSubscriptionData: () => scrollToBottom(),
    })

    if (error) {
        console.log('error')
        return <p>Error</p>
    }
    if (loading) return <Loader />
    return (
        <div className=" overflow-y-auto scrollbar-hide space-y-5 px-5">
            {data?.messages_connection.edges.map(
                (item: { node: MessageObj }) => (
                    <Message
                        key={item.node.id}
                        body={item.node.body}
                        inbound={item.node.direction === 'inbound'}
                        status={item.node.status}
                    />
                ),
            )}
            <div ref={messagesEndRef} />
        </div>
    )
}
