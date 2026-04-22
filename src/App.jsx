import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  Database, 
  Search, 
  Filter, 
  Target, 
  Droplet, 
  Leaf, 
  Wind,
  Info,
  Trophy,
  LayoutGrid,
  List,
  BookmarkCheck,
  Download,
  PieChart,
  Beaker,
  Award,
  Compass,
  Sparkles,
  X,
  Upload
} from 'lucide-react';

// --- 오리지널 랭킹 데이터 복구 (V2 데이터 사용 안 함) ---
const KR_RANK_TEXT = `1메종 마르지엘라 / Maison Margiela레이지 선데이 모닝
2바이레도 / Byredo블랑쉬
3조 말론 런던 / Jo Malone London잉글리쉬 페어 & 프리지아
4딥티크 / Diptyque오 데 썽
5딥티크 / Diptyque탐 다오
6조 말론 런던 / Jo Malone London블랙베리 앤 베이
7입생로랑 / Yves Saint Laurent리브레 오 드 파르펭
8메종 프란시스 커정 / Maison Francis Kurkdjian바카라 루쥬 540
9바이레도 / Byredo집시 워터
10메종 마르지엘라 / Maison Margiela바이 더 파이어플레이스
11아쿠아 디 파르마 / Acqua 디 파르마베르가못 디 칼라브리아
12딥티크 / Diptyque플레르 드 뽀
13포맨트 / Forment시그니처 코튼허그
14돌체앤가바나 / Dolce & Gabbana라이트블루
15딥티크 / Diptyque도손
16조 말론 런던 / Jo Malone London피오니 앤 볼러쉬 스웨이드
17바이레도 / Byredo모하비 고스트
18메종 마르지엘라 / Maison Margiela버블 바스
19딥티크 / Diptyque오 로즈
20바이레도 / Byredo라 튤립
21산타마리아노벨라 / Santa Maria Novella프리지아
22조 말론 런던 / Jo Malone London와일드 블루벨
23입생로랑 / Yves Saint Laurent리브레 헤어미스트
24구찌 / Gucci블룸
25논픽션 / Nonfiction젠틀나잇
26조 말론 런던 / Jo Malone London잉글리쉬 오크 앤 헤이즐넛
27바이레도 / Byredo로즈 오브 노 맨즈 랜드
28딥티크 / Diptyque베티베리오
29캘빈클라인 / Calvin KleinCK One
30존바바토스 / John Varvatos아티산
31바이레도 / Byredo발 다프리크
32메종 프란시스 커정 / Maison Francis Kurkdjian724
33딥티크 / Diptyque필로시코스
34로에베 / Loewe아이레 수틸레사
35산타마리아노벨라 / Santa Maria Novella엔젤 디 피렌체
36에르메스 / Hermes운 자르뎅 수르 뜨와
37베르사체 / Versace브라이트 크리스탈
38랑방 / Lanvin에끌라 드 아르페쥬
39지미추 / Jimmy Choo아이 원 추
40메종 마르지엘라 / Maison Margiela온 어 데이트
41디올 / Dior미스 디올 헤어 미스트
42톰 포드 뷰티 / Tom Ford Beauty화이트 스웨이드
43다니엘트루스 / Daniel's Truth밤쉘
44킬리안 / Kilian엔젤스 셰어
45에르메스 / HermesH24
46엘리자베스아덴 / Elizabeth Arden그린티 센트 스프레이
47다비도프 / Davidoff쿨워터 맨
48그랑핸드 / Granhand수지살몬
49제니퍼로페즈 / Jennifer Lopez글로우 바이 제이로
50딥티크 / Diptyque오르페옹
51멈칫 / Mumchit멈칫
52아이젠틀맨 / iGentleman아이젠틀맨
53랄프로렌 / Ralph Lauren폴로 랄프 우먼
54프라다 / Prada르 옴므 프라다
55겐조 / Kenzo플라워바이겐조
56탬버린즈 / Tamburins퍼퓸 밤 (카모)
57메종 마르지엘라 / Maison Margiela커피 브레이크
58에르메스 / Hermes오 드 메르베이 블루
59베르사체 / Versace에로스
60몽블랑 / Montblanc레전드
61나르시소 / Narciso크리스탈
62프레데릭 말 / Frederic Malle뮤스크 라바줴
63조 말론 런던 / Jo Malone London머르 앤 통카
64조 말론 런던 / Jo Malone London넥타린 블로썸 앤 허니
65존바바토스 / John Varvatos아티산 블랙
66킬리안 / Kilian부 쿠셔 아베끄 모아
67엑스니힐로 / Ex Nihilo러스트 인 파라다이스
68메종 프란시스 커정 / Maison Francis Kurkdjian페미닌 플루리엘
69로에 / LOE화이트 셔츠
70랄프로렌 / Ralph Lauren폴로 그린
71로에베 / Loewe에센시아 뿌르 옴므
72버버리 / Burberry터치 포 맨
73톰 포드 뷰티 / Tom Ford Beauty블랙 오키드
74프레데릭 말 / Frederic Malle베티버 엑스트라오디네르
75엑스니힐로 / Ex Nihilo더 헤도니스트
76홀리바넘 / Holibanum크림 솝
77르셀르 / Lecelle르셀르
78러쉬 / Lush더티 솔리드 퍼퓸
79필로소피 / Philosophy어메이징 그레이스
80겐조 / Kenzo겐조 옴므 오 마린
81이솝 / Aesop올루스 룸 스프레이
82아리아나그란데 / Ariana Grande30ML 향수 세트
83마인드오버바디 / Mind Over Body로즈온어플래닛
84티블레스 / Tea Bless아쿠아 얼그레이티
85어노브 / Unove오 드 퍼퓸
86빌리아일리시 / Billie Eilish아일리시
87루아페 / Luafe화이트 애프리콧
88센녹 / Sennok애프터배스
89그라펜 / Grafen타투 퍼퓸
90쿤달 / Kundal솔리드 퍼퓸 밤
91아닐로 / Anillo로지나잇
92아이젠버그 파리 / Eisenberg Paris러브 어페어 옴므
93데메테르 / Demeter탄생화 향수
94엑스니힐로 / Ex Nihilo블루 탈리스만
95랍셍스 / L'Absence랍셍스
96오브제 / Objet오드퍼퓸 덱스
97로에베 퍼퓸 / Loewe Perfumes001 맨`;

const JP_RANK_TEXT = `1메종 마르지엘라레이지 선데이 모닝
2디올미스 디올 블루밍 부케
3샤넬샹스 오 땅드르
4조 말론 런던잉글리쉬 페어 & 프리지아
5코스메데코르테기모노 유이
6이솝테싯
7메종 마르지엘라스프링타임 인 어 파크
8입생로랑리브레 오 드 파르퓸
9바이레도블랑쉬
10디올미스 디올 오드 퍼퓸
11톰 포드 뷰티비터 피치
12로에베 퍼퓸001 맨
13메종 마르지엘라재즈 클럽
14톰 포드 뷰티네롤리 포르토피노
15디올포에버 앤 에버
16메종 마르지엘라세일링 데이
17조 말론 런던얼 그레이 & 큐컴버
18코스메데코르테기모노 히카리 워터 코롱
19나르시소 로드리게스포허 퓨어 머스크
20메종 마르지엘라버블 바스
21코스메데코르테기모노 윤기
22톰 포드 뷰티화이트 스웨이드
23톰 포드 뷰티오드 우드
24로에베 퍼퓸001 우먼
25디올블루밍 부케 미니 미스
26마크 제이콥스데이지
27불가리옴니아 라인
28로제 갈레오 파푸메 피그
29메종 마르지엘라온 어 데이트
30메종 마르지엘라업 앳 돈
31아유라메디테이션 오드 퍼퓸
32바움오드 뚜왈렛 5
33끌로에노마드 오드 퍼퓸
34비디케이 파르퉴그리 샤르넬
35니샤네우롱차
36에센셜 파퓸나이스 베르가못
37아유라스피릿 오브 아유라
38티파니로즈 골드 오드 퍼퓸
39프라다 뷰티파라독스 앙탕스
40에따 리브르 도랑쥬고스트 인 더 쉘
41아레스#Sayu
42에센셜 파퓸보아 임페리얼
43에센셜 파퓸오랑쥬 상탈
44꼼데가르송플레이 레드
45비디케이 파르퉴부케 드 옹그리
46에따 리브르 도랑쥬유 오어 썸원 라이크 유
47아레스#Sound Skin
48아이암챕터 65
49메종 마틴디스코 인페르노
50메종 마틴와르니 와르니
51비디케이 파르퉴뉘 드 사블
52에따 리브르 도랑쥬아이 엠 트래쉬
53메종 마틴품품
54메종 마틴아라시 노 우미
55에따 리브르 도랑쥬허먼 아 메 코떼
56로케스트르 파르퉴피아노 상탈
57룸 1015러브 오 마틱
58아벨런드리 데이
59코구머스크
60룸 1015소닉 플라워
61에센셜 파퓸로즈 마그네틱
62켈존플라스 데 보주
63임프임프 향수
64아레스#Zero
65라보라토리오 올파티보니드 유
66더 하우스 오브 오드더 타임
67메종 마틴에스프리 드 콩트라딕시옹
68톰 포드 뷰티로스트 체리
69허 립 투 뷰티누드 펄
70골드필드 앤 뱅크스인지니어스 진저
71라보라토리오 올파티보마일로
72에센셜 파퓸디바인 바닐라
73메종 루이 마리보아 드 발린코트
74에센셜 파퓸더 머스크
75라보라토리오 올파티보눈 (Nun)
76메종 마틴아방 로라쥬
77룸 1015체리 펑크
78이스뜨와 드 파르퉴1725 카사노바`;

