# isho-0.github.io
💫 Coding Beyond the Visible: A C++ Developer Inspired by The Little Prince!

## 🚀 프로젝트 소개
이 프로젝트는 Vue 3와 Quasar를 사용하여 만든 개인 포트폴리오 웹사이트입니다. GitHub Pages를 통해 자동으로 배포됩니다.

## 🛠️ 기술 스택
- Vue 3
- TypeScript
- Quasar Framework
- Vite
- SCSS

## 📖 블로그 기능
- 마크다운 기반 블로그 포스트
- 카테고리별 포스트 분류
- 반응형 디자인
- The Little Prince 테마

## 🚀 배포 방법

### 자동 배포 (권장)
GitHub Actions가 자동으로 main 브랜치에 푸시할 때마다 배포합니다.

### 수동 배포
```bash
# 의존성 설치
npm install

# 빌드
npm run build

# GitHub Pages에 배포
npm run deploy
```

## 🌐 접속 주소
- **GitHub Pages**: https://isho-0.github.io/isho-0.github.io/
- **로컬 개발**: `npm run dev`

## 📁 프로젝트 구조
```
src/
├── components/     # Vue 컴포넌트
├── pages/         # 페이지 컴포넌트
├── blog/          # 블로그 관련 파일
│   ├── posts/     # 블로그 포스트 (마크다운)
│   └── categories/ # 카테고리별 분류
├── layouts/       # 레이아웃 컴포넌트
└── router/        # 라우팅 설정
```

## 🔧 개발 환경 설정
```bash
# 저장소 클론
git clone https://github.com/isho-0/isho-0.github.io.git

# 프로젝트 디렉토리로 이동
cd isho-0.github.io

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📝 블로그 포스트 작성
`src/blog/posts/` 디렉토리에 마크다운 파일을 추가하면 자동으로 블로그에 반영됩니다.

## 🤝 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다.
