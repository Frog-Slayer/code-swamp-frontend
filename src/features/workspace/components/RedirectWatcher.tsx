"use client";

import { checkVersionExists } from "@/lib/api/article/check";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface RedirectWatcherProps {
    articleId: string
    versionId: string
}

export default function RedirectWatcher({ articleId, versionId }: RedirectWatcherProps) {
  const router = useRouter();
  const [status, setStatus] = useState("발행 중입니다");
  const retries = useRef(0);
  const maxRetries = 10;

  useEffect(() => {
    const intervalId = setInterval(async () => {
        const res = await checkVersionExists(articleId, versionId)

        console.log(res)
        if (res.path) {
            clearInterval(intervalId);
            router.push(`/${res.path}`);
            return;
        }
        retries.current += 1;
        if (retries.current >= maxRetries) {
            setStatus("게시글 준비에 시간이 걸리고 있습니다. 나중에 다시 시도해주세요.");
            clearInterval(intervalId);
        }
   }, 1000);

    return () => clearInterval(intervalId);
  }, [articleId, versionId, router]);

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <p>{status}</p>
    </div>
  );
}