// --- 압축된 원본 데이터베이스 (오리지널) ---
const COMPRESSED_DATA = `일본|시트러스|조 말론 런던|얼 그레이 & 큐컴버|자스민/베르가못|큐컴버/안젤리카|머스크/비즈왁스|우아한 애프터눈 티타임을 연상시키는 베르가못과 오이의 신선함.
일본|시트러스|메종 마르지엘라|세일링 데이|씨 노트/알데하이드|코리앤더/아이리스|시더우드/앰버그리스|깊은 바다로 뛰어드는 순간의 청량함과 바다 내음을 담은 향.
일본|시트러스|이솝|테싯|유자/크리스프 우드|바질/로즈마리|베티버/클로브|신선한 유자와 활기찬 바질이 어우러진 현대적이고 상쾌한 자연의 향.
일본|시트러스|코스메데코르테|기모노 히카리 워터 코롱|유자/베르가못|제라늄/로즈|우디/머스크|빛을 머금은 유자와 장미가 빚어내는 맑고 우아한 향.
일본|시트러스|톰 포드 뷰티|네롤리 포르토피노|베르가못/만다린|아프리칸 오렌지 플라워|앰버/머스크|이탈리아 리비에라의 눈부신 푸른 바다와 시원한 바람을 담은 향.
일본|시트러스|니샤네|우롱차|베르가못/오렌지|우롱티/넛맥|무화과/머스크|부드러운 우롱차와 베르가못이 선사하는 실크처럼 고운 상쾌함.
일본|시트러스|에센셜 파퓸|나이스 베르가못|베르가못/일랑일랑|자스민/로즈|시더우드/통카빈|칼라브리아 베르가못의 찬란한 햇살을 담은 지속가능한 향.
일본|시트러스|임프|임프 향수|레몬/베르가못|다즐링 티/자스민|머스크/우드|싱그러운 레몬과 다즐링 티가 어우러진 맑고 투명한 일상의 휴식.
일본|시트러스|아레스|#Zero|베르가못/레몬|네롤리/페티그레인|머스크/우드|아무것도 없는 백지 상태에서 피어나는 베르가못과 네롤리의 청명함.
일본|시트러스|라보라토리오 올파티보|니드 유|레몬/핑크 페퍼|화이트 플라워/씨 노트|암브록산/화이트 머스크|피부와 닿는 순간 비로소 깨어나는 레몬과 암브록산의 맑은 울림.
일본|시트러스|더 하우스 오브 오드|더 타임|베르가못/웜우드|블루 티/아이리스|머스크/시더우드|찻잎이 우려지는 평온한 순간을 담은 블루 티와 카모마일.
일본|시트러스|메종 마틴|에스프리 드 콩트라딕시옹|만다린/레몬|코리앤더/진저|시더우드/베티버|만다린과 진저가 부딪히며 만들어내는 경쾌한 상쾌함.
일본|플로럴|디올|미스 디올 블루밍 부케|시실리안 만다린|핑크 피오니/로즈|화이트 머스크|수천 송이의 꽃들이 피어나는 풍성하고 우아한 핑크빛 피오니.
일본|플로럴|샤넬|샹스 오 땅드르|자몽/마르멜로|자스민/히아신스|화이트 머스크/아이리스|자몽과 자스민이 빚어내는 부드러운 사랑스러운 향.
일본|플로럴|조 말론 런던|잉글리쉬 페어 & 프리지아|윌리엄 페어|프리지아|패출리|가을의 정수 신선한 배의 과즙과 새하얀 프리지아의 우아함.
일본|플로럴|끌로에|오드 퍼퓸|피오니/프리지아|로즈/은방울꽃|시더우드/앰버|파리지앵의 시크함을 담은 피오니와 로즈의 우아함.
일본|플로럴|입생로랑|리브레 오 드 파르퓸|만다린/라벤더|오렌지 블라썸/자스민|마다가스카르 바닐라/머스크|관능적인 자유의 향기.
일본|플로럴|코스메데코르테|기모노 유이|유자/베르가못|벚꽃/로즈|머스크/우드|벚꽃과 유자가 만나 사랑스럽게 묶인 향.
일본|플로럴|코스메데코르테|기모노 우라라|베르가못/애플|수련/로즈|머스크/샌달우드|생기 넘치고 맑은 플로럴.
일본|플로럴|메종 마르지엘라|스프링타임 인 어 파크|서양배/베르가못|은방울꽃/자스민|머스크/바닐라|벚꽃이 흩날리는 봄날의 공원.
일본|플로럴|디올|미스 디올 오드 퍼퓸|은방울꽃/피오니|센티폴리아 로즈|머스크/통카빈|벨벳처럼 부드러운 장미 꽃다발.
일본|플로럴|디올|포에버 앤 에버|프리지아/아이비|아몬드 블라썸/장미|머스크/바닐라|영원한 사랑을 약속하는 부드러운 속삭임.
일본|플로럴|디올|블루밍 부케 미니 미스|만다린|피오니/로즈|머스크|싱그러운 피오니 부케를 즐길 수 있는 솔리드 퍼퓸.
일본|플로럴|마크 제이콥스|데이지|와일드 스트로베리/바이올렛 리프|가드니아/자스민|화이트 우드/머스크|발랄한 데이지의 향.
일본|플로럴|불가리|옴니아 라인|밤부/만다린|연꽃/피오니|샌달우드/머스크|맑고 투명한 크리스탈 같은 아시아의 꽃.
일본|플로럴|로제 갈레|오 파푸메 피그|무화과/만다린|무화과 잎/로즈|머스크/우드|햇살 가득한 지중해 정원의 무화과.
일본|플로럴|메종 마르지엘라|온 어 데이트|포도 코디얼/핑크 페퍼|장미 압솔루트/제라늄|패출리/모스|로맨틱한 와인 데이트의 향기.
일본|플로럴|메종 마르지엘라|업 앳 돈|장미/블랙커런트|오렌지 블라썸/아이리스|암브레트/머스크|새벽의 차가운 공기와 아이리스.
일본|플로럴|아유라|메디테이션 오드 퍼퓸|카모마일/로즈마리|로즈/뮤게|샌달우드/머스크|지친 마음을 차분하게 달래주는 향.
일본|플로럴|아유라|스피릿 오브 아유라|카모마일/그린 잎|장미/프리지아|머스크/우디|맑은 생명력을 불어넣는 치유의 향기.
일본|플로럴|티파니|로즈 골드 오드 퍼퓸|블랙커런트|블루 로즈|암브레트 씨드|다이아몬드처럼 빛나는 블루 로즈.
일본|플로럴|프라다 뷰티|파라독스 앙탕스|네롤리/베르가못|앰버/자스민|바닐라/화이트 머스크|신비로운 플로럴.
일본|플로럴|꼼데가르송|플레이 레드|레드 체리/만다린|제라늄/로즈|오스만투스/머스크|에너지 넘치는 달콤함.
일본|플로럴|비디케이 파르퉴|부케 드 옹그리|스트로베리/배|장미/자스민|머스크/시더우드|우아하고 달콤한 파리지앵.
일본|플로럴|에따 리브르 도랑쥬|유 오어 썸원 라이크 유|민트/애니스|장미/헤디온|화이트 머스크|L.A.의 시원한 민트 모히토 향.
일본|플로럴|에따 리브르 도랑쥬|아이 엠 트래쉬|애플/비터 오렌지|장미/이소 이 슈퍼|아키갈라우드/머스크|업사이클링으로 피워낸 혁신적인 향.
일본|플로럴|메종 마틴|품품|만다린/오렌지|로즈/피오니|머스크/바닐라|생기 넘치는 파리지앵의 미소.
일본|플로럴|메종 마틴|아라시 노 우미|그린 애플/프리지아|장미/자스민|화이트 머스크/우드|고요한 바다의 폭풍.
일본|플로럴|룸 1015|러브 오 마틱|베르가못/레몬|장미/뮤게|머스크/샌달우드|도시 속에서 피어나는 사랑.
일본|플로럴|에센셜 파퓸|로즈 마그네틱|자몽/페퍼민트|터키쉬 로즈|시더우드/바닐라|모던하고 자석 같은 장미.
일본|플로럴|켈존|플라스 데 보주|로즈페탈/망고|제라늄/피오니|화이트 머스크/샌달우드|파리 광장의 로맨틱함.
일본|플로럴|라보라토리오 올파티보|마일로|베르가못/만다린|백합/아이리스|바닐라/머스크|부드럽고 달콤한 미소.
일본|구어망드|메종 마르지엘라|재즈 클럽|핑크 페퍼/레몬|럼/가이악우드|토바코 리프/바닐라|럼과 시가의 깊고 달콤한 우디 향.
일본|구어망드|톰 포드 뷰티|비터 피치|복숭아/블러드 오렌지|다바나/럼|패출리/바닐라|도발적이고 달콤한 복숭아 과즙.
일본|구어망드|톰 포드 뷰티|로스트 체리|블랙 체리/비터 아몬드|터키쉬 로즈/자스민|페루 발삼/통카빈|유혹적인 달콤함.
일본|구어망드|허 립 투 뷰티|누드 펄|배/피치|장미/목련|바닐라/머스크|입술 위의 달콤한 로맨스.
일본|구어망드|골드필드 앤 뱅크스|인지니어스 진저|레몬/진저|만다린/자스민|바닐라/샌달우드|태양 빛을 머금은 달콤함.
일본|구어망드|에센셜 파퓸|디바인 바닐라|시나몬/블랙 페퍼|인센스/오스만투스|바닐라/통카빈|신비로운 바닐라의 밤.
일본|구어망드|메종 마틴|아방 로라쥬|핑크 페퍼|자스민/벤조인|바닐라/샌달우드|몽환적인 바닐라.
일본|구어망드|룸 1015|체리 펑크|체리/샤프란|바이올렛/자스민|블랙 레더/패출리|관능적인 런던 펑크의 영혼.
일본|구어망드|이스뜨와 드 파르퉴|1725 카사노바|자몽/레몬|라벤더/애니스|바닐라/아몬드|로맨틱한 푸제르.
일본|머스크|메종 마르지엘라|레이지 선데이 모닝|알데하이드/은방울꽃|아이리스/로즈|화이트 머스크/암브레트|일요일 아침 린넨 시트의 포근함.
일본|머스크|바이레도|블랑쉬|핑크 페퍼/로즈|네롤리/피오니|블론드우드/머스크|순백의 면 시트처럼 깨끗한 향.
일본|머스크|나르시소 로드리게스|포허 퓨어 머스크|머스크|화이트 플라워|캐시머란/우드|순수하고 관능적인 화이트 플라워.
일본|머스크|코스메데코르테|기모노 윤기|유자/베르가못|로즈/매화|머스크/앰버|기품 있고 윤기 나는 자태.
일본|머스크|메종 마르지엘라|버블 바스|비누 향/베르가못|코코넛/자스민|화이트 머스크/패출리|몽글몽글한 비누 거품의 부드러움.
일본|머스크|톰 포드 뷰티|화이트 스웨이드|타임/티|은방울꽃/로즈|스웨이드/머스크|원초적인 관능미.
일본|머스크|에따 리브르 도랑쥬|고스트 인 더 쉘|유자/락토닉 노트|화이트 플라워/로즈|화이트 머스크/스킨 노트|미래적인 향.
일본|머스크|아레스|#Sayu|베르가못/그린|뮤게/자스민|화이트 머스크/시더우드|투명한 비누 향.
일본|머스크|아레스|#Sound Skin|만다린/피치|로즈/아이리스|파우더리 머스크/우드|숲속의 고요함을 닮은 스킨 머스크.
일본|머스크|아이암|챕터 65|오렌지/레몬|은방울꽃/로즈|화이트 머스크/샌달우드|유럽풍 비누의 맑고 우아한 잔향.
일본|머스크|아벨|런드리 데이|알데하이드/그린 노트|린넨/화이트 플라워|머스크/베티버|바짝 마른 린넨 시트의 청명함.
일본|머스크|코구|머스크|레몬/베르가못|로즈/릴리|화이트 머스크/앰버|깨끗한 피부에서 피어오르는 순수함.
일본|머스크|룸 1015|소닉 플라워|핑크 페퍼/베르가못|아이리스/로즈|캐시머란/머스크|부드러운 파우더리.
일본|머스크|에센셜 파퓸|더 머스크|레드 진저/라벤더|비즈왁스/로즈|머스크/샌달우드|포근하고 친밀한 살내음.
일본|머스크|라보라토리오 올파티보|눈 (Nun)|베르가못/레몬|연꽃/자스민|화이트 머스크/블론드 우드|깨끗한 생명력.
일본|우드|톰 포드 뷰티|오드 우드|로즈우드/카다멈|오우드/샌달우드|통카빈/앰버|스모키하고 관능적인 우디 향.
일본|우드|로에베 퍼퓸|001 맨|레몬/카다멈|샌달우드/베티버|바이올렛/화이트 머스크|아침 햇살을 닮은 신선한 조화.
일본|우드|로에베 퍼퓸|001 우먼|핑크 페퍼/베르가못|샌달우드/이집트 자스민|바닐라/앰버|부드럽고 매혹적인 아침의 향.
일본|우드|바움|오드 뚜왈렛 5|로즈마리/유칼립투스|히노키/로즈|시더우드/샌달우드|고요한 숲속 히노키 나무의 청량함.
일본|우드|끌로에|노마드 오드 퍼퓸|미라벨 플럼/베르가못|프리지아/로즈|오크모스/패출리|우아한 시프레 향.
일본|우드|비디케이 파르퉴|그리 샤르넬|무화과/블랙티|아이리스/베티버|샌달우드/통카빈|파리의 안개 낀 아침.
일본|우드|에센셜 파퓸|보아 임페리얼|타이 바질/페퍼|베티버/프리지아|아키갈라우드/암브록산|현대적인 우디 향.
일본|우드|에센셜 파퓸|오랑쥬 상탈|비터 오렌지/바질|사이프러스/제라늄|샌달우드/오크모스|눈부신 햇살과 우디.
일본|우드|메종 마틴|디스코 인페르노|블랙 페퍼/엘레미|패출리/라벤더|앰버/베티버|자유로운 밤의 열기.
일본|우드|메종 마틴|와르니 와르니|티/카다멈|프리지아/오렌지 블라썸|시더우드/머스크|이국적인 여행의 향기.
일본|우드|비디케이 파르퉴|뉘 드 사블|카다멈/넛맥|로즈 압솔루트|통카빈/암브록산|뜨거운 모래 위에서 피어나는 장미.
일본|우드|에따 리브르 도랑쥬|허먼 아 메 코떼|블랙커런트/갈바눔|로즈/지오스민|베티버/패출리|비 온 뒤 숲속의 신비로운 조화.
일본|우드|로케스트르 파르퉴|피아노 상탈|베르가못|샌달우드/우유|시더우드/암브록산|부드러운 크리미한 샌달우드.
일본|우드|메종 루이 마리|보아 드 발린코트|샌달우드/시더우드|베티버/넛맥|앰버우드|차분한 자연의 향.
한국|시트러스|딥티크|오 데 썽|오렌지 블라썸/비터 오렌지|주니퍼베리|패출리/안젤리카|생동감 넘치는 향.
한국|시트러스|아쿠아 디 파르마|베르가못 디 칼라브리아|베르가못/시트론|시더우드/진저|베티버/머스크|상쾌한 베르가못.
한국|시트러스|돌체앤가바나|라이트블루|레몬/애플|대나무/화이트 로즈|시더우드/머스크|지중해의 싱그러움.
한국|시트러스|캘빈클라인|CK One|레몬/그린 노트|은방울꽃/자스민|머스크/오크모스|깨끗하고 투명한 시트러스 그린.
한국|시트러스|존바바토스|아티산|만다린/클레멘타인|오렌지 블라썸/진저|우디 노트/머스크|상큼한 감귤류의 조화.
한국|시트러스|에르메스|H24|클라리세이지|나르시스|로즈우드/스클라렌|하이테크 자연주의 향수.
한국|시트러스|엘리자베스아덴|그린티 센트 스프레이|레몬/베르가못|그린티/민트|오크모스/앰버|영원한 청량함.
한국|시트러스|다비도프|쿨워터 맨|씨 노트/민트|라벤더/로즈마리|머스크/오크모스|폭발적 상쾌함.
한국|시트러스|랄프로렌|폴로 랄프 우먼|애플/만다린|프리지아/매그놀리아|아이리스/머스크|상큼한 사과와 화이트 플로럴.
한국|시트러스|러쉬|더티 솔리드 퍼퓸|스피어민트/타라곤|라벤더/네롤리|오크모스/샌달우드|강렬하고 시원한 허브.
한국|시트러스|티블레스|아쿠아 얼그레이티|베르가못/레몬|얼그레이 티/자스민|화이트 머스크/우디|여유로운 시트러스 티.
한국|플로럴|조 말론 런던|블랙베리 앤 베이|블랙베리|월계수 잎|시더우드|톡 쏘는 프루티 향.
한국|플로럴|딥티크|도손|오렌지 플라워|튜베로즈/자스민|머스크|신비롭고 짙은 화이트 플로럴.
한국|플로럴|딥티크|오 로즈|장미/베르가못|센티폴리아 로즈|시더우드/허니|완벽한 생장미 향.
한국|플로럴|바이레도|라 튤립|프리지아/루바브|핑크 튤립|블론드 우드/베티버|맑은 생명력.
한국|플로럴|산타마리아노벨라|프리지아|프리지아 향|바이올렛/센티폴리아 로즈|아이리스/머스크|깨끗한 프리지아 비누 향.
한국|플로럴|조 말론 런던|피오니 앤 볼러쉬 스웨이드|레드 애플|피오니/자스민|스웨이드|고급스러운 플로럴.
한국|플로럴|조 말론 런던|와일드 블루벨|블루벨|감|화이트 머스크|섬세하고 맑은 향기.
한국|플로럴|입생로랑|리브레 헤어미스트|만다린/라벤더|오렌지 블라썸|머스크|자유롭고 당당한 잔향.
한국|구찌|블룸|랑군 크리퍼|튜베로즈/자스민|머스크/샌달우드|풍성하고 우아한 화이트 가든.
한국|플로럴|바이레도|로즈 오브 노 맨즈 랜드|장미/핑크 페퍼|라즈베리 블라썸/로즈|파피루스/화이트 앰버|고결하고 순수한 플로럴.
한국|플로럴|바이레도|발 다프리크|베르가못/레몬|바이올렛/시클라멘|베티버/모로칸 시더우드|따뜻한 베티버.
한국|플로럴|메종 프란시스 커정|724|알데하이드/베르가못|자스민/스위트피|화이트 머스크/샌달우드|청명함.
한국|플로럴|딥티크|필로시코스|무화과 잎/무화과|그린 노트/코코넛|시더우드/우디 노트|달콤한 과육과 푸른 잎.
한국|플로럴|로에베|아이레 수틸레사|갈바눔/만다린|은방울꽃/자스민|머스크/샌달우드|봄날의 미풍.
한국|플로럴|산타마리아노벨라|엔젤 디 피렌체|피치/오렌지|자스민/일랑일랑|바닐라/머스크|달콤하고 포근한 향.
한국|플로럴|에르메스|운 자르뎅 수르 뜨와|애플/배|로즈/매그놀리아|그린 그라스/로즈마리|싱그러운 정원.
한국|플로럴|베르사체|브라이트 크리스탈|유자/석류|피오니/매그놀리아|머스크/마호가니|화사한 플로럴.
한국|플로럴|랑방|에끌라 드 아르페쥬|라일락/레몬|피치 블라썸/그린티|화이트 시더우드/머스크|영원히 사랑받는 향.
한국|플로럴|지미추|아이 원 추|만다린/피치|백합/자스민|바닐라/벤조인|화려하고 당당한 아우라.
한국|플로럴|디올|미스 디올 헤어 미스트|만다린|로즈/피오니|머스크|우아한 꽃향기.
한국|플로럴|다니엘트루스|밤쉘|그린 애플/피치|피오니/오키드|머스크/앰버|고급스러운 살내음.
한국|플로럴|그랑핸드|수지살몬|피치/애플|장미/뮤게|머스크/샌달우드|상큼함이 퍼지는 향.
한국|플로럴|제니퍼로페즈|글로우 바이 제이로|네롤리/핑크 자몽|장미/샌달우드|머스크/바닐라|깨끗한 비누 향.
한국|플로럴|킬리안|부 쿠셔 아베끄 모아|일랑일랑/네롤리|튜베로즈/장미|바닐라/시더우드|치명적이고 관능적인 속삭임.
한국|플로럴|엑스니힐로|러스트 인 파라다이스|핑크 페퍼|피오니/리치|머스크/화이트 시더우드|뜨거운 여름날의 도발.
한국|플로럴|메종 프란시스 커정|페미닌 플루리엘|아이리스/바이올렛|로즈/자스민|베티버/패출리|찬란한 거대 꽃다발.
한국|플로럴|르셀르|르셀르|베르가못/레몬|로즈/릴리|머스크/우드|깨끗하고 우아한 호텔 로비.
한국|플로럴|필로소피|어메이징 그레이스|베르가못/자몽|프리지아/로즈|머스크|우아하고 깨끗한 축복.
한국|플로럴|마인드오버바디|로즈온어플래닛|베르가못/핑크 페퍼|로즈/제라늄|머스크/시더우드|신비롭고 몽환적인 로즈.
한국|플로럴|어노브|오 드 퍼퓸|피치/애플|장미/자스민|머스크/우드|달콤한 포근함.
한국|플로럴|아닐로|로지나잇|다마스크 로즈|장미/은방울꽃|머스크/시더우드|매혹적인 향기.
한국|플로럴|데메테르|탄생화 향수|베르가못/그린|로즈/피오니|머스크/우드|순수함을 담은 일상 향수.
한국|구어망드|입생로랑|리브레 오 드 파르펭|만다린/라벤더|오렌지 블라썸/자스민|마다가스카르 바닐라/머스크|한계 없는 자유와 당당함.
한국|구어망드|메종 프란시스 커정|바카라 루쥬 540|자스민/사프란|앰버우드/앰버그리스|궁극의 럭셔리.
한국|구어망드|킬리안|엔젤스 셰어|꼬냑|시나몬/통카빈|은밀하고 달콤한 유혹.
한국|구어망드|조 말론 런던|머르 앤 통카|라벤더|오무리안 머르|통카빈/바닐라|풍요롭고 고귀한 향.
한국|구어망드|조 말론 런던|넥타린 블로썸 앤 허니|블랙커런트|넥타린/꿀|피치/플럼|달콤한 복숭아와 꿀.
한국|구어망드|톰 포드 뷰티|블랙 오키드|트러플/가데니아|블랙 오키드|패출리/바닐라|치명적인 절대적 관능미.
한국|구어망드|아리아나그란데|30ML 향수 세트|블랙베리/배|마시멜로|바닐라/머스크|사랑스러운 솜사탕.
한국|구어망드|빌리아일리시|아일리시|슈가 페탈/만다린|바닐라/코코아|따뜻한 코코아의 부드러움.
한국|구어망드|루아페|화이트 애프리콧|애프리콧/피치|로즈/자스민|바닐라/머스크|부드러운 살구 과즙.
한국|머스크|딥티크|플레르 드 뽀|알데하이드/핑크 페퍼|아이리스/장미|머스크|관능적인 피부 향.
한국|머스크|포맨트|시그니처 코튼허그|뮤게/오렌지|로즈/자스민|코튼/머스크|부드럽고 묵직한 코튼.
한국|머스크|바이레도|모하비 고스트|암브레트/사포딜라|매그놀리아|머스크/시더우드|신비로운 우디 머스크.
한국|머스크|딥티크|오르페옹|주니퍼베리|자스민|파우더리 머스크/시더우드|낭만적인 재즈 바.
한국|머스크|멈칫|멈칫|알데하이드/애플|코튼/장미|머스크/바닐라|포근한 코튼.
한국|머스크|아이젠틀맨|아이젠틀맨|시트러스/그린|비누/플로럴|화이트 머스크|깨끗한 런드리 향.
한국|머스크|프라다|르 옴므 프라다|네롤리/블랙 페퍼|아이리스/제라늄|모던한 남성의 향.
한국|머스크|겐조|플라워바이겐조|장미/블랙커런트|바이올렛/로즈|바닐라/화이트 머스크|파우더리 플로럴의 기적.
한국|머스크|나르시소|크리스탈|프리지아/베르가못|오렌지 블라썸/로즈|머스크/캐시머란|투명하고 우아한 머스크.
한국|머스크|프레데릭 말|뮤스크 라바줴|라벤더/만다린|시나몬/클로브|애니말릭 머스크/바닐라|원초적인 오리엔탈 머스크.
한국|머스크|로에|화이트 셔츠|린넨/베르가못|장미|머스크/베티버|보송한 린넨 향.
한국|머스크|홀리바넘|크림 솝|알데하이드/비누|은방울꽃/로즈|머스크/우드|순수한 비누 향.
한국|머스크|센녹|애프터배스|비누 향/베르가못|뮤게/아이리스|샌달우드/머스크|나른한 아침의 온기.
한국|머스크|쿤달|솔리드 퍼퓸 밤|애플/레몬|코튼/자스민|머스크/앰버|부드럽게 스며드는 포근함.
한국|머스크|아이젠버그 파리|러브 어페어 옴므|화이트 플라워/티|장미/자스민|머스크/샌달우드|유혹적인 머스크.
한국|머스크|엑스니힐로|블루 탈리스만|배/베르가못|오렌지 블라썸|머스크|아방가르드한 파리지앵의 부적.
한국|우드|딥티크|탐 다오|로즈우드/머틀|샌달우드|시더우드/머스크|사원의 고요함.
한국|우드|바이레도|집시 워터|베르가못/주니퍼베리|인센스/솔잎|바닐라/샌달우드|신비로운 자유로움.
한국|우드|메종 마르지엘라|바이 더 파이어플레이스|핑크 페퍼/클로브|체스트넛|바닐라/페루 발삼|따스하고 스모키한 향.
한국|우드|논픽션|젠틀나잇|화이트 펄/베르가못|스웨이드/바이올렛|화이트 머스크/시더우드|중성적인 포근함.
한국|우드|조 말론 런던|잉글리쉬 오크 앤 헤이즐넛|그린 헤이즐넛|시더우드|로스티드 오크|매혹적인 숲속 향기.
한국|우드|딥티크|베티베리오|자몽/만다린|제라늄/일랑일랑|베티버/패출리|이국적인 플로럴 우디.
한국|우드|탬버린즈|퍼퓸 밤 (카모)|클라리세이지/카모마일|워터/시프리올|앰버/블론드우드|독특한 힙함.
한국|우드|에르메스|오 드 메르베이 블루|씨 노트/레몬|주니퍼베리/미네랄|우디 노트/패출리|환상적인 만남.
한국|우드|베르사체|에로스|민트/그린 애플|통카빈/제라늄|바닐라/베티버|그리스 신의 관능미.
한국|우드|몽블랑|레전드|라벤더/파인애플|레드 애플/오크모스|통카빈/샌달우드|현대적 매력.
한국|우드|존바바토스|아티산 블랙|블러드 오렌지|네롤리/카다멈|레더|어두운 밤의 치명적인 매력.
한국|우드|랄프로렌|폴로 그린|파인/바질|레더/로즈|오크모스/토바코|남성적인 클래식의 상징.
한국|우드|로에베|에센시아 뿌르 옴므|라벤더/그린 노트|파인/바질|패출리/레더|대담한 남성미.
한국|우드|버버리|터치 포 맨|바이올렛 리프/만다린|화이트 페퍼/넛맥|통카빈/베티버|부드럽게 감싸는 머스크.
한국|우드|프레데릭 말|베티버 엑스트라오디네르|비터 오렌지/베르가못|핑크 페퍼/베티버|오크모스/시더우드|남성적 베티버의 정수.
한국|우드|엑스니힐로|더 헤도니스트|베르가못/진저|시더우드|베티버/머스크|삶의 쾌락을 좇는 여정.
한국|우드|겐조|겐조 옴므 오 마린|마린 노트/자몽|일랑일랑|샌달우드/시더우드|짭조름한 피부 향.
한국|우드|이솝|올루스 룸 스프레이|핑크 페퍼/카다멈|플로럴 노트|토바코/앰버|아로마틱 우디.
한국|우드|그라펜|타투 퍼퓸|베르가못/레몬|로즈/패출리|우디 노트/머스크|타투처럼 깊이 스며드는 잔향.
한국|우드|랍셍스|랍셍스|베르가못/레몬|아이리스/로즈|샌달우드/바닐라|감각을 일깨우는 잔향.
한국|우드|오브제|오드퍼퓸 덱스|무화과/무화과잎|로즈/릴리|시더우드/머스크|시크한 도시의 향.`;

