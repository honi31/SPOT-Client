export default function PageList() {
  return (
    <div className="*:m-4 *:gap-2 *:mb-8 min-h-screen">
      <div className="flex flex-col *:text-xl *:p-1">
        <h2 className="font-semibold mb-2">내 계정</h2>
        <span>이메일</span>
        <span>비밀번호 변경</span>
      </div>
      <div className="flex flex-col *:text-xl *:p-1">
        <h2 className=" font-semibold mb-2">나의 거래</h2>
        <span>찜 목록</span>
        <span>판매내역</span>
        <span>구매내역</span>
      </div>
      <div className="flex flex-col *:text-xl *:p-1">
        <h2 className="font-semibold mb-2">이용 안내</h2>
        <span>앱 버전</span>
        <span>문의하기</span>
        <span>서비스 이용약관</span>
        <span>개인정보 처리방침</span>
      </div>
      <div className="flex flex-col *:text-xl *:p-1">
        <h2 className=" font-semibold mb-2">기타</h2>
        <span>회원 탈퇴</span>
        <span>로그아웃</span>
      </div>
    </div>
  );
}
