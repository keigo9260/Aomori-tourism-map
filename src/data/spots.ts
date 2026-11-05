export type Category = "sightseeing" | "food" | "onsen";
export type Area =
  | "青森・浅虫"
  | "弘前・津軽"
  | "十和田・八甲田"
  | "八戸・三沢"
  | "下北";
export type Artwork =
  | "stream"
  | "castle"
  | "lake"
  | "coast"
  | "shrine"
  | "nebuta"
  | "bowl"
  | "seafood"
  | "tuna"
  | "bath"
  | "forest-bath"
  | "sunset-bath";

export interface Spot {
  id: string;
  prefecture: string;
  name: string;
  reading: string;
  category: Category;
  area: Area;
  municipality: string;
  description: string;
  story: string;
  tags: string[];
  coordinates: [number, number];
  season: string;
  tip: string;
  officialUrl: string;
  artwork: Artwork;
}

export const categories: {
  id: Category | "all";
  label: string;
  english: string;
}[] = [
  { id: "all", label: "すべて", english: "ALL SPOTS" },
  { id: "sightseeing", label: "観光スポット", english: "EXPLORE" },
  { id: "food", label: "食事処", english: "TASTE" },
  { id: "onsen", label: "温泉", english: "RELAX" },
];

export const areas: Area[] = [
  "青森・浅虫",
  "弘前・津軽",
  "十和田・八甲田",
  "八戸・三沢",
  "下北",
];
export const categoryLabel = (category: Category) =>
  categories.find((item) => item.id === category)!.label;

