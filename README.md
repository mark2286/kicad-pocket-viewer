# KiCad Pocket Viewer

KiCad `.kicad_sch` / `.kicad_pcb` 파일을 브라우저(iPhone / iPad Safari 포함)에서 바로 보는 단일 HTML 뷰어입니다. 외부 라이브러리 없음.

- 열기: 페이지에서 "파일 열기"로 파일 선택 (여러 개 가능, 탭으로 열림)
- URL로 열기: 같은 저장소에 KiCad 파일을 두면 `index.html?f=a.kicad_sch,b.kicad_pcb`
- 조작: 한 손가락 이동, 두 손가락 핀치 줌, 휠 줌, 더블클릭 축소
- PCB: 레이어 켜기/끄기, 색 견본 탭 = 그 레이어만, 보드 뒤집기, 패드/배선 탭 = net 강조
- 회로도: 심볼 탭 = 부품 정보, 시트 탭 = 하위 회로도 탭으로 이동
