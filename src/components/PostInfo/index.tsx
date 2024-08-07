import { ReactNode } from 'react';

import { UserType } from '@/types/user';
import { formatDateTime } from '@/utils/date';

import { IconLocation } from '../../../public/assets/svgs';
import NativeLink from '../NativeLink';
import { Profile } from '../Profile';

interface PostTopInfoProps {
  date: string;
  title: string;
  author?: UserType;
  address?: string;
  children?: ReactNode;
}

function PostTopInfo({ date, title, author, address, children }: PostTopInfoProps) {
  return (
    <div>
      <span className='text-[10px] text-text-2 font-light px-4'>{date}</span>

      <div className='flex justify-between items-center gap-x-2 px-4'>
        <div className='post-title-and-user-info flex flex-col items-start gap-y-2 '>
          <h3 className='post-title text-lg font-medium text-text-1'>{title}</h3>

          {author && (
            <div className='user-info flex items-center gap-x-2'>
              <NativeLink href={`/user/${author.id}`}>
                <div className='flex justify-center items-center rounded-full overflow-hidden w-8 h-8'>
                  <Profile.User
                    image={author.image || ''}
                    alt={`${author.name}프로필이미지`}
                    imageClassName='!w-[32px] !h-[32px]'
                    defaultUserImageClassName='!w-[18px] !h-[18px]'
                    defaultUserDivClassName='bg-gray-3'
                  />
                </div>
              </NativeLink>
              <NativeLink href={`/user/${author.id}`} className='flex items-center gap-x-1 flex-wrap'>
                <span className='user-name text-xs text-text-1'>{author.name}</span>

                {address && (
                  <div className='flex items-center gap-x-[2px]'>
                    <IconLocation />
                    <span className='user-name text-xs text-text-1'>{address}</span>
                  </div>
                )}
              </NativeLink>
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className='post-content border-t-[1px] border-gray-4 p-4 mt-4'>
      <p className='text-sm text-text-1 whitespace-pre-wrap'>{content}</p>
    </div>
  );
}

interface PostWalkInfoItemProps {
  title: string;
  description: string | null;
  type: 'TEXT' | 'DATE';
  className?: string;
}

function PostWalkInfoItem({ title, description, type = 'TEXT', className }: PostWalkInfoItemProps) {
  const formattedDescription = type === 'DATE' && description ? formatDateTime(description) : description;

  return (
    <li className={`border-b-[1px] border-gray-3 py-3 ${className}`}>
      <dl className='flex items-center'>
        <dt className='text-xs font-light text-text-3 min-w-[100px]'>{title}</dt>
        <dd className='grow shrink basis-[0%] text-center text-sm font-light text-text-1'>
          <span>{formattedDescription}</span>
        </dd>
      </dl>
    </li>
  );
}

function PostWalkCautionItem({ index, content }: { index: number; content: string }) {
  return (
    <li className='flex items-start gap-x-1 text-sm font-light text-text-1'>
      <span>{`${index}.`}</span>
      <span>{content}</span>
    </li>
  );
}

export const PostInfo = {
  Top: PostTopInfo,
  Content: PostContent,
  WalkItem: PostWalkInfoItem,
  CautionItem: PostWalkCautionItem,
};
