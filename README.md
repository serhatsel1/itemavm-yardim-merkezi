# itemAVM Yardım Merkezi — Frontend Case

Senior Frontend Developer mülakat case'i. Figma'da verilen itemAVM Yardım Merkezi tasarımı, **Next.js 16 App Router** üzerinde birebir implement edildi.

## 🚀 Canlı Demo

- **Vercel:** _deploy sonrası eklenecek_
- **Lokal:** `http://localhost:3000/yardim-merkezi`

## 🛠️ Teknolojiler

| Katman    | Tercih                                   |
| --------- | ---------------------------------------- |
| Framework | **Next.js 16.2** (App Router, Turbopack) |
| Dil       | **TypeScript** (strict)                  |
| Styling   | **Tailwind CSS v4** (@theme inline)      |
| Animasyon | **Framer Motion**                        |
| Yardımcı  | `clsx`                                   |
| Font      | `next/font` — Plus Jakarta Sans          |

> **Not:** Figma'da Gilroy kullanılmış. Gilroy lisanslı bir font olduğu için açık alternatifi olan **Plus Jakarta Sans** tercih edildi. Tipografi ölçüleri ve ağırlıkları birebir uygulandı.

## 📂 Proje Yapısı

```
app/
  layout.tsx                 # Root layout, fontlar, metadata
  page.tsx                   # /  →  /yardim-merkezi (redirect)
  yardim-merkezi/page.tsx    # Server component — JSON import
components/
  help-center/
    HelpCenter.tsx           # Client root: hash + search + view switching
    Header.tsx
    Sidebar.tsx              # Arama + accordion kategori listesi
    SidebarCategory.tsx      # Tek kategori accordion
    HomeView.tsx             # Hero + CTA + makale grid
    ArticleDetailView.tsx    # Detay içerik + feedback
    ArticleCard.tsx
    StatPill.tsx
    LiveSupportButton.tsx
    BackButton.tsx
    FeedbackBox.tsx          # Local-state Evet/Hayır
    MobileCategoryDrawer.tsx # Mobil drawer (Figma'daki "Kategoriler Modal")
  icons/index.tsx            # Inline SVG ikonlar + kategori görselleri
lib/
  hooks/
    useHashRoute.ts          # hash sync + history API
    useArticleSearch.ts      # Türkçe-uyumlu normalize'lı filtre
  types.ts
data/
  helpCenter.json            # 4 kategori · 10 makale
```

## 🧠 Mimari Kararlar

### 1. Hash-Based Routing

Case gereği detay sayfaları **hash (`#slug`)** ile yönetiliyor. `useHashRoute` hook'u:

- `window.location.hash`'i okuyup state'e senkronize eder
- Detay açarken `history.pushState` ile URL'yi günceller → tarayıcı geri/ileri doğru çalışır
- `hashchange` eventini dinler → manuel URL değişimlerine hemen tepki verir
- SSR-safe: ilk render'da `null`, mount sonrası hydrate
- **Deep linking:** `/yardim-merkezi#stoklu-ilan-nasil-eklenir` ile doğrudan açılabilir

### 2. Arama

`useArticleSearch` hook'u **Türkçe-uyumlu normalize** (büyük/küçük harf + diakritik) ile hem başlık hem özet üzerinden filtreler. Filtrelenen veri **hem sidebar hem grid için aynı** — tek kaynak. Arama aktifken tüm filtrelenmiş kategoriler otomatik expand olur.

### 3. Sidebar Senkronizasyonu

- Kategoriler **accordion** (birden fazla aynı anda açık olabilir)
- Detay görünümündeyken aktif makalenin kategorisi otomatik açılır ve makale highlight'lanır
- Aktif state: `bg-active text-text`, diğerleri `text-text-muted`

### 4. View Switching

`AnimatePresence` ile Home ↔ Detay geçişleri fade + slide.

### 5. Feedback Local State

- Her makale için bağımsız (`key={articleSlug}` ile reset)
- Aynı butona tekrar tıklama seçimi geri alır
- Görsel olarak Figma'daki yeşil/kırmızı tint tasarımı birebir

### 6. Responsive

- **Desktop (≥ lg):** iki kolon — sol sidebar (400px) + içerik
- **Tablet/Mobil:** sidebar drawer'a döner (Figma'daki "Kategoriler Modal" ile uyumlu), grid tek/iki kolona iner
- Hero metinleri `clamp()` ile akıcı ölçeklenir

### 7. Design Token'lar

Tüm renkler `app/globals.css` içinde `@theme inline` blok altında tanımlı. Figma'daki pixel-perfect değerler:

```css
--color-bg:           #121212
--color-panel:        #1e1e1f
--color-card:         #232323
--color-card-alt:     #262627
--color-border-soft:  #2d2d2f
--color-active:       #393939
--color-text:         #ffffff
--color-text-muted:   #c2c2c2
--color-primary:      #0162ff
--color-success:      #00d02a
--color-danger:       #ff0000
```

## ✅ Case Gereksinimleri

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
- [x] Responsive (Figma mobil varyantına uygun)
- [x] Framer Motion geçişleri
- [x] Feedback local state

## ▶️ Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda: [http://localhost:3000](http://localhost:3000) (otomatik olarak `/yardim-merkezi`'ye yönlenir.)

## 📦 Build

```bash
npm run build
npm start
```

## 🚀 Vercel Deploy

```bash
npx vercel
```

## 📝 Notlar

- **Figma assetleri:** Raster kategori görselleri ve hero illustration lisans/erişim nedeniyle **inline SVG** olarak yeniden üretildi. Tasarımdaki gradient dili ve oran/yerleşim korundu.
- **Performans:** Sayfa statik olarak prerender ediliyor; client JS sadece etkileşimli bölümler için yüklenir.
- **Erişilebilirlik:** Semantic HTML, `aria-*` etiketleri ve focus-visible ring kullanıldı.