// 초기 데이터 파싱
const initialData = COMPRESSED_DATA.trim().split('\n').map((row, idx) => {
  const [segment, category, brand, name, top, middle, base, desc] = row.split('|');
  return {
    id: idx + 1,
    segment: segment + " 데이터",
    category, brand, name, top, middle, base, desc
  };
});

// 한/영 분리 유틸
const getKrStr = (str) => {
  if (!str) return '';
  return str.split(' / ')[0].trim();
};

// 텍스트 마이닝 기반 정규화 함수 (오리지널 데이터 교차 검증용)
const normalizeSearchStr = (brandKr, nameKr) => {
  let b = brandKr.replace(/\s+/g, '').toLowerCase();
  let n = nameKr.replace(/\s+/g, '').toLowerCase();

  // 브랜드 정규화
  if (b.includes("조말론")) b = "조말론런던";
  if (b.includes("메종마르지엘라")) b = "메종마르지엘라";
  if (b.includes("메종마틴")) b = "메종마틴"; // 엄격 분리 유지
  
  // 제품명 정규화 (파르펭/파르퓸 등 표기 통합)
  if (n.includes("리브레")) n = "리브레오드파르퓸";
  if (n.includes("레이지선데이")) n = "레이지선데이모닝";
  if (n.includes("잉글리쉬페어")) n = "잉글리쉬페어";
  if (n.includes("블랑쉬")) n = "블랑쉬";
  if (n.includes("잉글리쉬페어")) n = "잉글리쉬페어";
  if (n.includes("테싯")) n = "테싯";
  if (n.includes("버블바스")) n = "버블바스";
  if (n.includes("화이트스웨이드")) n = "화이트스웨이드";
  if (n.includes("001맨")) n = "001맨";
  if (n.includes("온어데이트")) n = "온어데이트";
  if (n.includes("재즈클럽")) n = "재즈클럽";
  if (n.includes("세일링데이")) n = "세일링데이";

  return { b, n };
};

