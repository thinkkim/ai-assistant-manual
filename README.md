 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 7f0fc4e51c637e020af3db31e41ca751e76622e2..fae76efd961ea2c0604b370b23524f868e19f773 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,17 @@
-# ai-assistant-manual
\ No newline at end of file
+# 한국의료분쟁조정중재원 AI상담가이드 온라인 사용자 매뉴얼
+
+정적 HTML로 구성된 한국의료분쟁조정중재원 AI상담가이드 매뉴얼입니다. 별도 빌드 없이 `index.html`을 브라우저로 열면 사용할 수 있습니다.
+
+## 파일 구조
+- `index.html`: 레이아웃과 문서 구조, 메뉴 및 본문 카드가 정의된 메인 파일
+- `style.css`: 색상, 타이포그래피, 카드/아코디언 레이아웃 등 스타일 정의
+- `script.js`: 아코디언 메뉴와 검색(제목·내용 기반 필터) 인터랙션 로직
+
+## 사용 방법
+1. 이 저장소를 로컬에 클론합니다.
+2. `index.html`을 더블 클릭하거나 `python -m http.server`로 간단한 서버를 띄워 브라우저에서 확인합니다.
+3. 좌측 아코디언 메뉴와 상단 검색창을 활용해 기능/소기능 설명을 탐색할 수 있습니다.
+4. 내용을 수정할 때는 카드 하나를 복사해 제목과 설명만 바꾸면 동일한 디자인이 유지됩니다.
+
+## 참고
+- 시나리오 점프 설계 시 <https://doc.danbee.ai/chatflow_jump.html> 내용을 함께 확인하면 도움이 됩니다.
 
EOF
)
