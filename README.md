# My Work Log

My Work Log, günlük çalışma kayıtlarını takip etmek için geliştirilmiş tam yığın bir uygulamadır. React tabanlı web arayüzü, NestJS API üzerinden MongoDB'de saklanan kayıtları listeler, yeni kayıt oluşturur ve kayıt siler.

## Proje bileşenleri

| Bileşen | Dizin | Teknolojiler |
| --- | --- | --- |
| Web arayüzü | [`myWorkLog_react/`](./myWorkLog_react/) | React, TypeScript, Vite, Redux Toolkit, Tailwind CSS |
| API / backend | [`my-work-log_nest/`](./my-work-log_nest/) | NestJS, TypeScript, Mongoose |
| Veritabanı | MongoDB | Çalışma kayıtlarının kalıcı saklanması |

## Özellikler

- Çalışma kayıtlarını listeleme ve aya/yıla göre filtreleme
- Bugünün tarihiyle açıklamalı veya açıklamasız kayıt oluşturma
- Onay penceresiyle kayıt silme
- Verileri MongoDB'de saklama
- Responsive web arayüzü

## Gereksinimler

- Node.js ve npm
- Çalışan bir MongoDB sunucusu veya MongoDB Atlas bağlantısı

## Kurulum ve çalıştırma

### 1. API / backend

Bir terminalde backend dizinine geçip bağımlılıkları yükleyin:

```bash
cd my-work-log_nest
npm install
```

`my-work-log_nest/.env` dosyasını oluşturup MongoDB bağlantı adresini tanımlayın:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/my-work-log
```

MongoDB Atlas kullanıyorsanız `MONGODB_URI` değerini Atlas bağlantı adresinizle değiştirin. Ardından API'yi geliştirme modunda başlatın:

```bash
npm run start:dev
```

API varsayılan olarak `http://localhost:3000` adresinde çalışır. Farklı bir `PORT` tanımlarsanız frontend'in API adresini de buna göre ayarlayın.

### 2. Web arayüzü

İkinci bir terminalde frontend dizinine geçip bağımlılıkları yükleyin:

```bash
cd myWorkLog_react
npm install
npm run dev
```

Vite'ın terminalde gösterdiği yerel adresi tarayıcıda açın. Arayüz, API adresi belirtilmediğinde `http://localhost:3000` adresini kullanır. API farklı bir adreste çalışıyorsa `myWorkLog_react/.env` dosyasına aşağıdaki değişkeni ekleyin:

```env
VITE_API_URL=http://localhost:3000
```

## API uç noktaları

| Metot | Uç nokta | Açıklama |
| --- | --- | --- |
| `GET` | `/work` | Tüm çalışma kayıtlarını getirir |
| `POST` | `/work` | Yeni çalışma kaydı oluşturur |
| `DELETE` | `/work/:id` | Belirtilen kaydı siler |

Yeni kayıt isteği `date` alanını zorunlu, `explanation` alanını isteğe bağlı olarak alır:

```json
{
  "date": "19-10-2026-1",
  "explanation": "Proje üzerinde çalışma"
}
```

## Kullanılabilir komutlar

Komutları ilgili uygulama dizininde çalıştırın.

### Frontend (`myWorkLog_react/`)

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Vite geliştirme sunucusunu başlatır |
| `npm run build` | TypeScript kontrolü ve üretim derlemesi yapar |
| `npm run preview` | Üretim derlemesini yerel olarak önizler |
| `npm run lint` | Oxlint ile kod kontrolü yapar |

### Backend (`my-work-log_nest/`)

| Komut | Açıklama |
| --- | --- |
| `npm run start:dev` | NestJS API'yi izleme modunda başlatır |
| `npm run build` | Backend'i derler |
| `npm run start:prod` | Derlenmiş backend'i başlatır |
| `npm run lint` | ESLint ile kod kontrolü yapar |
| `npm run test` | Birim testlerini çalıştırır |
| `npm run test:e2e` | Uçtan uca testleri çalıştırır |