const getRankIndex = (brandKr, nameKr, rankText) => {
  const lines = rankText.trim().split('\n');
  const { b, n } = normalizeSearchStr(brandKr, nameKr);
  
  const idx = lines.findIndex(line => {
     const l = line.replace(/\s+/g, '').toLowerCase();
     return l.includes(b) && l.includes(n);
  });
  return idx !== -1 ? idx + 1 : undefined;
};

const extractNotes = (noteStr) => getKrStr(noteStr).split('/').map(n => n.trim()).filter(n => n);

const getCategoryTheme = (category) => {
  const cat = getKrStr(category);
  switch(cat) {
    case '시트러스': return {
      card: 'bg-lime-100 border-lime-400', text: 'text-lime-950', brand: 'text-lime-800',
      badge: 'bg-lime-500 text-white border-lime-600', noteBg: 'bg-white border-lime-400 text-lime-900', rowHover: 'hover:bg-lime-200/80'
    };
    case '플로럴': return {
      card: 'bg-rose-100 border-rose-400', text: 'text-rose-950', brand: 'text-rose-800',
      badge: 'bg-rose-500 text-white border-rose-600', noteBg: 'bg-white border-rose-400 text-rose-900', rowHover: 'hover:bg-rose-200/80'
    };
    case '구어망드': return {
      card: 'bg-amber-100 border-amber-400', text: 'text-amber-950', brand: 'text-amber-800',
      badge: 'bg-amber-500 text-white border-amber-600', noteBg: 'bg-white border-amber-400 text-amber-900', rowHover: 'hover:bg-amber-200/80'
    };
    case '머스크': return {
      card: 'bg-purple-100 border-purple-400', text: 'text-purple-950', brand: 'text-purple-800',
      badge: 'bg-purple-500 text-white border-purple-600', noteBg: 'bg-white border-purple-400 text-purple-900', rowHover: 'hover:bg-purple-200/80'
    };
    case '우드': return {
      card: 'bg-stone-200 border-stone-400', text: 'text-stone-950', brand: 'text-stone-800',
      badge: 'bg-stone-600 text-white border-stone-700', noteBg: 'bg-white border-stone-400 text-stone-900', rowHover: 'hover:bg-stone-300/80'
    };
    default: return {
      card: 'bg-gray-100 border-gray-300', text: 'text-gray-950', brand: 'text-gray-700',
      badge: 'bg-gray-500 text-white border-gray-600', noteBg: 'bg-white border-gray-300 text-gray-800', rowHover: 'hover:bg-gray-200/80'
    };
  }
};

const getCategoryBgColor = (category) => {
  const cat = getKrStr(category);
  switch(cat) {
    case '시트러스': return 'bg-lime-500';
    case '플로럴': return 'bg-rose-500';
    case '구어망드': return 'bg-amber-500';
    case '머스크': return 'bg-purple-500';
    case '우드': return 'bg-stone-600';
    default: return 'bg-gray-500';
  }
};

const getCoordinates = (item, bName, bBrand, bCat) => {
  const seed1 = (bName.length * 7 + bBrand.length * 13) % 100;
  const seed2 = (bName.length * 11 + bBrand.length * 17) % 100;
  let x = 0, y = 0;
  if (bCat === '시트러스') { x = -80 + (seed1 % 40); y = -60 + (seed2 % 60); }
  else if (bCat === '플로럴') { x = -30 + (seed1 % 60); y = -10 + (seed2 % 60); }
  else if (bCat === '구어망드') { x = 20 + (seed1 % 60); y = 40 + (seed2 % 50); }
  else if (bCat === '머스크') { x = -10 + (seed1 % 70); y = 10 + (seed2 % 60); }
  else if (bCat === '우드') { x = 40 + (seed1 % 50); y = -40 + (seed2 % 80); }
  return { x, y };
};

