import RedirectWatcher from "@/features/workspace/components/RedirectWatcher";

interface PageProps { 
    params: Record<string, string | string[]>;
    searchParams : { 
        articleId : string | string[] | undefined,
        versionId : string | string[] | undefined
    }
}

export default function Page({ params, searchParams } : PageProps) {
  const articleId= searchParams.articleId;
  const versionId = searchParams.versionId;

  if (!articleId || !versionId || Array.isArray(articleId) || Array.isArray(versionId)) { 
    return <p> 잘못된 접근입니다 </p>
  }

  return (
    <div>
      <RedirectWatcher articleId={articleId} versionId={versionId} />
    </div>
  );
}
