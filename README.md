# itemAVM Yardım Merkezi — Frontend Case

Senior Frontend Developer mülakat case'i. Figma'da verilen itemAVM Yardım Merkezi tasarımı, **Next.js 16 App Router** üzerinde pixel-perfect implement edildi.

## Canlı Demo

- **Vercel:** https://yardim-merkezi.vercel.app
- **Lokal:** `http://localhost:3000/yardim-merkezi`

## Teknolojiler

| Katman    | Tercih                                   |
| --------- | ---------------------------------------- |
| Framework | **Next.js 16.2** (App Router, Turbopack) |
| Dil       | **TypeScript** (strict)                  |
| Styling   | **Tailwind CSS v4** (@theme inline)      |
| Animasyon | **Framer Motion**                        |
| Yardımcı  | `clsx`                                   |
| Font      | `next/font` — Plus Jakarta Sans          |

> **Not:** Figma'da Gilroy kullanılmış. Gilroy lisanslı bir font olduğu için açık alternatifi olan **Plus Jakarta Sans** tercih edildi. Tipografi ölçüleri ve ağırlıkları birebir uygulandı.

## Proje Yapısı

```
app/
  layout.tsx                 # Root layout, fontlar, metadata
  page.tsx                   # /  →  /yardim-merkezi (redirect)
  globals.css                # Tailwind v4 tema + global stiller
  yardim-merkezi/page.tsx    # Server component — JSON import
components/
  help-center/
    HelpCenter.tsx           # Client root: hash routing + search + view switching
    Header.tsx               # Desktop header bar
    Sidebar.tsx              # Arama + accordion kategori listesi
    SidebarCategory.tsx      # Tek kategori accordion
    HomeView.tsx             # Hero + CTA + makale grid
    ArticleDetailView.tsx    # Detay içerik + feedback
    ArticleCard.tsx          # Makale kartı
    StatPill.tsx             # Görüntülenme/beğeni pill'leri
    LiveSupportButton.tsx    # Canlı destek CTA butonu
    BackButton.tsx           # Geri dön butonu
    FeedbackBox.tsx          # "Faydalı buldunuz mu?" — local state
    EmptySearchState.tsx     # Sonuç yok + popüler öneriler
    Skeleton.tsx             # Loading skeleton bileşenleri
    MobileCategoryDrawer.tsx # Mobil bottom sheet modal
  icons/index.tsx            # SVG UI ikonlar + PNG kategori görselleri
lib/
  hooks/
    useHashRoute.ts          # Hash sync + History API
    useArticleSearch.ts      # Türkçe-uyumlu normalize'lı filtre
    useDebouncedValue.ts     # Generic debounce hook (300ms)
  types.ts                   # TypeScript tip tanımları
data/
  helpCenter.json            # 4 kategori · 10 makale
public/
  icons/                     # Figma'dan export edilen PNG assetler
```

## Mimari Kararlar

### 1. Hash-Based Routing

Case gereği detay sayfaları **hash (`#slug`)** ile yönetiliyor. `useHashRoute` hook'u:

- `window.location.hash`'i okuyup state'e senkronize eder
- `history.pushState` ile URL günceller — tarayıcı geri/ileri doğru çalışır
- `hashchange` eventini dinler — manuel URL değişimlerine tepki verir
- SSR-safe: ilk render'da `null`, mount sonrası hydrate
- **Deep linking:** `/yardim-merkezi#stoklu-ilan-nasil-eklenir` doğrudan açılır
- Makale açıkken `document.title` dinamik güncellenir

### 2. Arama (Debounced)

`useArticleSearch` hook'u **Türkçe-uyumlu normalize** (büyük/küçük harf + diakritik) ile hem başlık hem özet üzerinden filtreler. `useDebouncedValue` (300ms) ile gereksiz re-render'lar önlenir. Debounce sırasında **skeleton loading** gösterilir. Filtrelenen veri hem sidebar hem grid için tek kaynak.

### 3. Sidebar Senkronizasyonu

- Kategoriler accordion — birden fazla aynı anda açık olabilir
- Detay görünümünde aktif makalenin kategorisi otomatik açılır ve makale highlight'lanır
- Arama yapılırken tüm eşleşen kategoriler expand olur
- Arama temizlendiğinde yalnızca aktif makalenin kategorisi açık kalır

### 4. View Switching + Animasyonlar

`AnimatePresence mode="wait"` ile Home ↔ Detay geçişleri fade + slide. Sidebar accordion'ları `framer-motion` ile animate edilir. Bottom sheet modal spring animasyonla açılır.

### 5. Feedback Local State

- Her makale için bağımsız (parent `key` ile component remount/reset)
- Aynı butona tekrar tıklama seçimi geri alır (toggle)
- Figma'daki yeşil/kırmızı tint tasarımı birebir
- Not: Geri bildirimler local state'te tutulur, sayfa yenilendiğinde sıfırlanır

### 6. Responsive (Figma Birebir)

- **Desktop (≥ 1024px):** Full-width panel — sidebar (400px) + divider + içerik
- **Mobil (< 1024px):** `#121212` arka plan + `#1E1E1F` inset panel + bottom sheet kategori modal
- Tüm spacing, typography ve renk değerleri Figma'dan pixel-perfect alındı

### 7. Empty Search State

Arama sonucu boşken: illustration + mesaj + en çok görüntülenen 3 makale önerisi. Kullanıcıyı çıkmaz sokakta bırakmaz.

## Case Gereksinimleri

- [x] Next.js 16+ App Router
- [x] Ana sayfa + makale detay görünümü
- [x] Sol accordion sidebar (kategori + makale listesi)
- [x] Hero alanı + Canlı Destek butonu (görsel)
- [x] Makale kart grid (başlık, özet, kategori ikonu, view/like/dislike)
- [x] Arama çubuğu — sidebar ve grid senkron filtrelenir
- [x] Hash-based URL routing + deep linking + tarayıcı geri/ileri
- [x] Sidebar aktif makale highlight
- [x] Geri Dön butonu
- [x] "Bu İçeriği Faydalı Buldunuz mu?" feedback — local state
- [x] JSON veri (4 kategori / 10 makale)

### Bonus

- [x] TypeScript (strict)
- [x] Responsive (Figma mobil varyantına pixel-perfect)
- [x] Framer Motion geçişleri (sidebar, sayfa, modal)
- [x] Loading / skeleton state (debounce sırasında)
- [x] Feedback local state (toggle + reset)

## Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda: [http://localhost:3000](http://localhost:3000) (otomatik olarak `/yardim-merkezi`'ye yönlenir.)

## Scripts

```bash
npm run dev        # Geliştirme sunucusu
npm run build      # Üretim build
npm start          # Üretim sunucusu
npm run lint       # ESLint
npm run typecheck  # TypeScript kontrol
```

## Notlar

- **Figma assetleri:** Kategori ikonları ve hero illustration Figma'dan PNG olarak export edildi. UI ikonlar (search, chevron, like vb.) inline SVG olarak birebir Figma stroke değerleriyle çizildi.
- **Performans:** Sayfa statik olarak prerender ediliyor; client JS sadece etkileşimli bölümler için yüklenir.
- **Erişilebilirlik:** Semantic HTML, `aria-expanded`, `aria-pressed`, `aria-label` ve `focus-visible` ring kullanıldı.
- **Feedback:** Local state ile çalışır, persistence (localStorage) eklenmemiştir — case scope'unda bilinçli bir karar.