// --- 스마트 명칭 통합 및 자체 랭킹 엔진 ---
const processAndConsolidateData = (rawData) => {
  const consolidatedMap = new Map();

  rawData.forEach((item) => {
    const bCat = getKrStr(item.category);
    const krBrand = getKrStr(item.brand);
    let krName = getKrStr(item.name);

    const { b: normBrand, n: normName } = normalizeSearchStr(krBrand, krName);
    const uniqueKey = `${normBrand}-${normName}`;

    if (!consolidatedMap.has(uniqueKey)) {
      consolidatedMap.set(uniqueKey, {
        ...item,
        id: uniqueKey,
        ranks: {
          KR: getRankIndex(krBrand, krName, KR_RANK_TEXT),
          JP: getRankIndex(krBrand, krName, JP_RANK_TEXT)
        },
        displayCategory: bCat,
        colorClass: getCategoryBgColor(bCat)
      });
    } else {
      const existing = consolidatedMap.get(uniqueKey);
      if (!existing.ranks.KR) existing.ranks.KR = getRankIndex(krBrand, krName, KR_RANK_TEXT);
      if (!existing.ranks.JP) existing.ranks.JP = getRankIndex(krBrand, krName, JP_RANK_TEXT);
    }
  });

  const consolidatedArray = Array.from(consolidatedMap.values());

  // 양쪽 모두 랭킹이 있는 제품(교집합)만 통합 순위 산출
  const integratedCandidates = consolidatedArray.filter(item => item.ranks.KR !== undefined && item.ranks.JP !== undefined);

  integratedCandidates.sort((a, b) => {
    const avgA = (a.ranks.KR + a.ranks.JP) / 2;
    const avgB = (b.ranks.KR + b.ranks.JP) / 2;
    if (avgA !== avgB) return avgA - avgB;
    const minA = Math.min(a.ranks.KR, a.ranks.JP);
    const minB = Math.min(b.ranks.KR, b.ranks.JP);
    return minA - minB;
  });

  integratedCandidates.forEach((item, index) => {
    item.ranks.INT = index + 1;
  });

  consolidatedArray.forEach((item) => {
    const coords = getCoordinates(item, item.name, getKrStr(item.brand), item.displayCategory);
    item.posX = coords.x;
    item.posY = coords.y;
  });

  return consolidatedArray;
};

const calculateNoteFrequencies = (dataList) => {
  const counts = { top: {}, middle: {}, base: {} };
  dataList.forEach(item => {
    extractNotes(item.top).forEach(note => counts.top[note] = (counts.top[note] || 0) + 1);
    extractNotes(item.middle).forEach(note => counts.middle[note] = (counts.middle[note] || 0) + 1);
    extractNotes(item.base).forEach(note => counts.base[note] = (counts.base[note] || 0) + 1);
  });
  const getTop5 = (noteObj) => Object.entries(noteObj).sort(([,a], [,b]) => b - a).slice(0, 5);
  return { top: getTop5(counts.top), middle: getTop5(counts.middle), base: getTop5(counts.base) };
};

