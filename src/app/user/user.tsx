'use client';

import { QueryErrorResetBoundary, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import useNativeRouter from '@/hooks/useNativeRouter';
import { usePetQuery } from '@/services/pet';
import { deleteUser, logoutUser, useUserQuery } from '@/services/user';

import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import NativeLink from '@/components/NativeLink';
import { PetCardList } from '@/components/PetCardList';
import { Section } from '@/components/Section';

import ApiErrorFallback from './error';
import { IconCaretRight, IconEdit, IconUserDefault } from '../../../public/assets/svgs';

export default function UserComponent() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ApiErrorFallback} onReset={reset}>
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function User() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: pets } = usePetQuery();
  const { data: user } = useUserQuery();

  const router = useNativeRouter();
  const queryClient = useQueryClient();

  const onClickLogoutBtn = async () => {
    if (!user) return;
    const status = await logoutUser();

    if (status === 201) {
      queryClient.clear();
      router.replace('/');
    }
  };

  const onClickPetCard = (id: number) => {
    router.push(`/pets/edit/${id}`);
  };

  const onClickAlertBtn = async () => {
    if (!user) return;
    const status = await deleteUser(user.id);
    if (status === 201) {
      queryClient.clear();
      router.replace('/');
    }
  };

  return (
    <>
      <section className='flex flex-col items-center'>
        <Section.Container className='bg-white'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-x-4'>
              <div className='image-container'>
                {user && user.image ? (
                  <Image
                    className='rounded-full w-[60px] h-[60px] object-cover'
                    src={user.image}
                    alt='profile'
                    width={60}
                    height={60}
                  />
                ) : (
                  <div className='flex items-center justify-center w-[60px] h-[60px] bg-gray-4 rounded-full overflow-hidden'>
                    <IconUserDefault width='30' height='30' />
                  </div>
                )}
              </div>
              <div className='font-semibold'>
                <h2 className='text-base text-text-2'>
                  <strong className='text-main-3 font-Jalnan'>{user ? user.name : ''}</strong>님,
                  <br />
                  반가워요 :)
                </h2>
              </div>
            </div>

            <div className='link-btn-container'>
              <NativeLink
                href='/user/edit'
                className='flex items-center gap-x-1 border border-gray-2 text-text-2 text-[12px] px-3 py-[7px] rounded-xl'
              >
                <IconEdit />

                <p>프로필 수정</p>
              </NativeLink>
            </div>
          </div>
        </Section.Container>
      </section>

      <section className='flex flex-col items-center border-t border-t-1 border-gray-3 w-full'>
        <Section.Container className='bg-white flex flex-col'>
          <Section.Title title='나의 반려견 🐾' />
          <PetCardList showsAddCard pets={pets} type='slide' onClick={onClickPetCard} />
        </Section.Container>
      </section>

      <section className='flex flex-col items-center mt-4'>
        <Section.Container className='bg-white'>
          <Section.Title title='나의 활동' />
          <ul className='text-text-1'>
            <ProfileLinkList text='내 게시글' href='/user/posts' />
            <ProfileLinkList text='좋아요 목록' href='/user/liked-posts' />
            <ProfileLinkList text='산책 신청목록' href='/' />
            <ProfileLinkList text='산책 일지' href='/user/record-walks' border='none' />
          </ul>
        </Section.Container>
      </section>

      <section className='flex flex-col items-center mt-4'>
        <Section.Container className='bg-white'>
          <Section.Title title='기타' />

          <ul className='text-text-1 text-sm '>
            <ProfileLinkList text='내 동네 설정' href='/user/region' />
            <li className='border-b border-b-gray-3'>
              <button type='button' className='text-left w-full py-3' onClick={onClickLogoutBtn}>
                로그아웃
              </button>
            </li>
            <li className='text-sm'>
              <button type='button' className='text-left w-full py-3' onClick={() => setIsOpen(true)}>
                회원탈퇴
              </button>
            </li>
          </ul>
        </Section.Container>
      </section>

      <Alert
        title='정말 탈퇴하시겠어요?'
        message='계정은 삭제되며 복구되지 않습니다.'
        isOpen={isOpen}
        buttonText='탈퇴'
        onClick={onClickAlertBtn}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

interface ProfileLinkListProps {
  text: string;
  href: string;
  border?: string;
}

function ProfileLinkList({ text, href, border }: ProfileLinkListProps) {
  return (
    <li>
      <NativeLink
        href={href}
        className={`flex w-full justify-between items-center ${
          border === 'none' ? '' : 'border-b border-b-gray-3'
        } text-sm py-3`}
      >
        {text}
        <IconCaretRight />
      </NativeLink>
    </li>
  );
}
