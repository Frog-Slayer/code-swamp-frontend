import Portfolio from "@/features/user/blog/components/Portfolio";
import { Streak } from "@/features/user/blog/components/Streak";

export default function Home() {
  
  const porfol = `
# 👋 안녕하세요, 김개발입니다!
> **"코드로 세상을 더 나은 곳으로 만들고 싶은 개발자"**

## 🚀 About Me

현재 **TechCorp**에서 **Senior Frontend Developer**로 일하고 있으며, 사용자 경험을 중시하는 개발을 추구합니다. 
3년간의 React 개발 경험을 바탕으로 팀을 리드하고 있으며, 새로운 기술 도입과 코드 품질 향상에 관심이 많습니다.

### 💼 Career Highlights
- **TechCorp** - Senior Frontend Developer (2022 ~ 현재)
- **StartupXYZ** - Frontend Developer (2021 ~ 2022)
- **WebAgency** - Junior Developer (2020 ~ 2021)

## 🛠 Tech Stack

### Frontend
- **React** - 3년 경험, 함수형 컴포넌트와 Hooks 전문
- **Next.js** - SSR/SSG 최적화, App Router 마이그레이션 경험
- **TypeScript** - 타입 안전성을 통한 코드 품질 향상
- **Tailwind CSS** - 효율적인 스타일링과 디자인 시스템 구축
  `
  
  return (
    <div> 
        <Portfolio portfolio={porfol} tags={[]}/>
    </div>
  );
}
