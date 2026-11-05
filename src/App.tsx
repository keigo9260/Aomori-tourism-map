import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Coffee,
  Compass,
  ExternalLink,
  Heart,
  Info,
  Leaf,
  List,
  Map as MapIcon,
  MapPin,
  Mountain,
  Search,
  SlidersHorizontal,
  Sparkles,
  Utensils,
  Waves,
  X,
} from "lucide-react";
import type { Category, Spot } from "./data/spots";
import {
  areas,
  categories,
  categoryLabel,
  filterSpots,
  spots,
} from "./data/spots";
import { HeroArt, SpotArt } from "./Art";
import AreaMap from "./AreaMap";
import Modal from "./Modal";

const SAVE_KEY = "yorimichi.saved.v1";
const prefectures = [
  {
    region: "北海道・東北",
    names: [
      "北海道",
      "青森県",
      "岩手県",
      "宮城県",
      "秋田県",
      "山形県",
      "福島県",
    ],
  },
  {
    region: "関東",
    names: [
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
    ],
  },
  {
    region: "中部",
    names: [
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
    ],
  },
  {
    region: "近畿",
    names: [
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
    ],
  },
  {
    region: "中国・四国",
    names: [
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
    ],
  },
  {
    region: "九州・沖縄",
    names: [
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
    ],
  },
];
function readSaved(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter(
          (id): id is string =>
            typeof id === "string" && spots.some((spot) => spot.id === id),
        )
      : [];
  } catch {
    return [];
  }
}
function CategoryIcon({
  category,
  size = 18,
}: {
  category: Category | "all";
  size?: number;
}) {
  if (category === "sightseeing") return <Mountain size={size} />;
  if (category === "food") return <Utensils size={size} />;
  if (category === "onsen") return <Waves size={size} />;
  return <Compass size={size} />;
}

