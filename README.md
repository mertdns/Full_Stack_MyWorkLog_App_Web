# My Work Log

My Work Log, çalışma günlerini ve günlük iş kayıtlarını takip etmeyi amaçlayan bir projedir. Proje şu anda React tabanlı bir kullanıcı arayüzü içeriyor; ilerleyen aşamada bu arayüze bağlanacak ayrı bir API/backend projesi eklenmesi planlanıyor.

## Proje bileşenleri

| Bileşen | Dizin | Durum |
| --- | --- | --- |
| Web arayüzü | [`myWorkLog_react/`](./myWorkLog_react/) | Geliştirme aşamasında |
| API / backend | Planlanıyor | Henüz projeye eklenmedi |

Arayüzün ayrıntılı açıklaması ve teknik kurulum notları için [`myWorkLog_react/README.md`](./myWorkLog_react/README.md) dosyasına bakabilirsiniz.

## Mevcut arayüz

Arayüz, çalışma günlüğü ekranı için React ve TypeScript ile geliştirilmiştir. Ekranda ay ve yıl seçimi, çalışma kayıtları tablosu ve yeni kayıt/silme kontrolleri bulunur. Kayıt yönetimi şu an tamamlanmış, kalıcı veriye bağlı bir özellik değildir; gerçek kayıt işlemleri sonraki geliştirme aşamalarında eklenecektir.

### Kullanılan teknolojiler

- React 19 ve TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Oxlint

## Geliştirme ortamını çalıştırma

Önce arayüz dizinine geçip bağımlılıkları yükleyin:

```bash
cd myWorkLog_react
npm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

## Komutlar

Komutları `myWorkLog_react/` dizininde çalıştırın:

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Vite geliştirme sunucusunu başlatır |
| `npm run build` | TypeScript kontrolünü çalıştırır ve üretim derlemesi oluşturur |
| `npm run preview` | Üretim derlemesini yerel olarak önizler |
| `npm run lint` | Oxlint ile kod kontrolü yapar |

## Yol haritası

- Çalışma kayıtları için oluşturma, düzenleme ve silme akışlarını tamamlamak
- Ayrı bir API/backend projesi eklemek
- Arayüzü API'ye bağlayarak kayıtların kalıcı olarak saklanmasını sağlamak

Backend'in teknolojisi ve API sözleşmesi henüz belirlenmedi; ilgili proje eklendiğinde kurulum ve kullanım adımları bu README'de güncellenecektir.
