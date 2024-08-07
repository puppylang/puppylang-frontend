'use client';

import { useQuery } from '@tanstack/react-query';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useNativeRouter from '@/hooks/useNativeRouter';
import { deleteChat, getMessages, useChatDetailQuery } from '@/services/chat';
import { MESSAGE_POST_KEY, getPostPetDetail } from '@/services/post';
import { useCancelBlockMutation, useCreateBlockMutation } from '@/services/report';
import { useUserQuery } from '@/services/user';
import {
  CHAT_SERVER_URL,
  ChatAlertStatus,
  ChatAlertType,
  Message as MessageType,
  OBJECTIONABLE_TEXT,
  SocketData,
} from '@/types/chat';
import { Gender } from '@/types/pet';
import { Post } from '@/types/post';
import { formatAge } from '@/utils/date';

import Alert from '@/components/Alert';
import { BottomSheet, SheetButton } from '@/components/BottomSheet';
import { HeaderNavigation } from '@/components/HeaderNavigation';
import NativeLink from '@/components/NativeLink';
import PostStatusBadge from '@/components/PostStatusBadge';
import { Profile } from '@/components/Profile';
import Toast, { ToastStatus } from '@/components/Toast';

import ChatPopup from './chatPopup';
import Message from './message';

interface ChatRoomProps {
  id: string;
  postId: string;
}

interface MessageData {
  showsLastMessage: boolean;
  showsFirstMessage: boolean;
  messages: MessageType[];
}

