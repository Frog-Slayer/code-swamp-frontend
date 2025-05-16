'use client'

import FeedCard from "@/components/ui/FeedCard";

export default function Home() {

  const handleClick = () => {
    console.log('카드 클릭');
  };

  return (
    <div> 
    <FeedCard 
      thumbnailUrl="https://velog.velcdn.com/images/frog_slayer/post/d0756e21-fe07-463d-90f2-7714c74b30f2/image.png"
      title = "제목"
      summary =" 테스ㅌ입니다"
      authorAvatar= "https://velog.velcdn.com/images/frog_slayer/profile/6610c9f9-84a8-4da2-a1b6-7fbd4bc40818/image.png"
      authorName = "dev"
      date = "2시간전"
      onClick={handleClick}
    ></FeedCard>
    </div>
  );
}
