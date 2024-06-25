'use client';

import { ReactNode } from 'react';

import { HeaderNavigation } from '@/components/HeaderNavigation';

export default function UserPolicy() {
  return (
    <>
      <HeaderNavigation.Container />

      <div className='bg-white-1 px-4 pb-7 text-text-1'>
        <h1 className='font-bold pb-5 text-xl'>개인정보 처리방침</h1>
        <Content>
          퍼피랑(이하 `회사`)은 정보 통신망 이용촉진 및 정보보호 등에 관한 법률(이하 `정보통신망법`) 등 정보통신서비스
          제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을
          정하여 이용자 권익 보호에 최선을 다하고 있습니다.
        </Content>
        <Content>
          회사는 ‘개인정보보호법’ 및 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 등 관련 법률을 준수하고, 법률에
          따라 다음과 같이 「개인정보처리방침」을 수립하고 이를 홈페이지에 공개하여 고객이 언제든지 열람할 수 있도록
          하고 있습니다. 또한 「개인정보처리방침」은 정부의 법률 및 지침변경이나 회사의 내부방침 변경 등으로 인하여
          개정될 수 있으므로, 홈페이지 공지사항 등을 통해 수시로 확인하여 주시기 바랍니다.
        </Content>
        <Container>
          <SubTitle text='제 1장. 개인정보 수집 및 이용목적' />
          <Content>
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
            이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등
            필요한 조치를 이행할 예정입니다.
          </Content>
          <ul>
            <li>
              1. 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별・인증, 회원자격 유지・관리, 서비스 부정이용
              방지, 만 14세 미만 아동의 개인정보 처리 시 법정대리인의 동의 여부 확인, 각종 고지・통지, 고충처리 목적으로
              개인정보를 처리합니다.
            </li>
            <li>2. 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공 목적으로 개인정보를 처리합니다.</li>
          </ul>
          <Content>
            회사가 처리하는 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 목적이 변경될 시에는 회원에게 사전
            동의를 구할 예정입니다.
          </Content>
          <ul>
            <li>
              1. 본인 확인, 서비스 부정이용 방지 등의 회원 관리 ③ ④ 회사 웹사이트 또는 어플리케이션의 기능 또는 정책
              변경사항에 대한 알림
            </li>
            <li>2. 회원이 요구하는 서비스 제공에 관한 계약 이행, 불만/오류사항 처리 등</li>
            <li>3. 기존 서비스의 개선 혹은 신규 서비스 개발, 맞춤형 콘텐츠 및 친구 추천 기능 개발 등에 활용 </li>
            <li>4. 회사 웹사이트 또는 어플리케이션의 기능 또는 정책 변경사항에 대한 알림</li>
            <li>5. 관련 준거법 또는 법적 의무의 준수 </li>
          </ul>
          <Content>
            회원은 회사의 개인정보 수집에 대해 동의하지 않거나 개인정보를 기재하지 않음으로써 이를 거부할 수 있습니다.
            다만, 필수 항목에 대한 동의를 하지 않을 경우 회원에게 제공되는 서비스가 제한될 수 있습니다.
          </Content>
          <SubTitle text='제 2장. 개인정보의 보유 및 이용기간' />
          <Content>
            서비스 이용자가 당사의 회원으로서 서비스를 계속 이용하는 동안 당사는 이용자의 개인정보를 계속 보유하며
            서비스 제공 등을 위해 이용합니다. 서비스 이용자의 개인정보는 그 수집 및 이용 목적(설문조사, 이벤트 등
            일시적인 목적을 포함)이 달성되거나 이용자가 직접 삭제 또는 회원 탈퇴한 경우에 재생할 수 없는 방법으로
            파기됩니다. 당사는 이용자의 권리 남용, 악용 방지, 권리침해/명예훼손 분쟁 및 수사협조 등의 요청이 있었을
            경우에는 이의 재발에 대비하여 회원의 이용계약 해지 시로부터 1년 동안 회원의 개인정보를 보관할 수 있습니다.
            상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 당사는
            관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 당사는 보관하는 정보를 그 보관의
            목적으로만 이용하며 보존기간은 아래와 같습니다.
          </Content>
          <SubTitle text='3장. 개인정보의 열람, 갱신, 수정 또는 삭제' />
          <Content>
            회원님은 등록되어 있는 본인의 개인정보를 열람하거나 수정하실 수 있으며, 회원탈퇴를 요청하실 수 있습니다.
            회원님의 개인정보 열람 및 수정은 사이트 내의 회원정보변경을 통해 직접 열람 또는 수정하거나, 개인정보
            보호책임자 및 담당자에게 전자우편 또는 서면으로 요청하신 경우 지체없이 조치하겠습니다.
          </Content>
          <SubTitle text='제 4장. 개인정보의 파기절차 및 방법' />
          <Content>
            이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에
            의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다. 전자적 파일 형태로 저장된
            개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
          </Content>
          <SubTitle text='제 5장, 개인정보 수집 장치의 설치 운영 및 거부에 관한 사항' />
          <ul className='pb-4'>
            <li>
              1. 회사는 사용자에게 개별적인 서비스와 편의를 제공하기 위해 이용정보를 저장하고 수시로 불러오는
              ‘쿠키(cookie)’를 사용합니다.
            </li>
            <li>
              2. 쿠키는 웹사이트 운영에 이용되는 서버(http)가 정보주체의 브라우저에 보내는 소량의 정보이며 정보주체의 PC
              또는 모바일에 저장됩니다.
            </li>
            <li>
              3. 쿠키의 사용 목적: 이용자들의 접속관리, 오류 관리, 이용자 별 사용 환경 제공, 이용자 활동정보 파악, a/b
              test, 이벤트 및 프로모션 통계 확인 등을 파악하여 최적화된 맞춤형 서비스를 제공하기 위해 사용합니다.
            </li>
            <li>
              3. 정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수 있습니다. 다만, 쿠키 저장을
              거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
            </li>
          </ul>
          <SubTitle text='제 6장. 개인정보보호를 위한 기술적, 관리적 대책' />
          <Content>
            회원님의 개인정보는 암호화되어 보호되고 있습니다. 회원님 계정은 연동된 본인 명의의 SNS 계정(카카오, 네이버,
            애플 등)으로만 접근할 수 있습니다. 본인 명의의 기기 이외에는 사용 후 반드시 로그아웃하시고 완전 종료하시기를
            권장합니다. 이용상 부주의로 인한 개인정보 유출에 대해서 회사는 책임을 지지 않습니다. 회사는 이용자의
            개인정보에 대한 보안을 매우 중요하게 생각합니다. 회사는 이용자 개인정보의 무단 접근, 공개, 사용 및 수정을
            막기 위해 다음과 같은 보안 조치를 구축하고 있습니다.
          </Content>
          <SubTitle text='제 7장. 개인정보의 추가적인 제공·이용 판단기준' />
          <Content>
            회사는 관련 법령에 따라 고객의 동의없이 추가적인 개인정보의 이용 또는 제공을 하기 위한 판단기준은 다음과
            같습니다.
          </Content>
          <ul className='pb-4'>
            <li>1. 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부 </li>
            <li>
              2. 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지
              여부
            </li>
            <li>3. 정보주체의 이익을 부당하게 침해하는지 여부 </li>
            <li>4. 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>
          </ul>
          <SubTitle text='제 8장. 개인정보보호 책임자의 소속, 성명 및 연락처' />
          <Content>
            회사 담당부서 회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련
            부서 및 담당자를 지정하고 있습니다. 본 방침에 대하여 의견이 있거나 회사가 보유한 이용자의 정보를
            업데이트하고자 하는 경우, 아래 연락처로 연락 바랍니다.
          </Content>
          <p>이름: 황혜빈</p>
          <p className='mb-4'>이메일: sksp4334@naver.com</p>

          <p className='pb-1'>기타 개인 정보 침해에 대한 신고나 상담이 필요한 경우, 아래 기관에 문의 가능합니다. </p>
          <ul>
            <li>• 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
            <li>• 대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
            <li>• 경찰청 사이버안전국 (police.go.kr / 국번없이 182)</li>
          </ul>
        </Container>
      </div>
    </>
  );
}

function SubTitle({ text }: { text: string }) {
  return <p className='font-bold pb-3'>{text}</p>;
}

function Content({ children }: { children: ReactNode }) {
  return <p className='pb-3'>{children}</p>;
}

function Container({ children }: { children: ReactNode }) {
  return <section className='pb-7'>{children}</section>;
}