export const spots: Spot[] = [
  {
    id: "oirase",
    prefecture: "aomori",
    name: "奥入瀬渓流",
    reading: "おいらせけいりゅう",
    category: "sightseeing",
    area: "十和田・八甲田",
    municipality: "十和田市",
    description: "木漏れ日と水音に包まれる、森の散歩道。",
    story:
      "十和田湖の子ノ口から焼山まで、約14kmにわたって続く渓流。苔むした岩やいくつもの滝が織りなす風景は、歩くたびに表情を変えます。深呼吸しながら、自分のペースで森の時間を楽しんで。",
    tags: ["自然", "散策", "新緑・紅葉"],
    coordinates: [141.014, 40.526],
    season: "新緑の5〜6月、紅葉の10月ごろ",
    tip: "歩きやすい靴で。紅葉期は交通規制があるため、事前にアクセス情報を確認しましょう。",
    officialUrl: "https://towadako.or.jp/",
    artwork: "stream",
  },
  {
    id: "hirosaki",
    prefecture: "aomori",
    name: "弘前公園",
    reading: "ひろさきこうえん",
    category: "sightseeing",
    area: "弘前・津軽",
    municipality: "弘前市",
    description: "お城と桜、津軽の四季に出会う場所。",
    story:
      "弘前城を中心に広がる、歴史と自然に彩られた公園。春は桜と花筏、夏は緑、秋は紅葉、冬は雪景色と、一年を通じて訪ねたくなる場所です。お濠に沿って歩けば、城下町のゆったりした空気を感じられます。",
    tags: ["歴史", "桜", "公園"],
    coordinates: [140.464, 40.607],
    season: "通年。桜は例年4月下旬〜5月上旬",
    tip: "桜の開花時期や城内の工事・公開状況は、公式情報で確認してください。",
    officialUrl: "https://www.hirosakipark.jp/",
    artwork: "castle",
  },
  {
    id: "sukayu",
    prefecture: "aomori",
    name: "酸ヶ湯温泉",
    reading: "すかゆおんせん",
    category: "onsen",
    area: "十和田・八甲田",
    municipality: "青森市",
    description: "八甲田の山あい、湯けむりにほどける。",
    story:
      "八甲田山の麓に佇む、歴史ある温泉宿。総ヒバ造りの大浴場「ヒバ千人風呂」で知られています。木のぬくもりと白く濁った湯に包まれて、旅の疲れをゆっくり癒やすひとときを。",
    tags: ["名湯", "日帰り入浴", "山の温泉"],
    coordinates: [140.851, 40.649],
    season: "通年。冬は雪道の装備が必要",
    tip: "千人風呂は混浴で、女性専用時間もあります。利用時間・日帰り受付は公式サイトで確認を。",
    officialUrl: "https://sukayu.jp/",
    artwork: "bath",
  },
  {
    id: "nokke",
    prefecture: "aomori",
    name: "青森魚菜センター",
    reading: "あおもりぎょさいセンター のっけどん",
    category: "food",
    area: "青森・浅虫",
    municipality: "青森市",
    description: "好きな海の幸で、自分だけの「のっけ丼」。",
    story:
      "市場のお店を巡りながら、ご飯に好きな具材をのせて楽しむ「のっけ丼」。お刺身や惣菜など、その日気になる味を少しずつ選べるのが魅力です。お店の人との会話も、旅のおいしい思い出に。",
    tags: ["海鮮", "市場", "ご当地グルメ"],
    coordinates: [140.734, 40.826],
    season: "通年。旬の魚介は季節で変わります",
    tip: "食事券の販売方法・営業日を確認してから訪問を。朝から楽しめる市場です。",
    officialUrl: "https://nokkedon.jp/",
    artwork: "bowl",
  },
  {
    id: "towada",
    prefecture: "aomori",
    name: "十和田湖",
    reading: "とわだこ",
    category: "sightseeing",
    area: "十和田・八甲田",
    municipality: "十和田市ほか",
    description: "深い青に、時間を忘れる湖畔の休日。",
    story:
      "青森県と秋田県にまたがる、雄大なカルデラ湖。休屋周辺の散策や遊覧船から、穏やかな水面と山々が重なる景色を楽しめます。湖畔に腰を下ろして、ただ景色を眺める贅沢もおすすめです。",
    tags: ["絶景", "湖", "散策"],
    coordinates: [140.899, 40.425],
    season: "春〜秋。遊覧船は運航情報を確認",
    tip: "湖畔は街中より冷えやすいため、羽織れるものがあると安心です。",
    officialUrl: "https://towadako.or.jp/",
    artwork: "lake",
  },
  {
    id: "furofushi",
    prefecture: "aomori",
    name: "黄金崎不老ふ死温泉",
    reading: "こがねざきふろうふしおんせん",
    category: "onsen",
    area: "弘前・津軽",
    municipality: "深浦町",
    description: "日本海とひとつになる、海辺の露天風呂。",
    story:
      "日本海を間近に望む、海辺の露天風呂で知られる温泉。赤褐色のお湯と雄大な海の風景に、日常を忘れられます。海岸の自然を感じながら、ゆったりと湯浴みを楽しみたい一軒です。",
    tags: ["露天風呂", "海の絶景", "日帰り入浴"],
    coordinates: [139.922, 40.6],
    season: "通年。海辺の露天風呂は天候によります",
    tip: "日帰りと宿泊では海辺の露天風呂の利用時間が異なります。夕景を希望する場合も事前確認を。",
    officialUrl: "https://www.furofushi.com/",
    artwork: "sunset-bath",
  },
  {
    id: "hotokegaura",
    prefecture: "aomori",
    name: "仏ヶ浦",
    reading: "ほとけがうら",
    category: "sightseeing",
    area: "下北",
    municipality: "佐井村",
    description: "白い巨岩と青い海、地球がつくった彫刻。",
    story:
      "下北半島の西海岸に連なる、白緑色の奇岩群。長い年月をかけて風雨や波が削り出した景観は、自然の力強さを感じさせます。海から見上げる景色も、遊歩道を歩いて近づく景色も格別です。",
    tags: ["絶景", "海", "秘境"],
    coordinates: [140.809, 41.312],
    season: "春〜秋。観光船は天候や季節で変動",
    tip: "駐車場から海岸までは急な階段があります。体力や天候に合わせて観光船も検討を。",
    officialUrl: "https://saikanko.sakura.ne.jp/",
    artwork: "coast",
  },
  {
    id: "minato",
    prefecture: "aomori",
    name: "みなと食堂",
    reading: "みなとしょくどう",
    category: "food",
    area: "八戸・三沢",
    municipality: "八戸市",
    description: "港町・八戸で味わう、名物の平目漬丼。",
    story:
      "八戸の陸奥湊エリアにある、海鮮の食堂。名物として知られる平目の漬丼を目当てに、遠方からも人が訪れます。港町の空気を感じながら、青森の海の恵みを味わってみませんか。",
    tags: ["海鮮", "平目漬丼", "港町"],
    coordinates: [141.527, 40.523],
    season: "通年。入荷状況でメニューが変わります",
    tip: "売り切れや臨時休業の場合があります。営業状況を確認し、余裕を持った訪問がおすすめ。",
    officialUrl: "https://visithachinohe.com/",
    artwork: "seafood",
  },
  {
    id: "takayama",
    prefecture: "aomori",
    name: "高山稲荷神社",
    reading: "たかやまいなりじんじゃ",
    category: "sightseeing",
    area: "弘前・津軽",
    municipality: "つがる市",
    description: "庭園をうねる朱の鳥居、静かな祈りの道。",
    story:
      "日本庭園の中を龍のように連なる千本鳥居が印象的な神社。朱色と緑が織りなす美しさを、ゆっくり歩きながら楽しめます。五穀豊穣や商売繁盛などの祈りを集める、津軽の名所です。",
    tags: ["神社", "千本鳥居", "庭園"],
    coordinates: [140.317, 40.919],
    season: "通年。新緑や雪景色もおすすめ",
    tip: "参拝の場所です。周囲に配慮しながら、静かに散策・撮影しましょう。",
    officialUrl: "https://takayamainari.jp/",
    artwork: "shrine",
  },
  {
    id: "tsuta",
    prefecture: "aomori",
    name: "蔦温泉",
    reading: "つたおんせん",
    category: "onsen",
    area: "十和田・八甲田",
    municipality: "十和田市",
    description: "ブナの森に抱かれて、足元から湧く湯を。",
    story:
      "奥入瀬のほど近く、ブナの森に佇む温泉宿。湯船の底から源泉が湧き出す温泉が特徴です。木造の趣ある空間で、森の静けさとやわらかなお湯に身をゆだねるひとときを。",
    tags: ["秘湯", "自然", "日帰り入浴"],
    coordinates: [140.936, 40.597],
    season: "通年。周辺の紅葉は秋の楽しみ",
    tip: "日帰り入浴の受付時間・休業日を確認してください。周辺の蔦沼は時期により入場規制があります。",
    officialUrl: "https://tsutaonsen.com/",
    artwork: "forest-bath",
  },
  {
    id: "warasse",
    prefecture: "aomori",
    name: "ねぶたの家 ワ・ラッセ",
    reading: "ねぶたのいえ ワラッセ",
    category: "sightseeing",
    area: "青森・浅虫",
    municipality: "青森市",
    description: "祭りの熱気と、ねぶたの迫力を一年中。",
    story:
      "青森駅近くの、ねぶた祭の魅力を伝える施設。実際に祭りに出陣した大型ねぶたの展示などを通して、光と色彩、職人の技を間近で感じられます。青森の文化に触れる、街歩きの最初の一歩にも。",
    tags: ["文化", "屋内", "駅から歩ける"],
    coordinates: [140.736, 40.831],
    season: "通年。雨の日にもおすすめ",
    tip: "展示替え期間の休館などがあります。開館日や体験イベントの時間は公式サイトで確認を。",
    officialUrl: "https://www.nebuta.jp/warasse/",
    artwork: "nebuta",
  },
  {
    id: "tsurukame",
    prefecture: "aomori",
    name: "鶴亀屋食堂",
    reading: "つるかめやしょくどう",
    category: "food",
    area: "青森・浅虫",
    municipality: "青森市",
    description: "浅虫の海辺で、迫力いっぱいのまぐろ丼。",
    story:
      "浅虫エリアの海沿いにある、まぐろ丼で知られる食堂。たっぷり盛られた魚介と、気取らない雰囲気が魅力です。海岸のドライブや温泉散策と合わせて、青森らしい一食を。",
    tags: ["まぐろ", "海鮮", "ドライブ"],
    coordinates: [140.861, 40.889],
    season: "通年。魚の種類・内容は仕入れによります",
    tip: "丼のサイズや量はお店で確認を。営業状況・メニューの最新情報は現地で確認してください。",
    officialUrl: "https://aomori-tourism.com/",
    artwork: "tuna",
  },
];

export function filterSpots(
  items: Spot[],
  options: {
    category: Category | "all";
    area: string;
    query: string;
    savedOnly?: boolean;
    savedIds?: string[];
  },
) {
  const query = options.query.trim().normalize("NFKC").toLocaleLowerCase("ja");
  return items.filter(
    (spot) =>
      (options.category === "all" || spot.category === options.category) &&
      (!options.area || spot.area === options.area) &&
      (!options.savedOnly || options.savedIds?.includes(spot.id)) &&
      (!query ||
        `${spot.name} ${spot.reading} ${spot.area} ${spot.municipality} ${spot.description} ${spot.tags.join(" ")}`
          .normalize("NFKC")
          .toLocaleLowerCase("ja")
          .includes(query)),
  );
}
