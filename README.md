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

### Katmanli Bilesen Mimarisi

Proje dort katmana ayrilmistir:

- **Orchestrator** (`HelpCenter.tsx`): Tum state yonetimi (routing, search, accordion, drawer) tek dosyada toplanir. Hicbir layout markup'i iceremez — yalnizca hook'lari calistirir ve props'lari layout'lara iletir.
- **Layouts** (`layouts/`): `DesktopLayout` ve `MobileLayout` birbirinden tamamen bagimsiz shell bilesenlerdir. Her biri kendi gorunurluk sinifini (`md:hidden` / `hidden md:flex`) yonetir ve `children` slot'u ile icerik alir. Mobil layout'a ozgu scroll-reveal davranisi `MobileHeader` bilesenine ayrilmistir.
- **Views** (`views/`): `HomeView` ve `ArticleDetailView` tam sayfa gorunumleridir. `ContentRouter`, `AnimatePresence` ile aralarindaki gecisi yonetir.
- **Features** (`features/`): `SearchInput`, `Sidebar`, `SidebarCategory`, `FeedbackBox`, `MobileCategoryDrawer` gibi etkilesinimli ozellik bilesenleri.
- **UI** (`ui/`): `Header`, `ArticleCard`, `ContentBlock`, `StatPill`, `Skeleton` gibi sunum katmani bilesenleri. Is mantigi icermezler.

Bu yaklasim sayesinde mobil layout'u degistirmek icin desktop koduna dokunmaniza gerek kalmaz; yeni bir view eklemek icin orchestrator'u degistirmeniz yeterlidir.

### Hash-Based Routing

Case gereksinimine gore makale detaylari `#slug` ile yonetiliyor. `useSyncExternalStore` ile hash state'i React'a senkronize ediliyor. `history.pushState` ile URL guncelleniyor, `hashchange` event'i ile tarayici geri/ileri butonlari destekleniyor. Gecersiz hash girildiginde otomatik olarak ana sayfaya donuluyor.

### Arama

`useArticleSearch` hook'u Turkce'ye ozel normalizasyon yapiyor (`toLocaleLowerCase("tr-TR")` + diacritic strip). Hem baslik hem ozet uzerinde arar. `useDebouncedValue` (300ms) ile her tus basilisinda filtreleme tetiklenmez; debounce sirasinda skeleton gosterilir.

### Sidebar Senkronizasyonu

Accordion state yonetimi `useExpandedCategories` hook'unda `useReducer` ile yapilir. Auto-expand (arama/navigasyon kaynakli) ve user-toggle (kullanici tiklama kaynakli) state'leri ayri tutulur. Arama yapilirken eslesen kategoriler otomatik acilir. Arama temizlendiginde yalnizca aktif makalenin kategorisi acik kalir. Kullanicinin manuel toggle'lari korunur.

### Responsive Tasarim

Uc breakpoint: mobil (< 768px), tablet (768-1024px), desktop (> 1024px). Mobil ve desktop layout'lar ayri bilesenlerdir (`MobileLayout` / `DesktopLayout`) — CSS visibility ile gizleme yerine mimari ayrim saglanmistir. Mobilde Figma'daki tasarim birebir uygulanmistir: `#121212` arka plan uzerinde `#1E1E1F` panel, alttan acilan bottom sheet kategori modali, scroll-reveal header. Desktop'ta merkezi panel (1494px) ile Figma tasarimina sadik kalinmistir.

### Code Splitting

`MobileCategoryDrawer` `next/dynamic` ile dinamik olarak import edilir (`ssr: false`). Bu bilesen yalnizca mobilde ve drawer acildiginda kullanildigi icin desktop kullanicilari bu kodu hicbir zaman indirmez. Ilk sayfa yuklemesinde bundle boyutu azaltilmistir.

### Next.js App Router Conventions

- **`error.tsx`**: Route seviyesinde hata yakalama. Beklenmeyen hatalar kullanici dostu bir mesaj ve "Tekrar Dene" butonu ile karsilanir. Navigasyonda otomatik reset saglar.
- **`loading.tsx`**: Route seviyesinde skeleton shell. Sayfa gecislerinde ve code-split chunk yuklemelerinde aninda gorsel geri bildirim saglar.
- **`generateMetadata` kullanilmamasinin sebebi**: Hash-based routing (`#slug`) kullanildigindan, hash degeri sunucuya iletilmez — `generateMetadata` aktif makaleyi okuyamaz. Bu kisit nedeniyle dinamik sayfa basligi `document.title` ile `useEffect` icinde ayarlanir. Statik metadata (`title`, `description`, OpenGraph) `layout.tsx`'te tanimlidir.

### Skeleton Loading

