# Developer Portfolio for GitHub Pages

간단한 정적 포트폴리오 사이트입니다. `index.html`, `style.css`, `script.js`만 있으면 GitHub Pages에 바로 배포할 수 있습니다.

## GitHub Pages 배포

1. GitHub에 이 프로젝트를 push합니다.
2. 저장소의 `Settings > Pages`로 이동합니다.
3. `Build and deployment`에서 `Source`를 `GitHub Actions`로 선택합니다.
4. `main` 브랜치에 push하면 `.github/workflows/pages.yml` 워크플로가 자동 실행됩니다.
5. 배포가 완료되면 표시되는 Pages URL로 접속해 결과를 확인합니다.

이 프로젝트는 빌드 단계가 없는 정적 사이트이므로, 워크플로가 저장소 루트를 그대로 아티팩트로 올립니다. 루트의 `.nojekyll` 파일은 GitHub Pages가 Jekyll 처리를 건너뛰도록 해 정적 파일이 그대로 서빙되게 합니다.

## 사용 방법

1. `index.html`의 `Your Name`, 소개 문구, 이메일, 링크를 본인 정보로 수정합니다.
2. `script.js`의 `projects` 배열에 프로젝트를 추가하거나 내용을 교체합니다.
3. `.github/workflows/pages.yml`이 `main` 푸시에 자동 반응하도록 유지합니다.

## 구조

- `index.html` - 레이아웃과 콘텐츠
- `style.css` - 전체 디자인과 반응형 스타일
- `script.js` - 프로젝트 렌더링, 필터, 메뉴, 등장 애니메이션
- `.nojekyll` - GitHub Pages에서 Jekyll 처리를 비활성화하는 마커 파일
- `.github/workflows/pages.yml` - GitHub Pages 자동 배포 워크플로

## 커스터마이징 팁

- 색상을 바꾸고 싶으면 `style.css`의 `:root` 변수만 수정하면 됩니다.
- 프로젝트 필터 카테고리는 `script.js`의 `projects`와 `data-filter` 버튼을 함께 수정하세요.
- 개인 브랜딩을 더 강하게 넣고 싶으면 `hero`와 `profile-card` 텍스트를 먼저 바꾸는 것을 추천합니다.
