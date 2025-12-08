"use client";

import { Suspense } from "react";
import ConfirmInner from "./ConfirmInner";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ConfirmInner />
    </Suspense>
  );
}