Arama sirasinda debounce beklerken kart ve sidebar skeleton'lari gosterilir. Skeleton boyutlari gercek bilesenlerin boyutlariyla eslesmektedir. Route seviyesinde `loading.tsx` ile sayfa yukleme sirasinda da skeleton gosterilir.

### Empty Search State

Arama sonucu bosken kullanici cikmazda birakilmaz. En cok goruntulenen 3 makale onerisi sunulur.

### Feedback

"Bu Icerigi Faydali Buldunuz mu?" alani local state ile calisir. Her makale icin bagimsiz state tutulur, ayni butona tekrar tiklamak secimi geri alir. Persistence (localStorage) case scope'u disinda birakilmistir.

## Proje Yapisi

```
app/
  layout.tsx                            # Root layout, font, metadata, viewport
  page.tsx                              # / → /yardim-merkezi redirect
  globals.css                           # Tailwind v4 tema token'lari + global stiller
  not-found.tsx                         # 404 sayfasi
  yardim-merkezi/
    page.tsx                            # Server component, JSON import
    error.tsx                           # App Router hata boundary'si
    loading.tsx                         # Route-level skeleton shell

components/
  help-center/
    HelpCenter.tsx                      # Orchestrator: state yonetimi, layout delegasyonu

    layouts/
      DesktopLayout.tsx                 # Desktop shell: Header + Sidebar + content slot
      MobileLayout.tsx                  # Mobile shell: scroll-reveal header + content slot
      MobileHeader.tsx                  # Sticky arama + kategori butonu

    views/
      ContentRouter.tsx                 # AnimatePresence ile view gecisi
      HomeView.tsx                      # Hero + CTA + makale grid
      ArticleDetailView.tsx             # Makale icerik + feedback

    features/
      SearchInput.tsx                   # Paylasilmis arama input'u (mobil + desktop)
      Sidebar.tsx                       # Search + accordion kategori listesi
      SidebarCategory.tsx               # Tek kategori accordion
      FeedbackBox.tsx                   # Evet/Hayir geri bildirim
      MobileCategoryDrawer.tsx          # Bottom sheet kategori modali (dynamic import)

    ui/
      Header.tsx                        # Paylasilmis header (className ile mobile/desktop)
      ArticleCard.tsx                   # Makale karti
      ContentBlock.tsx                  # Icerik blogu renderer (heading/paragraph/image)
      StatPill.tsx                      # Goruntuleme/begeni pill'leri
      BackButton.tsx                    # Geri don butonu
      LiveSupportButton.tsx             # Canli destek butonu (gorsel)
      EmptySearchState.tsx              # Sonuc yok + populer oneriler
      Skeleton.tsx                      # Loading skeleton bilesenleri

  icons/index.tsx                       # SVG UI ikonlar + PNG kategori gorselleri

lib/
  hooks/
    useHashRoute.ts                     # useSyncExternalStore ile hash yonetimi
    useArticleSearch.ts                 # Turkce normalizasyonlu arama
    useDebouncedValue.ts                # Generic debounce hook
    useExpandedCategories.ts            # Accordion state yonetimi (useReducer)
    useScrollReveal.ts                  # Mobil scroll-reveal header
  types.ts                              # TypeScript tip tanimlari

data/
  helpCenter.json                       # 4 kategori, 10 makale
```

## Trade-offs

- Hash-based routing nedeniyle `generateMetadata` kullanilamaz — `#hash` sunucuya iletilmez. Dinamik sayfa basligi `document.title` ile client-side ayarlanir. Statik metadata (OG, Twitter) `layout.tsx`'te tanimlidir.
- Runtime validation (zod vb.) eklenmedi — veri kaynagi statik JSON dosyasi oldugu icin `as` cast yeterli goruldu.
- Figma'da Gilroy fontu kullanilmis — lisansli oldugu icin en yakin acik alternatif olan Plus Jakarta Sans tercih edildi.
- Feedback oylamasinda localStorage persistence eklenmedi — case scope'unda bilinçli olarak birakildi.

## Notlar

- Figma'daki raster assetler (kategori ikonlari, hero, destek ikonu) PNG olarak export edilip `next/image` ile optimize edilmistir. UI ikonlar (search, chevron, like, dislike, eye) Figma'daki stroke degerleriyle birebir SVG olarak cizilmistir.
- Sayfa statik olarak prerender edilmektedir (SSG). Client JS yalnizca etkilesimli bilesenler icin yuklenir.
- Erisebilirlik: `aria-expanded`, `aria-pressed`, `aria-label`, `focus-visible` ring, semantic HTML kullanilmistir.
- Tum tasarim token'lari (`globals.css` icinde `@theme inline`) Figma'daki renk paletinin birebir karsiliklaridir.
- `MobileCategoryDrawer` `next/dynamic` ile lazy-load edilir; desktop kullanicilari bu kodu indirmez.