export default function ChatRoom({ id, postId }: ChatRoomProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isReceivedSocketData, setIsReceivedSocketData] = useState(false);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(true);
  const [alertDetail, setAlertDetail] = useState<ChatAlertType>({
    description: '',
    isOpen: false,
    status: null,
  });
  const [toastDetail, setToastDetail] = useState({
    isOpen: false,
    status: '',
    description: '',
  });
  const [messagesData, setMessagesData] = useState<MessageData>({
    showsFirstMessage: false,
    showsLastMessage: false,
    messages: [],
  });

  const webSocket = useRef<WebSocket | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const topMessageRef = useRef<HTMLDivElement>(null);

  const isInTopMessageView = useIntersectionObserver(topMessageRef);
  const createBlockMutation = useCreateBlockMutation();
  const cancelBlockMutation = useCancelBlockMutation();
  const router = useNativeRouter();

  const { data: post } = useQuery<Post>({
    queryKey: [MESSAGE_POST_KEY, postId],
    queryFn: () => getPostPetDetail(postId),
    staleTime: 0,
  });
  const { data: chat } = useChatDetailQuery(id);
  const { data: user } = useUserQuery();

  const otherUser = chat && chat.is_author ? chat.guest_id : chat?.author_id;
  const firstNotReadedMessage = messagesData.messages.find(message => message.user_id !== user?.id && !message.is_read);
  const isBlockedUser = user && Boolean(user.blocker.find(blockedUser => blockedUser.blocked_id === otherUser));

  const onSubmitChat = (event: FormEvent) => {
    event.preventDefault();
    if (!text) return;
    if (!webSocket.current) return;
    const objectionableText = OBJECTIONABLE_TEXT.find(content => text.includes(content));
    if (objectionableText) {
      setToastDetail({
        isOpen: true,
        description: '불쾌감을 주는 언어가 포함되어 있습니다.',
        status: 'error',
      });
      return;
    }

    if (isBlockedUser) {
      setToastDetail({
        isOpen: true,
        description: '차단한 유저에게 메시지를 보낼 수 없어요.',
        status: 'error',
      });
      return;
    }

    webSocket.current.send(
      JSON.stringify({
        type: 'MESSAGE',
        data: { text, chat_id: id, user, other_user_id: otherUser },
      }),
    );

    setText('');
  };

  const isSameDay = (time: string, previousTime: string) => {
    const currentDate = new Date(time);
    const previousDate = new Date(previousTime);

    return (
      previousDate.getFullYear() === currentDate.getFullYear() &&
      previousDate.getMonth() === currentDate.getMonth() &&
      previousDate.getDate() === currentDate.getDate()
    );
  };

  const isSameMinutes = (time: string, previousTime: string) => {
    const currentDate = new Date(time);
    const previousDate = new Date(previousTime);

    return previousDate.getHours() === currentDate.getHours() && previousDate.getMinutes() === currentDate.getMinutes();
  };

  const updateReadMessage = (messageId: number) => {
    webSocket.current?.send(JSON.stringify({ type: 'READ', data: { id: messageId, chat_id: id, user_id: user?.id } }));
  };

  const onClickAlertBlockBtn = () => {
    if (!user || !otherUser) return;

    createBlockMutation.mutate({
      blockerId: user.id,
      blockedId: otherUser,
    });

    setToastDetail({
      isOpen: true,
      description: '사용자가 차단되었어요.',
      status: 'success',
    });

    setAlertDetail({
      isOpen: false,
      description: '',
      status: null,
    });
  };

  const onClickBottomSheetBlockBtn = () => {
    if (!user || !otherUser) return;

    setIsOpenBottomSheet(false);

    if (isBlockedUser) {
      cancelBlockMutation.mutate({
        blockerId: user.id,
        blockedId: otherUser,
      });

      setToastDetail({
        isOpen: true,
        description: '사용자가 차단이 해제되었어요.',
        status: 'success',
      });

      return;
    }

    setAlertDetail({
      isOpen: true,
      status: ChatAlertStatus.Block,
      description: '차단시 서로의 게시글 확인하거나 채팅을 할 수 없어요. 정말 차단하실래요?',
    });
  };

  const onClickExitBtn = () => {
    setAlertDetail({
      isOpen: true,
      status: ChatAlertStatus.Exit,
      description: '채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요. 채팅방을 나가시겠어요?',
    });
  };

  const onClickAlertExitBtn = async () => {
    setIsLoading(true);
    const { status } = await deleteChat(id);
    if (status === 201) {
      setIsLoading(false);
      router.back();
    }
  };

  useEffect(() => {
    webSocket.current = new WebSocket(CHAT_SERVER_URL);
    if (!webSocket || !user) return;
    webSocket.current.onopen = () => {
      if (webSocket.current?.readyState === 1) {
        webSocket.current?.send(
          JSON.stringify({ type: 'OPEN', data: { chat_id: id, user_id: user.id, date: new Date() } }),
        );
      }
    };

    webSocket.current.onmessage = (event: MessageEvent) => {
      setIsReceivedSocketData(true);
      const socketData = JSON.parse(event.data) as SocketData;
      if (socketData.type === 'READ') {
        const messageId = Number(socketData.data.id);
        setMessagesData(prev => ({
          ...prev,
          messages: prev.messages.map(message => (message.id === messageId ? { ...message, is_read: true } : message)),
        }));
        return;
      }

      const newMessage = socketData.data as MessageType;
      setMessagesData(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
    };
  }, [user]);

  useEffect(() => {
    if (!isLoading && isInTopMessageView && !messagesData.showsFirstMessage) {
      setIsLoading(true);
      (async () => {
        const messages = await getMessages(id, messagesData.messages[0].id, 'PREVIOUS');
        setMessagesData(prev => ({
          ...prev,
          showsFirstMessage: messages.length !== 20,
          messages: [...messages, ...prev.messages],
        }));
        setIsLoading(false);
      })();
    }
  }, [isInTopMessageView]);

  useEffect(() => {
    (async () => {
      const messages = await getMessages(id);
      setMessagesData(prev => ({ ...prev, showsLastMessage: messages.length < 20, messages }));
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    const lastOtherMessage = messagesData.messages.findLast(
      message => message.user_id !== user?.id && !message.is_read,
    );

    if (messagesData.messages.length > 20) return;
    if (lastOtherMessage) return;
    messageRef.current?.scrollTo({
      top: messageRef.current?.scrollHeight,
    });
  }, [messagesData.messages, user]);

  const filteredBlockedMessage = messagesData.messages.filter(
    message => message.user_id === user?.id || !message.is_blocked_other,
  );

  return (
    <div className='relative h-screen flex flex-col items-center'>
      <div className='container'>
        <HeaderNavigation.Container className='!bg-bg-blue'>
          <HeaderNavigation.Title text='채팅방' />
          <HeaderNavigation.DotBtn onClick={() => setIsOpenBottomSheet(true)} />
        </HeaderNavigation.Container>
        <NativeLink href={`/posts/${post?.id}`} className='flex px-4 py-3 border-b-[1px]'>
          <div className='flex-[1_0_50px]'>
            {post && post.pet && <Profile.Pet className='!bg-bg-blue' pet={post.pet} width={50} height={50} />}
          </div>

          <div className='flex pl-4 w-full items-center'>
            <div className='w-full'>
              <p className='text-base text-text-1'>{post?.title}</p>
              <div className='text-sm text-text-2'>
                <span className='mr-1'>{post?.pet?.breed} |</span>
                <span className='mr-1'>{post?.pet?.gender === Gender.Male ? '수컷' : '암컷'} |</span>
                <span>{post?.pet?.birthday ? formatAge(post.pet.birthday) : 0}</span>
              </div>
            </div>
            {post && <PostStatusBadge status={post?.status} className='text-sm flex-[1_0_80px]' />}
          </div>
        </NativeLink>
        <div
          className='relative p-4 bg-bg-blue min-h-[calc(100vh-205px)] max-h-[calc(100vh-205px)] overflow-y-auto'
          ref={messageRef}
        >
          <div ref={topMessageRef} />

          {isOpenPopup && <ChatPopup onClose={() => setIsOpenPopup(false)} />}

          <div>
            {filteredBlockedMessage.map((message, index) => {
              const previousChatting = messagesData.messages[index - 1];
              const isMyChat = user?.id === message.user_id;
              const nextChatting = messagesData.messages[index + 1];
              const isSameUserLastChat = nextChatting
                ? nextChatting.user_id !== message.user_id || !isSameMinutes(message.time, nextChatting.time)
                : true;

              return (
                <Message
                  key={message.id}
                  updateReadMessage={updateReadMessage}
                  message={message}
                  image={message.user_id === chat?.guest_id ? chat.guest.image : chat?.user.image}
                  isSameUserLastChat={isSameUserLastChat}
                  isSameDate={previousChatting ? isSameDay(message.time, previousChatting.time) : false}
                  isSameMinutes={
                    Boolean(nextChatting) && nextChatting && nextChatting.user_id === message.user_id
                      ? isSameDay(message.time, nextChatting.time) && isSameMinutes(message.time, nextChatting.time)
                      : false
                  }
                  isNotReadedFirstMessage={
                    firstNotReadedMessage && !isReceivedSocketData ? firstNotReadedMessage.id === message.id : false
                  }
                  isMyChat={isMyChat}
                />
              );
            })}
          </div>
        </div>

        <form
          className='fixed bottom-0 w-full container flex gap-x-2 px-4 pt-2 pb-7 bg-bg-blue'
          onSubmit={onSubmitChat}
        >
          <input
            type='text'
            placeholder='메시지 보내기'
            className='w-full py-2 px-3 rounded-xl text-sm'
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
          <button className='w-[30px] flex justify-center items-center' type='submit'>
            <MdSend className={`w-[20px] h-[20px] ${text ? 'text-text-3' : 'opacity-20'}`} />
          </button>
        </form>
      </div>
      <BottomSheet isOpen={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
        <NativeLink
          href={`/report?id=${chat?.author_id === user?.id ? chat?.guest_id : chat?.author_id}`}
          className='py-[10px] text-main-1 border-b-[1px] text-center'
        >
          신고하기
        </NativeLink>
        <SheetButton onClick={onClickBottomSheetBlockBtn}>{isBlockedUser ? '차단 해체하기' : '차단하기'}</SheetButton>
        <SheetButton onClick={onClickExitBtn}>채팅방 나가기</SheetButton>
      </BottomSheet>

      <Alert
        buttonText={alertDetail.status === ChatAlertStatus.Block ? '차단하기' : '나가기'}
        message={alertDetail.description}
        isOpen={alertDetail.isOpen}
        onClose={() => setAlertDetail({ isOpen: false, description: '', status: null })}
        onClick={alertDetail.status === ChatAlertStatus.Block ? onClickAlertBlockBtn : onClickAlertExitBtn}
      />

      <Toast
        status={toastDetail.status as ToastStatus}
        onClose={() => setToastDetail(prev => ({ ...prev, isOpen: false }))}
        isInvisible={toastDetail.isOpen}
        position='CENTER'
        description={toastDetail.description}
      />
    </div>
  );
}
