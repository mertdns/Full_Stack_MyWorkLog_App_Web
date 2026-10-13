# My Work Log

Bu proje, çalışanların günlük iş kayıtlarını takip edebilmesi için hazırlanmış bir React + TypeScript uygulamasıdır. Kullanıcılar ay ve yıl bazlı filtreleme ile çalışma günlerini görüntüleyebilir; ileride yeni kayıt ekleme, silme ve düzenleme işlemleri için uygun bir yapı sunar.

## Proje Özeti

- React 19 ve Vite ile oluşturulmuştur.
- TypeScript kullanılarak tip güvenliği sağlanmıştır.
- Tailwind CSS ile arayüz tasarımı gerçekleştirilmiştir.
- Redux Toolkit tabanlı bir state yapısı hazırdır.
- Çalışma günlüğü ekranı, ay ve yıl seçimi ile ilgili verilerin listelenmesine odaklanır.

## Özellikler

- Ay seçimi ile çalışan günlük görünümü
- Yıl geçişi (önceki/sonraki yıl butonları)
- Çalışma kaydı tablosu
- Yeni kayıt ekleme butonu
- Kayıt silme butonu
- Mobil uyumlu responsive tasarım

## Teknoloji Yığını

- React
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- React Icons
- Oxlint

## Proje Yapısı

```text
myWorkLog_react/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Layout.tsx
│   ├── pages/
│   │   └── WorkList.tsx
│   ├── store/
│   │   └── store.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Ana Sayfa / Ekranlar

- `src/pages/WorkList.tsx`: Ana çalışma günlüğü ekranı
- `src/App.tsx`: Route yapısı ve uygulama başlangıcı
- `src/components/layout/Layout.tsx`: Sayfa düzeni ve hedef alan
- `src/components/layout/Header.tsx`: Üst başlık
- `src/components/layout/Footer.tsx`: Alt alan

## Kurulum

Projeyi çalıştırmadan önce bağımlılıkları yükleyin:

```bash
npm install
```

## Çalıştırma

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Uygulama varsayılan olarak Vite geliştirme sunucusu üzerinden çalışır.

## Build

Production build oluşturmak için:

```bash
npm run build
```

## Scripts

- `npm run dev` → Geliştirme sunucusunu başlatır
- `npm run build` → Üretim derlemesini hazırlar
- `npm run preview` → Build sonrası önizleme sunucusunu açar
- `npm run lint` → Kod kalite kontrolünü çalıştırır

## Durum

Bu proje şu an geliştirme aşamasında olup, temel arayüz yapısı mevcuttur. Özellikle günlük çalışma kaydı listesi ve seçim bileşenleri yerleşmiştir; ileride veri modeli, CRUD işlemleri ve kalıcı depolama eklenmesi planlanmaktadır.

## Not

Mevcut proje yapısında, TypeScript derleme sırasında bazı bileşenlerde gereksiz `React` importları nedeniyle `tsc` uyarıları ortaya çıkabilir. Bu durum proje hâlâ geliştirme aşamasında olduğunu gösterir ve sonraki aşamada temizlenmesi beklenir.