export default function App() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [area, setArea] = useState("");
  const [query, setQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>(readSaved);
  const [savedOnly, setSavedOnly] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [selectedId, setSelectedId] = useState("oirase");
  const [detail, setDetail] = useState<Spot | null>(null);
  const [dialog, setDialog] = useState<"prefecture" | "about" | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [notice, setNotice] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const filtered = filterSpots(spots, {
    category,
    area,
    query,
    savedOnly,
    savedIds,
  });
  if (sort === "name")
    filtered.sort((a, b) => a.reading.localeCompare(b.reading, "ja"));
  const selected =
    filtered.find((spot) => spot.id === selectedId) ?? filtered[0];
  const hasFilters = category !== "all" || !!area || !!query;
  const closeDetail = useCallback(() => setDetail(null), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  useEffect(
    () => () => {
      clearTimeout(noticeTimer.current);
    },
    [],
  );
  useEffect(() => {
    const listener = (event: StorageEvent) => {
      if (event.key === SAVE_KEY) setSavedIds(readSaved());
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);
  function toggleSaved(spot: Spot) {
    const saved = savedIds.includes(spot.id);
    const next = saved
      ? savedIds.filter((id) => id !== spot.id)
      : [...savedIds, spot.id];
    setSavedIds(next);
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(next));
      setNotice(
        saved
          ? "保存したスポットから削除しました"
          : "行きたい場所に保存しました",
      );
    } catch {
      setNotice(
        "この画面では保存済みです。ブラウザの保存領域を使えないため、再読込すると消えます。",
      );
    }
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 3500);
  }
  function resetFilters() {
    setCategory("all");
    setArea("");
    setQuery("");
  }
  function changePage(saved: boolean) {
    setSavedOnly(saved);
    resetFilters();
    setMobileView("list");
    if (saved)
      document
        .getElementById("discover")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function openSpot(spot: Spot) {
    setSelectedId(spot.id);
    setDetail(spot);
  }

  return (
    <>
      <a className="skip-link" href="#discover">
        スポット一覧へスキップ
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="brand"
            type="button"
            onClick={() => {
              changePage(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="よりみち青森 ホーム"
          >
            <span className="brand-symbol">
              <MapPin size={24} strokeWidth={1.8} />
              <span />
            </span>
            <span className="brand-name">
              よりみち<span>AOMORI TRAVEL GUIDE</span>
            </span>
          </button>
          <nav aria-label="メインナビゲーション">
            <button
              type="button"
              className={!savedOnly ? "nav-link active" : "nav-link"}
              onClick={() => changePage(false)}
            >
              <Compass size={16} />
              <span>見つける</span>
            </button>
            <button
              type="button"
              className={savedOnly ? "nav-link active" : "nav-link"}
              onClick={() => changePage(true)}
            >
              <Bookmark size={16} />
              <span>保存したスポット</span>
              {savedIds.length > 0 && (
                <span className="saved-count">{savedIds.length}</span>
              )}
            </button>
            <button
              type="button"
              className="nav-link about-link"
              onClick={() => setDialog("about")}
            >
              このガイドについて
              <ArrowUpRight size={14} />
            </button>
          </nav>
          <button
            type="button"
            className="prefecture-button"
            onClick={() => setDialog("prefecture")}
          >
            <MapPin size={15} />
            <span>青森県</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="青森の旅の紹介">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span /> こころ、みちる。青森の旅。
            </div>
            <h1>
              知らなかった青森に、
              <br />
              会いにいこう<span className="heading-dot">。</span>
            </h1>
            <p>
              息をのむ景色も、忘れられない一皿も、ほっとする湯も。
              <br className="desktop-break" />
              あなたの「行ってみたい」が、きっと見つかる。
            </p>
            <button
              type="button"
              className="hero-button"
              onClick={() => {
                changePage(false);
                document
                  .getElementById("discover")
                  ?.scrollIntoView({ behavior: "smooth" });
                searchRef.current?.focus({ preventScroll: true });
              }}
            >
              青森を探しにいく
              <ArrowDown size={17} />
            </button>
            <div className="hero-footnote">
              <span className="mini-line" /> 北緯40°、ちょっといい寄り道。
            </div>
          </div>
          <div className="hero-visual">
            <HeroArt />
            <div className="hero-location">
              <MapPin size={13} />
              <span>AOMORI, JAPAN</span>
            </div>
            <div className="hero-stamp">
              <span>EXPLORE</span>
              <Leaf size={23} strokeWidth={1.3} />
              <span>YOUR OWN WAY</span>
            </div>
          </div>
          <span className="hero-index">01 — AOMORI</span>
        </section>

        <section id="discover" className="discovery">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="section-number">01</span>
                {savedOnly ? "YOUR TRAVEL WISHLIST" : "FIND YOUR NEXT DETOUR"}
              </div>
              <h2>
                {savedOnly
                  ? "行きたい場所を、集めよう。"
                  : "今日の気分で、よりみち。"}
              </h2>
              <p>
                {savedOnly
                  ? "気になった場所を保存して、次の旅のヒントに。"
                  : "青森のとっておきを、あなたらしく楽しもう。"}
              </p>
            </div>
            <div className="spot-total">
              <span>
                {savedOnly ? String(savedIds.length).padStart(2, "0") : "12"}
              </span>
              <div>
                つの{savedOnly ? "行きたい" : "よりみち"}
                <br />が{savedOnly ? "保存済み" : "待っています"}
              </div>
              <Sparkles size={18} strokeWidth={1.3} />
            </div>
          </div>

          <div className="search-bar">
            <label className="search-field">
              <Search size={20} />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="スポット名・キーワードで探す"
                aria-label="スポット名・キーワードで探す"
              />
              {query && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setQuery("")}
                  aria-label="検索をクリア"
                >
                  <X size={16} />
                </button>
              )}
            </label>
            <div className="search-separator" />
            <label className="area-field">
              <MapPin size={17} />
              <select
                aria-label="エリアで絞り込む"
                value={area}
                onChange={(event) => setArea(event.target.value)}
              >
                <option value="">すべてのエリア</option>
                {areas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>
            <span className="search-hint">
              <SlidersHorizontal size={16} /> お気に入りの場所を見つけよう
            </span>
          </div>

          <div className="category-row">
            <div className="category-tabs" aria-label="スポットのカテゴリ">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`category-tab ${category === item.id ? "active" : ""}`}
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  <CategoryIcon category={item.id} />
                  {item.label}
                  <span>
                    {
                      filterSpots(spots, {
                        category: item.id,
                        query,
                        area,
                        savedOnly,
                        savedIds,
                      }).length
                    }
                  </span>
                </button>
              ))}
            </div>
            <div className="mobile-view-switch" aria-label="表示方法">
              <button
                type="button"
                aria-label="リストを表示"
                aria-pressed={mobileView === "list"}
                className={mobileView === "list" ? "active" : ""}
                onClick={() => setMobileView("list")}
              >
                <List size={17} />
              </button>
              <button
                type="button"
                aria-label="地図を表示"
                aria-pressed={mobileView === "map"}
                className={mobileView === "map" ? "active" : ""}
                onClick={() => setMobileView("map")}
              >
                <MapIcon size={17} />
              </button>
            </div>
            <span className="curated-note">
              <Check size={14} /> 青森の定番をセレクト
            </span>
          </div>

          <div className={`explore-layout mobile-${mobileView}`}>
            <div className="results-panel">
              <div className="results-toolbar">
                <p aria-live="polite">
                  <strong>{filtered.length}</strong> 件のスポット
                  {hasFilters && (
                    <button
                      className="reset-filters"
                      type="button"
                      onClick={resetFilters}
                    >
                      <X size={12} />
                      条件をクリア
                    </button>
                  )}
                </p>
                <label className="sort-control">
                  並び順：
                  <select
                    aria-label="並び順"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="recommended">おすすめ順</option>
                    <option value="name">名前順</option>
                  </select>
                  <ChevronDown size={12} />
                </label>
              </div>
              {filtered.length ? (
                <div className="spot-grid">
                  {filtered.map((spot, index) => (
                    <article
                      className="spot-card"
                      key={spot.id}
                      style={{ animationDelay: `${Math.min(index, 5) * 45}ms` }}
                    >
                      <div className="card-visual">
                        <button
                          type="button"
                          className="card-image-button"
                          onClick={() => openSpot(spot)}
                          aria-label={`${spot.name}の詳細を見る`}
                        >
                          <SpotArt type={spot.artwork} />
                        </button>
                        <span className={`category-badge ${spot.category}`}>
                          <CategoryIcon category={spot.category} size={12} />
                          {categoryLabel(spot.category)}
                        </span>
                        <button
                          type="button"
                          className={`save-button ${savedIds.includes(spot.id) ? "is-saved" : ""}`}
                          aria-label={`${spot.name}を${savedIds.includes(spot.id) ? "保存から削除" : "保存"}`}
                          aria-pressed={savedIds.includes(spot.id)}
                          onClick={() => toggleSaved(spot)}
                        >
                          <Heart
                            size={18}
                            fill={
                              savedIds.includes(spot.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                        <span className="illustration-label">ILLUSTRATION</span>
                      </div>
                      <div className="card-copy">
                        <div className="card-area">
                          <MapPin size={12} />
                          {spot.area}
                          <span className="card-area-city">
                            · {spot.municipality}
                          </span>
                        </div>
                        <h3>
                          <button type="button" onClick={() => openSpot(spot)}>
                            {spot.name}
                            <ArrowUpRight size={18} />
                          </button>
                        </h3>
                        <p>{spot.description}</p>
                        <div className="card-tags">
                          {spot.tags.slice(0, 2).map((tag) => (
                            <button
                              type="button"
                              key={tag}
                              onClick={() => setQuery(tag)}
                            >
                              # {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span>
                    {savedOnly && !hasFilters ? (
                      <Heart size={31} strokeWidth={1.2} />
                    ) : (
                      <Search size={31} strokeWidth={1.2} />
                    )}
                  </span>
                  <h3>
                    {savedOnly && !hasFilters
                      ? "気になる場所を、ここに。"
                      : "スポットが見つかりませんでした"}
                  </h3>
                  <p>
                    {savedOnly && !hasFilters
                      ? "スポットのハートを押すと保存できます。\nあなたの旅のリストを作ってみましょう。"
                      : "キーワードやエリアを変えて、\nもう一度探してみてください。"}
                  </p>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      resetFilters();
                      if (savedOnly) setSavedOnly(false);
                    }}
                  >
                    {savedOnly ? "スポットを見つける" : "条件をクリアする"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
              {filtered.length > 0 && (
                <div className="results-end">
                  <span />
                  <Leaf size={15} />
                  <p>思いがけない出会いも、旅の楽しみ。</p>
                  <span />
                </div>
              )}
            </div>
            <div className="map-column">
              <AreaMap
                spots={filtered}
                selected={selected}
                onSelect={(spot) => setSelectedId(spot.id)}
                onOpen={openSpot}
              />
              <div className="little-note">
                <Coffee size={21} strokeWidth={1.3} />
                <p>
                  予定を詰めすぎず、気の向くままに。
                  <br />
                  <strong>よりみちから、旅はおもしろくなる。</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-banner">
          <div className="banner-symbol">
            <Compass size={38} strokeWidth={1} />
          </div>
          <div>
            <span className="eyebrow">THE JOURNEY CONTINUES</span>
            <h2>次は、どのまちへ行こう？</h2>
            <p>
              ひとつの県から、まだ知らない日本へ。旅のガイドを少しずつ広げていきます。
            </p>
          </div>
          <button type="button" onClick={() => setDialog("prefecture")}>
            旅先を見てみる
            <ArrowUpRight size={17} />
          </button>
          <span className="banner-deco">旅</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <span className="footer-brand">
            <MapPin size={20} />
            よりみち <small>AOMORI</small>
          </span>
          <p>いつもの道から、ちょっと先へ。</p>
          <button type="button" onClick={() => setDialog("about")}>
            このガイドについて
            <ArrowUpRight size={13} />
          </button>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} YORIMICHI AOMORI</span>
          <span>
            掲載画像はイメージイラストです。訪問前に最新の公式情報をご確認ください。
          </span>
          <span>MADE FOR YOUR NEXT JOURNEY</span>
        </div>
      </footer>

      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}

      {detail && (
        <Modal
          title={detail.name}
          onClose={closeDetail}
          className="detail-modal"
        >
          <div className="detail-art">
            <SpotArt type={detail.artwork} />
            <span className="detail-image-note">イメージイラスト</span>
          </div>
          <div className="detail-content">
            <div className="detail-topline">
              <span className={`category-badge ${detail.category}`}>
                <CategoryIcon category={detail.category} size={13} />
                {categoryLabel(detail.category)}
              </span>
              <span>
                <MapPin size={13} />
                {detail.area} · {detail.municipality}
              </span>
            </div>
            <p className="detail-reading">{detail.reading}</p>
            <h2>{detail.name}</h2>
            <p className="detail-lead">{detail.description}</p>
            <p className="detail-story">{detail.story}</p>
            <div className="detail-tags">
              {detail.tags.map((tag) => (
                <span key={tag}># {tag}</span>
              ))}
            </div>
            <div className="visit-info">
              <div>
                <Leaf size={17} />
                <div>
                  <h3>旅のおすすめ</h3>
                  <p>{detail.season}</p>
                </div>
              </div>
              <div>
                <Info size={17} />
                <div>
                  <h3>訪れる前に</h3>
                  <p>{detail.tip}</p>
                </div>
              </div>
            </div>
            <div className="detail-actions">
              <a
                className="primary-button"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`青森県 ${detail.name}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={17} />
                Google マップで見る
                <ExternalLink size={14} />
              </a>
              <button
                type="button"
                className={`secondary-button ${savedIds.includes(detail.id) ? "saved" : ""}`}
                onClick={() => toggleSaved(detail)}
                aria-pressed={savedIds.includes(detail.id)}
              >
                <Heart
                  size={17}
                  fill={savedIds.includes(detail.id) ? "currentColor" : "none"}
                />
                {savedIds.includes(detail.id) ? "保存済み" : "行きたい"}
              </button>
            </div>
            <a
              className="official-link"
              href={detail.officialUrl}
              target="_blank"
              rel="noreferrer"
            >
              公式・観光案内サイトで詳しく見る
              <ArrowUpRight size={14} />
            </a>
            <p className="detail-disclaimer">
              掲載内容は旅先を探すための紹介です。営業日・料金・交通状況は、訪問前に公式の最新情報をご確認ください。
            </p>
          </div>
        </Modal>
      )}

      {dialog === "prefecture" && (
        <Modal
          title="旅先を選ぶ"
          onClose={closeDialog}
          className="prefecture-modal"
        >
          <div className="dialog-heading">
            <span className="eyebrow">CHOOSE YOUR DESTINATION</span>
            <h2>次のよりみちは、どこへ？</h2>
            <p>
              まずは青森県から。ほかの都道府県は、これから順次追加していきます。
            </p>
          </div>
          {prefectures.map((group) => (
            <div className="prefecture-group" key={group.region}>
              <h3>{group.region}</h3>
              <div>
                {group.names.map((name) => (
                  <button
                    type="button"
                    key={name}
                    className={name === "青森県" ? "available" : ""}
                    disabled={name !== "青森県"}
                    onClick={() => {
                      closeDialog();
                      changePage(false);
                    }}
                  >
                    {name}
                    {name === "青森県" && <Check size={13} />}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="coming-soon">
            <span className="status-dot" />
            青森県：公開中 <span>その他の都道府県：準備中</span>
          </p>
        </Modal>
      )}
      {dialog === "about" && (
        <Modal
          title="このガイドについて"
          onClose={closeDialog}
          className="about-modal"
        >
          <div className="about-icon">
            <Compass size={34} strokeWidth={1.3} />
          </div>
          <span className="eyebrow">ABOUT YORIMICHI</span>
          <h2>旅に、ちいさな余白を。</h2>
          <p>
            「よりみち」は、日本各地の景色とおいしいもの、温かな湯に出会うための旅のガイドです。まずは青森の定番12スポットから、あなたの行ってみたい場所を見つけてください。
          </p>
          <div className="about-features">
            <span>
              <Mountain size={21} />
              景色に出会う
            </span>
            <span>
              <Utensils size={21} />
              土地を味わう
            </span>
            <span>
              <Waves size={21} />
              湯にほどける
            </span>
          </div>
          <p>
            ハートで保存したスポットは、お使いのブラウザに保存されます。アカウント登録は必要ありません。
          </p>
          <p className="about-small">
            画像はスポットをイメージしたオリジナルイラストです。地図はエリアを把握するための概略図で、位置は目安です。県境データは「地球地図日本」を出典とする
            dataofjapan/land を簡略化して使用しています。
          </p>
          <a
            className="official-link"
            href="https://github.com/dataofjapan/land"
            target="_blank"
            rel="noreferrer"
          >
            地図データの出典
            <ExternalLink size={13} />
          </a>
        </Modal>
      )}
    </>
  );
}
