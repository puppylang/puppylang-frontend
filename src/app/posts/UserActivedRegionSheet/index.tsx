import { ActivedRegion, UserRegion } from '@/types/region';
import { formatRegionTitle } from '@/utils/region';

import { SheetButton } from '@/components/BottomSheet';
import NativeLink from '@/components/NativeLink';
import { TopSheet } from '@/components/TopSheet';

interface UserActivedRegionSheetProps {
  isOpen: boolean;
  regions: UserRegion[];
  activedRegion: ActivedRegion | null;
  onClick: (id: number) => void;
  onClose: () => void;
}

function UserActivedRegionSheet({ isOpen, regions, activedRegion, onClick, onClose }: UserActivedRegionSheetProps) {
  return (
    <TopSheet isOpen={isOpen} onClose={onClose} className='top-14 text-left'>
      {regions.map(({ id, region }) => (
        <SheetButton
          key={id}
          onClick={() => onClick(id)}
          className={`px-4 text-left ${activedRegion?.region_id === id ? 'text-main-1' : 'text-text-2 '}`}
        >
          {formatRegionTitle(region)}
        </SheetButton>
      ))}
      <NativeLink href='/user/region' className='py-[10px] px-4 text-text-2 border-b-[1px]'>
        동네 설정
      </NativeLink>
    </TopSheet>
  );
}

export default UserActivedRegionSheet;