const findSimilarPerfumes = (benchmark, allData) => {
  if (!benchmark) return [];
  const benchNotes = [...extractNotes(benchmark.top), ...extractNotes(benchmark.middle), ...extractNotes(benchmark.base)];

  const scored = allData.map(item => {
    if (item.id === benchmark.id) return null;
    const itemNotes = [...extractNotes(item.top), ...extractNotes(item.middle), ...extractNotes(item.base)];
    const sharedNotes = benchNotes.filter(n => itemNotes.includes(n));
    return { item, sharedNotes, score: sharedNotes.length };
  }).filter(Boolean);

  return scored.sort((a, b) => b.score - a.score || (a.item.ranks.INT || 9999) - (b.item.ranks.INT || 9999)).slice(0, 3);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('grid');
  const [rawData, setRawData] = useState(initialData);
  const data = useMemo(() => processAndConsolidateData(rawData), [rawData]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterNote, setFilterNote] = useState('All');
  
  const [pairingNote, setPairingNote] = useState('베르가못');
  const [targets, setTargets] = useState(new Set()); 
  const [benchmarkItem, setBenchmarkItem] = useState(null);

  const toggleTarget = (id) => {
    const newTargets = new Set(targets);
    if (newTargets.has(id)) newTargets.delete(id);
    else newTargets.add(id);
    setTargets(newTargets);
  };

  const categories = ['All', ...new Set(data.map(item => item.displayCategory))];
  const regions = ['All', 'Integrated (한+일)', 'Korea (한국)', 'Japan (일본)'];
  
  const allPopularNotes = useMemo(() => {
    const noteFreq = {};
    data.forEach(item => {
      [...extractNotes(item.top), ...extractNotes(item.middle), ...extractNotes(item.base)].forEach(n => {
        noteFreq[n] = (noteFreq[n] || 0) + 1;
      });
    });
    return Object.entries(noteFreq).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0, 40);
  }, [data]);

  const filteredData = useMemo(() => {
    const result = data.filter(item => {
      let matchRegion = true;
      if (filterRegion === 'Integrated (한+일)') {
        matchRegion = item.ranks.INT !== undefined;
      } else if (filterRegion === 'Korea (한국)') {
        matchRegion = item.ranks.KR !== undefined;
      } else if (filterRegion === 'Japan (일본)') {
        matchRegion = item.ranks.JP !== undefined;
      }

      const matchCategory = filterCategory === 'All' || item.displayCategory === filterCategory;
      const allItemNotes = [...extractNotes(item.top), ...extractNotes(item.middle), ...extractNotes(item.base)];
      const matchNote = filterNote === 'All' || allItemNotes.includes(filterNote);

      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.top.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.middle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.base.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchRegion && matchCategory && matchNote && matchSearch;
    });

    const catOrder = { '시트러스': 1, '플로럴': 2, '구어망드': 3, '머스크': 4, '우드': 5 };

    return result.sort((a, b) => {
      let rankDiff = 0;
      if (filterRegion === 'Korea (한국)') { rankDiff = (a.ranks.KR ?? 9999) - (b.ranks.KR ?? 9999); } 
      else if (filterRegion === 'Japan (일본)') { rankDiff = (a.ranks.JP ?? 9999) - (b.ranks.JP ?? 9999); } 
      else { rankDiff = (a.ranks.INT ?? 9999) - (b.ranks.INT ?? 9999); }
      
      if (rankDiff !== 0) return rankDiff;
      return (catOrder[a.displayCategory] || 99) - (catOrder[b.displayCategory] || 99);
    });
  }, [data, filterRegion, filterCategory, filterNote, searchTerm]);

  const stats = useMemo(() => {
    const total = data.length;
    const brandCounts = {};
    data.forEach(item => {
      const b = getKrStr(item.brand);
      brandCounts[b] = (brandCounts[b] || 0) + 1;
    });
    const topBrands = Object.entries(brandCounts).sort((a,b)=>b[1]-a[1]).slice(0, 5);

    const krData = data.filter(d => d.ranks.KR !== undefined).sort((a,b)=> a.ranks.KR - b.ranks.KR);
    const jpData = data.filter(d => d.ranks.JP !== undefined).sort((a,b)=> a.ranks.JP - b.ranks.JP);
    
    const getTopCats = (list) => {
      const c = {};
      list.forEach(i => c[i.displayCategory] = (c[i.displayCategory] || 0) + 1);
      return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0, 3);
    };

    return { 
      total, 
      topBrands,
      krTotal: krData.length,
      jpTotal: jpData.length,
      krTopCats: getTopCats(krData),
      jpTopCats: getTopCats(jpData),
      krTopItems: krData.slice(0,3),
      jpTopItems: jpData.slice(0,3)
    };
  }, [data]);

  const pairingStats = useMemo(() => {
    const pairedPerfumes = data.filter(item => 
      extractNotes(item.top).includes(pairingNote) ||
      extractNotes(item.middle).includes(pairingNote) ||
      extractNotes(item.base).includes(pairingNote)
    );
    const result = calculateNoteFrequencies(pairedPerfumes);
    result.top = result.top.filter(([n]) => n !== pairingNote);
    result.middle = result.middle.filter(([n]) => n !== pairingNote);
    result.base = result.base.filter(([n]) => n !== pairingNote);
    return { count: pairedPerfumes.length, notes: result };
  }, [data, pairingNote]);

  const isSortInt = filterRegion === 'All' || filterRegion === 'Integrated (한+일)';
  const isSortKr = filterRegion === 'Korea (한국)';
  const isSortJp = filterRegion === 'Japan (일본)';

  const similarItems = useMemo(() => findSimilarPerfumes(benchmarkItem, data), [benchmarkItem, data]);

  const [posFilterCategory, setPosFilterCategory] = useState('All');
  const [hoveredPosItem, setHoveredPosItem] = useState(null);
  const posData = useMemo(() => data.filter(item => posFilterCategory === 'All' || item.displayCategory === posFilterCategory), [data, posFilterCategory]);

  const [shortlistCategory, setShortlistCategory] = useState('All');
  const targetData = useMemo(() => data.filter(item => targets.has(item.id)), [data, targets]);
  
  const filteredTargetData = useMemo(() => {
    if (shortlistCategory === 'All') return targetData;
    return targetData.filter(item => item.displayCategory === shortlistCategory);
  }, [targetData, shortlistCategory]);
  
  const targetNoteFreq = useMemo(() => calculateNoteFrequencies(filteredTargetData), [filteredTargetData]);

  useEffect(() => {
    if (shortlistCategory !== 'All' && targetData.filter(item => item.displayCategory === shortlistCategory).length === 0) {
      setShortlistCategory('All');
    }
  }, [targetData, shortlistCategory]);

  const exportToCSV = () => {
    if (filteredTargetData.length === 0) {
      alert("추출할 타겟 데이터가 없습니다.");
      return;
    }
    const headers = ["Brand", "Product Name", "Category", "Top Notes", "Middle Notes", "Base Notes", "INT Rank", "KR Rank", "JP Rank", "Description"];
    const csvContent = filteredTargetData.map(item => {
      return [
        `"${getKrStr(item.brand)}"`, `"${getKrStr(item.name)}"`, `"${item.displayCategory}"`,
        `"${getKrStr(item.top)}"`, `"${getKrStr(item.middle)}"`, `"${getKrStr(item.base)}"`,
        item.ranks.INT || '', item.ranks.KR || '', item.ranks.JP || '',
        `"${getKrStr(item.desc).replace(/"/g, '""')}"`
      ].join(",");
    });
    const csvString = [headers.join(","), ...csvContent].join("\n");
    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "target_shortlist.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        const parsedData = rows.slice(1).map((row, index) => {
          const cols = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || row.split(',');
          const cleanCol = (col) => col ? col.replace(/^"|"$/g, '').trim() : '';
          
          return {
            id: index + 10000,
            segment: cols[0] ? cleanCol(cols[0]) : "추가 데이터",
            category: cols[1] ? cleanCol(cols[1]) : "기타",
            brand: cols[2] ? cleanCol(cols[2]) : "Unknown",
            name: cols[3] ? cleanCol(cols[3]) : "Unknown",
            top: cols[4] ? cleanCol(cols[4]) : "",
            middle: cols[5] ? cleanCol(cols[5]) : "",
            base: cols[6] ? cleanCol(cols[6]) : "",
            desc: cols[7] ? cleanCol(cols[7]) : ""
          };
        }).filter(item => item.name && item.name !== 'Unknown');
        
        setRawData(prev => [...prev, ...parsedData]);
        alert(`${parsedData.length}개의 데이터가 성공적으로 추가되었습니다.`);
        e.target.value = null; 
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-stone-200 pb-20">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Droplet className="h-6 w-6 text-stone-800" />
              <span className="text-xl font-bold tracking-tight text-stone-900">
                Scent<span className="text-stone-400 font-medium">Intelligence</span>
              </span>
            </div>
            <div className="flex space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar pr-4">
              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-gray-500 hover:text-gray-900'}`}>
                <BarChart3 className="h-4 w-4" /> <span>Overview</span>
              </button>
              <button onClick={() => setActiveTab('database')} className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'database' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-gray-500 hover:text-gray-900'}`}>
                <Database className="h-4 w-4" /> <span>Database</span>
              </button>
              <button onClick={() => setActiveTab('positioning')} className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'positioning' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-gray-500 hover:text-gray-900'}`}>
                <Compass className="h-4 w-4" /> <span>Positioning</span>
              </button>
              <button onClick={() => setActiveTab('shortlist')} className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'shortlist' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-gray-500 hover:text-gray-900'}`}>
                <BookmarkCheck className="h-4 w-4" /> 
                <span>Shortlist</span>
                {targets.size > 0 && <span className="ml-1 bg-emerald-500 text-white py-0.5 px-1.5 rounded-full text-[10px] font-extrabold">{targets.size}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col justify-between">
                <div className="text-gray-600 text-sm font-bold flex items-center"><Database className="w-4 h-4 mr-2"/> Unique Perfumes</div>
                <div className="text-4xl font-black text-stone-900 mt-2">{stats.total}</div>
                <div className="text-xs font-semibold text-gray-400 mt-2">Analyzed market items</div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col justify-between">
                <div className="text-gray-600 text-sm font-bold flex items-center"><Target className="w-4 h-4 mr-2"/> Sample Targets</div>
                <div className="text-4xl font-black text-emerald-600 mt-2">{targets.size}</div>
                <div className="text-xs font-semibold text-gray-400 mt-2">Selected for evaluation</div>
              </div>
              <div className="bg-emerald-900 p-6 rounded-3xl shadow-md text-white flex flex-col justify-center items-center relative overflow-hidden group hover:bg-emerald-800 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-50"></div>
                <label className="relative z-10 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform w-full h-full justify-center">
                  <Upload className="h-8 w-8 mb-2 text-emerald-300" />
                  <span className="font-bold text-lg text-center leading-tight">Upload CSV</span>
                  <span className="text-xs text-emerald-400 mt-1 font-medium text-center">Add market data</span>
                  <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
               <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center text-stone-900"><PieChart className="w-6 h-6 mr-2 text-stone-700"/> Brand Market Share</h3>
                <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-md border border-stone-200">Top 5 Brands (Integrated)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {stats.topBrands.map(([brand, count], idx) => {
                  const percentage = Math.round((count / stats.total) * 100);
                  const isTop = idx === 0;
                  return (
                    <div key={brand} className={`p-4 rounded-2xl border ${isTop ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-black ${isTop ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'}`}>{idx+1}</span>
                        <span className={`font-bold text-sm truncate ${isTop ? 'text-indigo-900' : 'text-gray-700'}`} title={brand}>{brand}</span>
                      </div>
                      <div className="text-2xl font-black text-stone-900">{percentage}% <span className="text-sm font-medium text-gray-500">({count})</span></div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-blue-900 flex items-center">🇰🇷 Korea Market</h3>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{stats.krTotal} Items</span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">Top Categories</h4>
                  <div className="flex gap-2">
                    {stats.krTopCats.map(([cat, count], i) => (
                      <span key={cat} className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${i===0 ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-white text-blue-800 border-blue-200'}`}>
                        {cat} <span className="opacity-70 text-xs ml-1">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">Top Ranked Items</h4>
                  <div className="space-y-3">
                    {stats.krTopItems.map((item, i) => (
                      <div key={item.id} className="flex items-center p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                        <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-black mr-3 shrink-0">{i+1}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">{getKrStr(item.brand)}</div>
                          <div className="font-bold text-stone-900 truncate">{getKrStr(item.name)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-rose-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10"></div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-rose-900 flex items-center">🇯🇵 Japan Market</h3>
                  <span className="text-sm font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">{stats.jpTotal} Items</span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xs font-black text-rose-400 tracking-widest uppercase mb-3">Top Categories</h4>
                  <div className="flex gap-2">
                    {stats.jpTopCats.map(([cat, count], i) => (
                      <span key={cat} className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${i===0 ? 'bg-rose-600 text-white border-rose-700 shadow-md' : 'bg-white text-rose-800 border-rose-200'}`}>
                        {cat} <span className="opacity-70 text-xs ml-1">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-rose-400 tracking-widest uppercase mb-3">Top Ranked Items</h4>
                  <div className="space-y-3">
                    {stats.jpTopItems.map((item, i) => (
                      <div key={item.id} className="flex items-center p-3 rounded-xl bg-blue-50/50 border border-rose-100">
                        <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-black mr-3 shrink-0">{i+1}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">{getKrStr(item.brand)}</div>
                          <div className="font-bold text-stone-900 truncate">{getKrStr(item.name)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 p-8 rounded-3xl shadow-lg border border-stone-800 text-white relative overflow-hidden">
              <Beaker className="absolute -right-10 -top-10 w-64 h-64 text-stone-800 opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl font-black flex items-center text-stone-100 mb-2"><Beaker className="w-6 h-6 mr-3 text-emerald-400"/> Note Pairing Analyzer</h3>
                    <p className="text-stone-400 font-medium">특정 향료가 시장에서 어떤 노트들과 가장 성공적으로 조합되었는지 (Winning Formula) 분석합니다.</p>
                  </div>
                  <div className="flex items-center space-x-3 bg-stone-800 p-2 rounded-xl border border-stone-700">
                    <span className="text-sm font-bold text-stone-300 pl-2">Pivot Note:</span>
                    <select 
                      className="pl-4 pr-10 py-2.5 bg-stone-900 border border-stone-600 rounded-lg text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
                      value={pairingNote}
                      onChange={(e) => setPairingNote(e.target.value)}
                    >
                      {allPopularNotes.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <div className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700/50">
                  <div className="mb-6 text-center">
                    <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-300 font-black rounded-full border border-emerald-500/30 text-sm">
                      '{pairingNote}' 포함 향수 총 {pairingStats.count}개 분석 결과
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-stone-700 via-emerald-500 to-stone-700 -z-10 transform -translate-y-1/2"></div>
                    
                    <div className="bg-stone-900 p-5 rounded-xl border border-stone-700 shadow-md">
                      <div className="text-stone-400 text-xs font-black tracking-widest uppercase mb-4 text-center">Best Top Pairs</div>
                      <div className="space-y-3">
                        {pairingStats.notes.top.slice(0, 3).map(([note, count], i) => (
                          <div key={note} className="flex justify-between items-center bg-stone-800/50 px-3 py-2 rounded-lg border border-stone-700/50 hover:border-emerald-500/50 transition-colors">
                            <span className="font-bold text-stone-200">{note}</span>
                            <span className="text-xs font-black text-emerald-400">{Math.round(count/pairingStats.count*100)}%</span>
                          </div>
                        ))}
                        {pairingStats.notes.top.length === 0 && <div className="text-center text-stone-500 text-sm py-2">조합된 노트 없음</div>}
                      </div>
                    </div>

                    <div className="bg-stone-900 p-5 rounded-xl border border-stone-700 shadow-md">
                      <div className="text-stone-400 text-xs font-black tracking-widest uppercase mb-4 text-center">Best Middle Pairs</div>
                      <div className="space-y-3">
                        {pairingStats.notes.middle.slice(0, 3).map(([note, count], i) => (
                          <div key={note} className="flex justify-between items-center bg-stone-800/50 px-3 py-2 rounded-lg border border-stone-700/50 hover:border-emerald-500/50 transition-colors">
                            <span className="font-bold text-stone-200">{note}</span>
                            <span className="text-xs font-black text-emerald-400">{Math.round(count/pairingStats.count*100)}%</span>
                          </div>
                        ))}
                        {pairingStats.notes.middle.length === 0 && <div className="text-center text-stone-500 text-sm py-2">조합된 노트 없음</div>}
                      </div>
                    </div>

                    <div className="bg-stone-900 p-5 rounded-xl border border-stone-700 shadow-md">
                      <div className="text-stone-400 text-xs font-black tracking-widest uppercase mb-4 text-center">Best Base Pairs</div>
                      <div className="space-y-3">
                        {pairingStats.notes.base.slice(0, 3).map(([note, count], i) => (
                          <div key={note} className="flex justify-between items-center bg-stone-800/50 px-3 py-2 rounded-lg border border-stone-700/50 hover:border-emerald-500/50 transition-colors">
                            <span className="font-bold text-stone-200">{note}</span>
                            <span className="text-xs font-black text-emerald-400">{Math.round(count/pairingStats.count*100)}%</span>
                          </div>
                        ))}
                        {pairingStats.notes.base.length === 0 && <div className="text-center text-stone-500 text-sm py-2">조합된 노트 없음</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-200 flex flex-col xl:flex-row gap-4 justify-between items-center sticky top-20 z-10">
              <div className="flex flex-wrap w-full xl:w-auto gap-3">
                <div className="relative flex-1 min-w-[160px]">
                  <Wind className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <select 
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500 appearance-none shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                  >
                    {regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                  </select>
                </div>
                <div className="relative flex-1 min-w-[160px]">
                  <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <select 
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500 appearance-none shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="relative flex-1 min-w-[160px]">
                  <Beaker className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <select 
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500 appearance-none shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                    value={filterNote}
                    onChange={(e) => setFilterNote(e.target.value)}
                  >
                    <option value="All">All Notes</option>
                    {allPopularNotes.map(note => <option key={note} value={note}>{note}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center w-full xl:w-auto space-x-3">
                <div className="relative w-full xl:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search perfumes..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500 shadow-sm transition-shadow hover:shadow-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-300 flex-shrink-0 shadow-sm">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-stone-900' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'}`}>
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-stone-900' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'}`}>
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-sm font-bold text-gray-600 px-2 flex justify-between items-center">
              <span>Showing <strong className="text-stone-900 text-lg mx-1">{filteredData.length}</strong> unique results</span>
            </div>

            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-300">
                {filteredData.map((item) => {
                  const isTarget = targets.has(item.id);
                  const theme = getCategoryTheme(item.displayCategory);

                  return (
                    <div key={item.id} className={`rounded-3xl p-7 shadow-sm border-2 transition-all duration-200 flex flex-col relative ${theme.card} ${isTarget ? 'ring-4 ring-emerald-500 ring-offset-2 shadow-2xl border-emerald-400' : 'hover:shadow-xl hover:-translate-y-1'}`}>
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.ranks.INT !== undefined && (
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold border transition-colors ${isSortInt ? 'bg-amber-500 text-white border-amber-600 shadow-md' : 'bg-white/80 text-gray-500 border-gray-300'}`}>
                                {isSortInt && <Trophy className="w-3 h-3 mr-1 text-amber-100" />} 한+일 {item.ranks.INT}위
                              </span>
                            )}
                            {item.ranks.KR !== undefined && (
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold border transition-colors ${isSortKr ? 'bg-blue-500 text-white border-blue-600 shadow-md' : 'bg-white/80 text-gray-500 border-gray-300'}`}>
                                {isSortKr && <Trophy className="w-3 h-3 mr-1 text-blue-100" />} 한국 {item.ranks.KR}위
                              </span>
                            )}
                            {item.ranks.JP !== undefined && (
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold border transition-colors ${isSortJp ? 'bg-rose-500 text-white border-rose-600 shadow-md' : 'bg-white/80 text-gray-500 border-gray-300'}`}>
                                {isSortJp && <Trophy className="w-3 h-3 mr-1 text-rose-100" />} 일본 {item.ranks.JP}위
                              </span>
                            )}
                          </div>
                          <div className={`text-sm font-extrabold tracking-widest uppercase mt-3 ${theme.brand}`}>{getKrStr(item.brand)}</div>
                          <div className={`text-2xl font-black mt-1 leading-tight tracking-tight ${theme.text}`}>{getKrStr(item.name)}</div>
                        </div>
                        <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black border whitespace-nowrap ml-3 shadow-md ${theme.badge}`}>
                          {item.displayCategory}
                        </span>
                      </div>

                      <div className={`space-y-3 mt-4 flex-grow p-5 rounded-2xl border shadow-inner ${theme.noteBg.replace('text', 'border')}`}>
                        <NoteRow label="TOP" data={item.top} theme={theme} />
                        <NoteRow label="MID" data={item.middle} theme={theme} />
                        <NoteRow label="BASE" data={item.base} theme={theme} />
                      </div>

                      <div className={`mt-5 pt-5 border-t border-black/10 text-sm line-clamp-3 font-semibold leading-relaxed ${theme.text}`}>
                        {getKrStr(item.desc)}
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button onClick={() => toggleTarget(item.id)} className={`flex-1 flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-extrabold transition-all shadow-md ${isTarget ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-500 ring-offset-2 border border-emerald-600' : 'bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-100'}`}>
                          <Target className={`w-5 h-5 mr-2 ${isTarget ? 'text-emerald-100' : 'text-gray-500'}`} />
                          {isTarget ? 'Target Selected' : 'Set Target'}
                        </button>
                        <button onClick={() => setBenchmarkItem(item)} className="flex items-center justify-center w-14 rounded-xl bg-indigo-50 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-300 transition-all shadow-sm" title="유사 제품 분석">
                          <Sparkles className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="overflow-x-auto bg-white border border-gray-300 rounded-3xl shadow-md animate-in fade-in duration-300">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 border-b-2 border-gray-300 text-gray-800 font-extrabold">
                    <tr>
                      <th className="px-5 py-4 whitespace-nowrap w-10 text-center">Target</th>
                      <th className="px-5 py-4 whitespace-nowrap min-w-[80px]">Rank</th>
                      <th className="px-5 py-4 whitespace-nowrap">Brand</th>
                      <th className="px-5 py-4 whitespace-nowrap min-w-[180px]">Product</th>
                      <th className="px-5 py-4 whitespace-nowrap">Category</th>
                      <th className="px-5 py-4 whitespace-nowrap min-w-[120px]">Top Notes</th>
                      <th className="px-5 py-4 whitespace-nowrap min-w-[120px]">Middle Notes</th>
                      <th className="px-5 py-4 whitespace-nowrap min-w-[120px]">Base Notes</th>
                      <th className="px-5 py-4 whitespace-nowrap min-w-[250px]">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map(item => {
                      const isTarget = targets.has(item.id);
                      const theme = getCategoryTheme(item.displayCategory);
                      return (
                        <tr key={item.id} className={`transition-colors ${theme.card} ${theme.rowHover} ${isTarget ? 'ring-2 ring-inset ring-emerald-500 bg-emerald-50 border-y-2 border-emerald-500' : ''}`}>
                          <td className="px-5 py-5 align-top text-center border-b border-black/5">
                            <div className="flex flex-col gap-2 items-center">
                              <button onClick={() => toggleTarget(item.id)} className={`p-2 rounded-lg transition-all shadow-sm ${isTarget ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400 border border-gray-300 hover:bg-gray-100'}`} title="타겟 설정">
                                <Target className="w-5 h-5" />
                              </button>
                              <button onClick={() => setBenchmarkItem(item)} className="p-2 rounded-lg transition-all shadow-sm bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100" title="유사 제품 분석">
                                <Sparkles className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                          <td className="px-5 py-5 align-top border-b border-black/5">
                            <div className="flex flex-col gap-1.5">
                              {item.ranks.INT !== undefined && <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-extrabold ${isSortInt ? 'bg-amber-500 text-white shadow-sm' : 'bg-white/80 text-gray-500 border border-gray-300'} whitespace-nowrap`}>한+일 {item.ranks.INT}위</span>}
                              {item.ranks.KR !== undefined && <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-extrabold ${isSortKr ? 'bg-blue-500 text-white shadow-sm' : 'bg-white/80 text-gray-500 border border-gray-300'} whitespace-nowrap`}>한국 {item.ranks.KR}위</span>}
                              {item.ranks.JP !== undefined && <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-extrabold ${isSortJp ? 'bg-rose-500 text-white shadow-sm' : 'bg-white/80 text-gray-500 border border-gray-300'} whitespace-nowrap`}>일본 {item.ranks.JP}위</span>}
                            </div>
                          </td>
                          <td className="px-5 py-5 align-top whitespace-nowrap border-b border-black/5">
                            <div className={`font-extrabold tracking-wider uppercase text-sm ${theme.brand}`}>{getKrStr(item.brand)}</div>
                          </td>
                          <td className="px-5 py-5 align-top border-b border-black/5">
                            <div className={`font-black text-lg leading-tight ${theme.text}`}>{getKrStr(item.name)}</div>
                          </td>
                          <td className="px-5 py-5 align-top whitespace-nowrap border-b border-black/5">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black border shadow-sm ${theme.badge}`}>{item.displayCategory}</span>
                          </td>
                          <td className={`px-5 py-5 align-top text-xs font-bold border-b border-black/5 ${theme.text}`}>{getKrStr(item.top).split('/').join(', ')}</td>
                          <td className={`px-5 py-5 align-top text-xs font-bold border-b border-black/5 ${theme.text}`}>{getKrStr(item.middle).split('/').join(', ')}</td>
                          <td className={`px-5 py-5 align-top text-xs font-bold border-b border-black/5 ${theme.text}`}>{getKrStr(item.base).split('/').join(', ')}</td>
                          <td className={`px-5 py-5 align-top text-sm font-semibold leading-relaxed border-b border-black/5 ${theme.text}`}><div className="line-clamp-3">{getKrStr(item.desc)}</div></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {filteredData.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-300">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-bold text-xl">No fragrances match your criteria.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'positioning' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center sticky top-20 z-10">
              <div className="flex items-center space-x-3">
                <Leaf className="h-6 w-6 text-stone-600" />
                <span className="text-base font-bold text-stone-900">Category Filter:</span>
                <select 
                  className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-stone-500 shadow-sm cursor-pointer"
                  value={posFilterCategory}
                  onChange={(e) => setPosFilterCategory(e.target.value)}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="hidden sm:flex space-x-5 text-sm font-bold text-stone-700">
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-lime-500 mr-2 shadow-md"></span>시트러스</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-rose-500 mr-2 shadow-md"></span>플로럴</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-amber-500 mr-2 shadow-md"></span>구어망드</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-purple-500 mr-2 shadow-md"></span>머스크</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-stone-600 mr-2 shadow-md"></span>우드</div>
              </div>
            </div>

            <div className="relative w-full h-[700px] bg-white border-2 border-gray-200 rounded-3xl shadow-inner overflow-hidden select-none">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100"></div>
              <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-100"></div>

              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-sm font-black text-gray-400 tracking-widest uppercase bg-white/90 px-4 py-1 rounded-full shadow-sm backdrop-blur-sm border border-gray-200">Warm / Sweet (따뜻함/달콤함)</div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-black text-gray-400 tracking-widest uppercase bg-white/90 px-4 py-1 rounded-full shadow-sm backdrop-blur-sm border border-gray-200">Cool / Fresh (시원함/청량함)</div>
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 -rotate-90 origin-left text-sm font-black text-gray-400 tracking-widest uppercase bg-white/90 px-4 py-1 rounded-full shadow-sm backdrop-blur-sm border border-gray-200">Light / Airy (가벼움)</div>
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 rotate-90 origin-right text-sm font-black text-gray-400 tracking-widest uppercase bg-white/90 px-4 py-1 rounded-full shadow-sm backdrop-blur-sm border border-gray-200">Heavy / Deep (무거움)</div>

              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 font-black text-4xl sm:text-5xl pointer-events-none z-0">Soft & Cozy</div>
              <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-gray-100 font-black text-4xl sm:text-5xl pointer-events-none z-0">Rich & Sensual</div>
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 text-gray-100 font-black text-4xl sm:text-5xl pointer-events-none z-0">Clean & Crisp</div>
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 text-gray-100 font-black text-4xl sm:text-5xl pointer-events-none z-0">Dark & Woody</div>

              {posData.map(item => {
                const leftPos = `${(item.posX + 100) / 2}%`;
                const topPos = `${100 - (item.posY + 100) / 2}%`;
                const isHovered = hoveredPosItem?.id === item.id;
                
                return (
                  <div key={item.id} className={`absolute ${isHovered ? 'z-40' : 'z-10'}`} style={{ left: leftPos, top: topPos }} onMouseEnter={() => setHoveredPosItem(item)} onMouseLeave={() => setHoveredPosItem(null)}>
                    <div className={`w-4 h-4 rounded-full ${item.colorClass} border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${isHovered ? 'scale-150 ring-4 ring-stone-900 ring-offset-2' : 'hover:scale-125'}`}></div>
                  </div>
                );
              })}

              {hoveredPosItem && (() => {
                const xPct = (hoveredPosItem.posX + 100) / 2;
                const yPct = 100 - (hoveredPosItem.posY + 100) / 2;
                let transX = '-50%';
                let transY = '-115%'; 
                let arrowClass = 'absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-stone-900 border-b border-r border-stone-700 rotate-45';

                if (yPct < 25) {
                  transY = '15%';
                  arrowClass = 'absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-stone-900 border-t border-l border-stone-700 rotate-45';
                }
                if (xPct < 15) {
                  transX = '-10%';
                  arrowClass = yPct < 25 
                    ? 'absolute -top-2 left-6 w-4 h-4 bg-stone-900 border-t border-l border-stone-700 rotate-45'
                    : 'absolute -bottom-2 left-6 w-4 h-4 bg-stone-900 border-b border-r border-stone-700 rotate-45';
                } else if (xPct > 85) {
                  transX = '-90%';
                  arrowClass = yPct < 25 
                    ? 'absolute -top-2 right-6 w-4 h-4 bg-stone-900 border-t border-l border-stone-700 rotate-45'
                    : 'absolute -bottom-2 right-6 w-4 h-4 bg-stone-900 border-b border-r border-stone-700 rotate-45';
                }

                return (
                  <div 
                    className="absolute z-50 bg-stone-900 text-white p-4 rounded-xl shadow-2xl w-64 pointer-events-none transition-all duration-200 animate-in fade-in border border-stone-700"
                    style={{
                      left: `${xPct}%`, 
                      top: `${yPct}%`,
                      transform: `translate(${transX}, ${transY})`
                    }}
                  >
                    <div className="text-xs text-stone-400 font-extrabold tracking-widest mb-1.5 uppercase">
                      {getKrStr(hoveredPosItem.brand)}
                    </div>
                    <div className="font-black text-lg mb-2 leading-tight text-white">
                      {getKrStr(hoveredPosItem.name)}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="bg-stone-700 px-2 py-1 rounded text-xs font-bold text-stone-100 border border-stone-600">
                        {hoveredPosItem.displayCategory}
                      </span>
                      {hoveredPosItem.ranks.INT !== undefined && (
                        <span className="flex items-center text-xs font-extrabold text-amber-400 bg-amber-900/50 px-2 py-1 rounded border border-amber-700">
                          <Trophy className="w-3 h-3 mr-1" /> 통합 {hoveredPosItem.ranks.INT}위
                        </span>
                      )}
                    </div>
                    <div className={arrowClass}></div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {activeTab === 'shortlist' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-emerald-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden border border-emerald-800">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                <BookmarkCheck className="w-80 h-80" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-4xl font-black mb-3">Target Shortlist</h2>
                  <p className="text-emerald-100 font-medium text-lg">
                    현재까지 선택된 타겟 향수는 총 <strong className="text-white font-black bg-emerald-800 px-2 py-0.5 rounded">{targets.size}개</strong> 입니다.
                  </p>
                </div>
                <button onClick={exportToCSV} disabled={targets.size === 0} className="flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-900/50 disabled:text-emerald-700/50 text-white rounded-2xl font-black text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border border-emerald-400">
                  <Download className="w-6 h-6 mr-3" /> Export to CSV
                </button>
              </div>

              {targets.size > 0 && (
                <div className="mt-10 flex flex-wrap gap-3 relative z-10">
                  {categories.map(cat => {
                    const isSelected = shortlistCategory === cat;
                    const count = cat === 'All' 
                      ? targetData.length 
                      : targetData.filter(d => d.displayCategory === cat).length;
                    
                    if (cat !== 'All' && count === 0) return null;

                    return (
                      <button
                        key={cat}
                        onClick={() => setShortlistCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-black transition-all border-2 shadow-sm ${
                          isSelected 
                            ? 'bg-emerald-400 border-emerald-300 text-emerald-950 scale-105' 
                            : 'bg-emerald-800/80 border-emerald-700/80 text-emerald-100 hover:bg-emerald-700 hover:border-emerald-500'
                        }`}
                      >
                        {cat} <span className="ml-1.5 opacity-80 text-xs bg-black/10 px-2 py-0.5 rounded-full">{count}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {filteredTargetData.length > 0 && (
                <div className="mt-8 pt-8 border-t-2 border-emerald-800/50 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-emerald-950/30 p-6 rounded-2xl border border-emerald-800/50">
                    <div className="text-emerald-300 text-sm font-black tracking-widest uppercase mb-4 flex items-center"><Leaf className="w-4 h-4 mr-2"/> Common Top Notes</div>
                    {targetNoteFreq.top.slice(0, 3).map(([note, count], i) => (
                      <div key={note} className="flex justify-between items-center mb-3 text-base">
                        <span className="flex items-center font-bold"><span className="w-6 h-6 bg-emerald-800 rounded-md text-xs flex items-center justify-center mr-3 text-emerald-200">{i+1}</span> {note}</span>
                        <span className="text-emerald-100 font-extrabold bg-emerald-800/50 px-2 py-1 rounded-lg">{count}건</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-emerald-950/30 p-6 rounded-2xl border border-emerald-800/50">
                    <div className="text-emerald-300 text-sm font-black tracking-widest uppercase mb-4 flex items-center"><Wind className="w-4 h-4 mr-2"/> Common Middle Notes</div>
                    {targetNoteFreq.middle.slice(0, 3).map(([note, count], i) => (
                      <div key={note} className="flex justify-between items-center mb-3 text-base">
                        <span className="flex items-center font-bold"><span className="w-6 h-6 bg-emerald-800 rounded-md text-xs flex items-center justify-center mr-3 text-emerald-200">{i+1}</span> {note}</span>
                        <span className="text-emerald-100 font-extrabold bg-emerald-800/50 px-2 py-1 rounded-lg">{count}건</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-emerald-950/30 p-6 rounded-2xl border border-emerald-800/50">
                    <div className="text-emerald-300 text-sm font-black tracking-widest uppercase mb-4 flex items-center"><Droplet className="w-4 h-4 mr-2"/> Common Base Notes</div>
                    {targetNoteFreq.base.slice(0, 3).map(([note, count], i) => (
                      <div key={note} className="flex justify-between items-center mb-3 text-base">
                        <span className="flex items-center font-bold"><span className="w-6 h-6 bg-emerald-800 rounded-md text-xs flex items-center justify-center mr-3 text-emerald-200">{i+1}</span> {note}</span>
                        <span className="text-emerald-100 font-extrabold bg-emerald-800/50 px-2 py-1 rounded-lg">{count}건</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {targets.size === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-300 shadow-sm">
                <BookmarkCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-gray-900 mb-2">장바구니가 비어있습니다.</h3>
                <p className="text-gray-500 font-medium text-lg">Database에서 타겟 향수를 먼저 선택해주세요.</p>
                <button onClick={() => setActiveTab('database')} className="mt-8 px-8 py-4 bg-stone-900 text-white rounded-2xl text-lg font-black shadow-xl hover:bg-stone-800 hover:-translate-y-1 transition-all">
                  Go to Database
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTargetData.map((item) => {
                  const theme = getCategoryTheme(item.displayCategory);
                  return (
                    <div key={item.id} className={`rounded-3xl p-7 shadow-lg border-2 border-emerald-500 flex flex-col relative ${theme.card}`}>
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <div className={`text-sm font-extrabold tracking-widest uppercase mt-1 ${theme.brand}`}>{getKrStr(item.brand)}</div>
                          <div className={`text-2xl font-black mt-1 leading-tight ${theme.text}`}>{getKrStr(item.name)}</div>
                        </div>
                        <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black border whitespace-nowrap ml-3 shadow-md ${theme.badge}`}>
                          {item.displayCategory}
                        </span>
                      </div>
                      <div className={`space-y-3 mt-4 flex-grow p-5 rounded-2xl border shadow-inner ${theme.noteBg.replace('text', 'border')}`}>
                        <NoteRow label="TOP" data={item.top} theme={theme} />
                        <NoteRow label="MID" data={item.middle} theme={theme} />
                        <NoteRow label="BASE" data={item.base} theme={theme} />
                      </div>
                      <button onClick={() => toggleTarget(item.id)} className="mt-6 w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-black bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all shadow-sm">
                        Remove from Shortlist
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {benchmarkItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setBenchmarkItem(null)}>
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white/90 backdrop-blur-md px-8 py-5 border-b border-stone-100 flex justify-between items-center z-20">
                <div>
                  <h2 className="text-2xl font-black text-stone-900 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3 text-indigo-600" /> Benchmark Analyzer
                  </h2>
                  <p className="text-sm font-bold text-stone-500 mt-1">선택하신 제품과 가장 유사한 노트를 가진 시장 내 경쟁 제품 Top 3</p>
                </div>
                <button onClick={() => setBenchmarkItem(null)} className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-700">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 flex flex-col">
                  <div className="text-xs font-black text-indigo-500 tracking-widest uppercase mb-4 pl-2 flex items-center">
                    <Target className="w-4 h-4 mr-1.5" /> Target Benchmark
                  </div>
                  <div className={`flex-1 rounded-3xl p-7 shadow-inner border-2 border-indigo-200 bg-indigo-50 flex flex-col relative`}>
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <div className="text-sm font-extrabold tracking-widest uppercase mt-1 text-indigo-800/70">{getKrStr(benchmarkItem.brand)}</div>
                        <div className="text-3xl font-black mt-1 leading-tight text-indigo-950">{getKrStr(benchmarkItem.name)}</div>
                      </div>
                    </div>
                    <div className="space-y-3 mt-4 flex-grow p-5 rounded-2xl bg-white shadow-sm border border-indigo-100">
                      <NoteRow label="TOP" data={benchmarkItem.top} theme={{text: 'text-indigo-900', noteBg: 'bg-indigo-50 border-indigo-200 text-indigo-800'}} />
                      <NoteRow label="MID" data={benchmarkItem.middle} theme={{text: 'text-indigo-900', noteBg: 'bg-indigo-50 border-indigo-200 text-indigo-800'}} />
                      <NoteRow label="BASE" data={benchmarkItem.base} theme={{text: 'text-indigo-900', noteBg: 'bg-indigo-50 border-indigo-200 text-indigo-800'}} />
                    </div>
                    <div className="mt-5 pt-5 border-t border-indigo-200/50 text-sm font-bold leading-relaxed text-indigo-900/80 line-clamp-4">
                      {getKrStr(benchmarkItem.desc)}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col">
                  <div className="text-xs font-black text-stone-500 tracking-widest uppercase mb-4 pl-2 flex items-center justify-between">
                    <span>Top 3 Competitors</span>
                    <span className="font-bold text-indigo-500 lowercase normal-case tracking-normal bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">공통 향조 하이라이트</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {similarItems.map((match, idx) => {
                      const item = match.item;
                      const theme = getCategoryTheme(item.displayCategory);
                      
                      const renderHighlightedNoteRow = (label, dataStr) => {
                        const krNotes = getKrStr(dataStr).split('/').map(n => n.trim()).filter(n => n);
                        return (
                          <div className="flex items-start">
                            <span className={`w-10 text-[10px] font-extrabold mt-1.5 tracking-widest opacity-70 uppercase ${theme.text}`}>{label}</span>
                            <div className="flex-1 flex flex-wrap gap-1.5">
                              {krNotes.map((note, i) => {
                                const isShared = match.sharedNotes.includes(note);
                                return (
                                  <span key={i} className={`border-2 text-[10px] px-2 py-1 rounded-md shadow-sm font-bold transition-all ${isShared ? 'bg-indigo-500 border-indigo-600 text-white scale-105' : theme.noteBg}`}>
                                    {note}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      };

                      return (
                        <div key={item.id} className={`rounded-3xl p-6 shadow-sm border-2 transition-all duration-200 flex flex-col relative ${theme.card} hover:shadow-md`}>
                          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-black border-4 border-white shadow-md z-10">{idx+1}</div>
                          
                          <div className="flex justify-between items-start mb-4 mt-2">
                            <div>
                              <div className={`text-[10px] font-extrabold tracking-widest uppercase mt-1 ${theme.brand}`}>{getKrStr(item.brand)}</div>
                              <div className={`text-xl font-black mt-1 leading-tight ${theme.text}`}>{getKrStr(item.name)}</div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 shadow-sm flex items-center w-max">
                              <Sparkles className="w-3 h-3 mr-1"/> {match.score} Notes Matched
                            </span>
                          </div>

                          <div className={`space-y-2 mt-auto flex-grow p-4 rounded-xl border shadow-inner ${theme.noteBg.replace('text', 'border')}`}>
                            {renderHighlightedNoteRow("TOP", item.top)}
                            {renderHighlightedNoteRow("MID", item.middle)}
                            {renderHighlightedNoteRow("BASE", item.base)}
                          </div>
                        </div>
                      )
                    })}
                    {similarItems.length === 0 && (
                      <div className="col-span-3 text-center py-20 text-gray-500 font-bold bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        유사한 노트를 가진 향수를 찾지 못했습니다.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

function NoteRow({ label, data, theme }) {
  const krNotes = getKrStr(data).split('/').map(n => n.trim()).filter(n => n);
  return (
    <div className="flex items-start">
      <span className={`w-10 text-xs font-extrabold mt-1.5 tracking-widest opacity-70 uppercase ${theme.text}`}>{label}</span>
      <div className="flex-1 flex flex-wrap gap-2">
        {krNotes.map((note, idx) => (
          <span key={idx} className={`border-2 text-xs px-3 py-1.5 rounded-lg shadow-sm font-bold ${theme.noteBg}`}>
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
