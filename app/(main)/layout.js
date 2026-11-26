// ~/instagram-next/app/(main)/layout.js
import { Suspense } from "react";
import Sidebar from "@/components/Sidebar.jsx";
import AuthGuard from "@/components/AuthGuard.jsx";
import LinkResult from "@/components/LinkResult.jsx";
import DmRealtime from "@/components/DmRealtime.jsx";

export default function MainLayout({ children, modal }) {
  return (
    <>
      <AuthGuard />
      {/* 로그인한 화면이면 어디에 있든 실시간 DM 을 듣는다. */}
      <DmRealtime />
      {/* 주소의 쿼리를 읽는 컴포넌트라 Suspense 로 감싼다 — 그리는 것이 없어서 fallback 도 없다. */}
      <Suspense fallback={null}>
        <LinkResult />
      </Suspense>
      <Sidebar />
      {children}
      {/* @modal 폴더가 그리는 것 — 피드에서 게시물을 누르면 모달, 그 밖에는 아무것도 없다. */}
      {modal}
    </>
  );
}
