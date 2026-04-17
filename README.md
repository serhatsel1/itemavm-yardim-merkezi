# itemAVM Yardim Merkezi

**Vercel:** https://yardim-merkezi.vercel.app

## Kurulum

```bash
npm install
npm run dev
```

Tarayicida [http://localhost:3000](http://localhost:3000) adresine gidin. Otomatik olarak `/yardim-merkezi` sayfasina yonlendirilirsiniz.

```bash
npm run build      # Uretim build
npm run lint       # ESLint kontrolu
npm run typecheck  # TypeScript kontrolu
```

## Kullanilan Teknolojiler

| Katman    | Tercih                                   | Neden                                                    |
| --------- | ---------------------------------------- | -------------------------------------------------------- |
| Framework | Next.js 16.2 (App Router)                | Case gereksinimi. Turbopack ile hizli gelistirme.        |
| Dil       | TypeScript (strict)                      | Tip guvenligi, refactor kolayligi, hata onleme.          |
| Styling   | Tailwind CSS v4                          | Utility-first, tema token'lari `@theme inline` ile.     |
| Animasyon | Framer Motion                            | Accordion, sayfa gecisleri, bottom sheet animasyonlari.  |
| Font      | Plus Jakarta Sans (`next/font`)          | Figma'daki Gilroy lisansli; en yakin acik alternatif.    |

## Mimari Kararlar

### Hash-Based Routing

Case gereksinimine gore makale detaylari `#slug` ile yonetiliyor. `useSyncExternalStore` ile hash state'i React'a senkronize ediliyor. `history.pushState` ile URL guncelleniyor, `hashchange` event'i ile tarayici geri/ileri butonlari destekleniyor. Gecersiz hash girildiginde otomatik olarak ana sayfaya donuluyor.

### Arama

`useArticleSearch` hook'u Turkce'ye ozel normalizasyon yapiyor (`toLocaleLowerCase("tr-TR")` + diacritic strip). Hem baslik hem ozet uzerinde arar. `useDebouncedValue` (300ms) ile her tus basilisinda filtreleme tetiklenmez; debounce sirasinda skeleton gosterilir.

### Sidebar Senkronizasyonu

Accordion state yonetimi `useExpandedCategories` hook'unda. Arama yapilirken eslesen kategoriler otomatik acilir. Arama temizlendiginde yalnizca aktif makalenin kategorisi acik kalir. Kullanicinin manuel toggle'lari korunur.

### Responsive Tasarim

Uc breakpoint: mobil (< 768px), tablet (768-1024px), desktop (> 1024px). Mobilde Figma'daki tasarim birebir uygulanmistir: `#121212` arka plan uzerinde `#1E1E1F` panel, alttan acilan bottom sheet kategori modali, scroll-reveal header. Desktop'ta merkezi panel (1494px) ile Figma tasarimina sadik kalinmistir.

### Bileşen Mimarisi

Her bilesen tek sorumluluga sahiptir. Is mantigi custom hook'lara (`useHashRoute`, `useArticleSearch`, `useDebouncedValue`, `useExpandedCategories`, `useScrollReveal`) ayrilmistir. Tekrarlanan pattern'lar bilesenlestirilmistir (`SearchInput`, `ContentBlock`, `FeedbackButton`). Tum renkler CSS token'lari uzerinden yonetilir, hardcoded deger yoktur.

### Skeleton Loading

Arama sirasinda debounce beklerken kart ve sidebar skeleton'lari gosterilir. Skeleton boyutlari gercek bilesenlerin boyutlariyla eslesmektedir.

### Empty Search State

Arama sonucu bosken kullanici cikmazda birakilmaz. En cok goruntulenen 3 makale onerisi sunulur.

### Feedback

"Bu Icerigi Faydali Buldunuz mu?" alani local state ile calisir. Her makale icin bagimsiz state tutulur, ayni butona tekrar tiklamak secimi geri alir. Persistence (localStorage) case scope'u disinda birakilmistir.

## Proje Yapisi

```
app/
  layout.tsx                 # Root layout, font, metadata, viewport
  page.tsx                   # / → /yardim-merkezi redirect
  globals.css                # Tailwind v4 tema token'lari + global stiller
  not-found.tsx              # 404 sayfasi
  yardim-merkezi/page.tsx    # Server component, JSON import

components/
  help-center/
    HelpCenter.tsx           # Client root: routing, search, view switching
    Header.tsx               # Desktop header
    Sidebar.tsx              # Search + accordion kategori listesi
    SidebarCategory.tsx      # Tek kategori accordion
    SearchInput.tsx           # Paylasilmis arama input'u (mobil + desktop)
    HomeView.tsx             # Hero + CTA + makale grid
    ArticleDetailView.tsx    # Makale icerik + feedback
    ArticleCard.tsx          # Makale karti
    ContentBlock.tsx         # Makale icerik blogu renderer (heading/paragraph/image)
    StatPill.tsx             # Goruntuleme/begeni pill'leri
    LiveSupportButton.tsx    # Canli destek butonu (gorsel)
    BackButton.tsx           # Geri don butonu
    FeedbackBox.tsx          # Evet/Hayir geri bildirim
    EmptySearchState.tsx     # Sonuc yok + populer oneriler
    Skeleton.tsx             # Loading skeleton bilesenleri
    MobileCategoryDrawer.tsx # Bottom sheet kategori modali
  icons/index.tsx            # SVG UI ikonlar + PNG kategori gorselleri

lib/
  hooks/
    useHashRoute.ts          # useSyncExternalStore ile hash yonetimi
    useArticleSearch.ts      # Turkce normalizasyonlu arama
    useDebouncedValue.ts     # Generic debounce hook
    useExpandedCategories.ts # Accordion state yonetimi (useReducer)
    useScrollReveal.ts       # Mobil scroll-reveal header
  types.ts                   # TypeScript tip tanimlari

data/
  helpCenter.json            # 4 kategori, 10 makale
```

## Notlar

- Figma'daki raster assetler (kategori ikonlari, hero, destek ikonu) PNG olarak export edilip `next/image` ile optimize edilmistir. UI ikonlar (search, chevron, like, dislike, eye) Figma'daki stroke degerleriyle birebir SVG olarak cizilmistir.
- Sayfa statik olarak prerender edilmektedir (SSG). Client JS yalnizca etkilesimli bilesenler icin yuklenir.
- Erisebilirlik: `aria-expanded`, `aria-pressed`, `aria-label`, `focus-visible` ring, semantic HTML kullanilmistir.
- Tum tasarim token'lari (`globals.css` icinde `@theme inline`) Figma'daki renk paletinin birebir karsiliklaridir.
