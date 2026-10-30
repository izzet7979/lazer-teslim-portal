import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileImage,
  FileText,
  GraduationCap,
  ImagePlus,
  Layers3,
  LoaderCircle,
  Plane,
  RadioTower,
  Rocket,
  PartyPopper,
  Send,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TEXT_LENGTH = 140;

function SuccessAnimation({ open, type, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="deneyap-success-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deneyap-success-title"
    >
      <style>{`
        @keyframes deneyap-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes deneyap-modal-in { from { opacity: 0; transform: translateY(30px) scale(.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes deneyap-rocket-fly { 0% { opacity: 0; transform: translate(-45px, 55px) rotate(-45deg) scale(.65); } 30% { opacity: 1; } 75% { transform: translate(10px, -15px) rotate(-45deg) scale(1.1); } 100% { opacity: 1; transform: translate(10px, -15px) rotate(-45deg) scale(1); } }
        @keyframes deneyap-orbit { 0%,100% { transform: scale(.9); opacity: .2; } 50% { transform: scale(1.12); opacity: .6; } }
        @keyframes deneyap-twinkle { from { opacity: .2; transform: scale(.6); } to { opacity: 1; transform: scale(1.5); } }
        @keyframes deneyap-check-pop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .deneyap-success-overlay { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(2,8,23,.91); backdrop-filter: blur(14px); animation: deneyap-overlay-in .3s ease-out; }
        .deneyap-success-modal { position: relative; width: 100%; max-width: 500px; padding: 34px 40px 38px; overflow: hidden; text-align: center; border: 1px solid rgba(56,189,248,.35); border-radius: 28px; background: linear-gradient(145deg,#163658,#071426 82%); box-shadow: 0 30px 100px rgba(0,0,0,.5); animation: deneyap-modal-in .5s ease-out both; }
        .deneyap-success-orbit { position: absolute; width: 150px; height: 150px; border: 1px solid rgba(56,189,248,.3); border-radius: 50%; animation: deneyap-orbit 2s ease-in-out infinite; }
        .deneyap-success-orbit.outer { width: 205px; height: 205px; animation-delay: .35s; }
        .deneyap-success-rocket { position: relative; z-index: 2; color: #7dd3fc; animation: deneyap-rocket-fly 1.5s ease-out both; }
        .deneyap-success-star { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #7dd3fc; box-shadow: 0 0 10px #38bdf8; animation: deneyap-twinkle 1.2s ease-in-out infinite alternate; }
        .deneyap-success-check { animation: deneyap-check-pop .45s ease-out .8s both; }
        @media (prefers-reduced-motion: reduce) { .deneyap-success-overlay, .deneyap-success-modal, .deneyap-success-orbit, .deneyap-success-rocket, .deneyap-success-star, .deneyap-success-check { animation: none !important; } }
      `}</style>
      {Array.from({ length: 24 }, (_, i) => (
        <span
          key={i}
          className="deneyap-success-star"
          aria-hidden="true"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 29 + 7) % 100}%`,
            animationDelay: `${(i % 6) * 0.18}s`,
          }}
        />
      ))}
      <div className="deneyap-success-modal">
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-5 top-5 cursor-pointer text-slate-400 hover:text-white"
        >
          <X size={22} />
        </button>
        <div className="relative mx-auto flex h-48 items-center justify-center">
          <div className="deneyap-success-orbit" />
          <div className="deneyap-success-orbit outer" />
          <div className="deneyap-success-rocket">
            <Rocket size={82} strokeWidth={1.6} />
          </div>
        </div>
        <div className="deneyap-success-check mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <CheckCircle2 size={38} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold tracking-[.22em] text-sky-400">
          <PartyPopper size={17} /> DENEYAP TÜRKİYE
        </div>
        <h2
          id="deneyap-success-title"
          className="mt-4 text-3xl font-black leading-tight text-white"
        >
          Görev Başarıyla{" "}
          <span className="block text-sky-400">Tamamlandı!</span>
        </h2>
        <p className="mt-4 leading-7 text-slate-300">
          {type === "image"
            ? "PNG tasarımın başarıyla teslim edildi."
            : "Metnin başarıyla kaydedildi."}
          <span className="block">Geleceği tasarlamaya devam et!</span>
        </p>
        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-2 text-xs font-bold tracking-wider text-emerald-300">
          <CheckCircle2 size={17} /> TESLİM ONAYLANDI
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full cursor-pointer rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-4 font-bold text-white transition hover:brightness-110"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [studentName, setStudentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [completedType, setCompletedType] = useState("image");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const navigate = (destination) => {
    if (loading) return;

    setPage(destination);
    setStudentName("");
    setSelectedFile(null);
    setMessage("");
    setError("");
    setSuccess("");
    setIsDragging(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileSelect = (file) => {
    setError("");
    setSuccess("");

    if (!file) return;

    if (
      file.type !== "image/png" ||
      !file.name.toLowerCase().endsWith(".png")
    ) {
      setSelectedFile(null);
      setError("Yalnızca PNG formatında dosya yükleyebilirsiniz.");
      return;
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setError("Dosya boş olmamalı ve 10 MB'ı geçmemelidir.");
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");

    const name = studentName.trim();

    if (name.length < 3) {
      setError("Lütfen geçerli bir ad soyad girin.");
      return;
    }

    if (page === "image" && !selectedFile) {
      setError("Lütfen PNG dosyanızı seçin.");
      return;
    }

    if (
      page === "text" &&
      (!message.trim() || message.length > MAX_TEXT_LENGTH)
    ) {
      setError("Metin 1 ile 140 karakter arasında olmalıdır.");
      return;
    }

    try {
      setLoading(true);

      let response;

      if (page === "image") {
        const formData = new FormData();
        formData.append("student_name", name);
        formData.append("file", selectedFile);

        response = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch(`${API_URL}/api/text-submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_name: name,
            text: message.trim(),
          }),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof result.detail === "string"
            ? result.detail
            : "Teslim sırasında hata oluştu.",
        );
      }

      setSuccess(result.message || "Teslim başarıyla tamamlandı.");
      setCompletedType(page);
      setShowSuccessAnimation(true);
      setStudentName("");
      setSelectedFile(null);
      setMessage("");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Sunucuya bağlanılamadı. Lütfen tekrar deneyin."
          : err.message || "Beklenmeyen bir hata oluştu.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deneyap-app min-h-screen">
      {/* Üst Menü */}
      <header className="site-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex cursor-pointer items-center gap-4 text-left"
          >
            <div className="brand-mark">
              <Rocket size={27} />
            </div>

            <div>
              <div className="text-xl font-black tracking-tight text-white">
                DENEYAP <span className="text-sky-400">TÜRKİYE</span>
              </div>
              <div className="text-xs tracking-[0.22em] text-slate-400">
                ÖĞRENCİ TESLİM PORTALI
              </div>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-sky-300 md:flex">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              MİLLİ TEKNOLOJİ HAMLESİ
            </span>
          </div>
        </div>
      </header>

      {page === "home" ? (
        <main>
          {/* Havacılık Temalı Karşılama */}
          <section className="hero-section relative overflow-hidden">
            <div className="hero-grid" />
            <div className="hero-glow hero-glow-blue" />
            <div className="hero-glow hero-glow-red" />

            <Plane className="aircraft aircraft-left" strokeWidth={0.65} />
            <Plane className="aircraft aircraft-right" strokeWidth={0.7} />
            <Rocket className="aircraft aircraft-rocket" strokeWidth={0.8} />

            <div className="radar-ring radar-ring-one" />
            <div className="radar-ring radar-ring-two" />
            <div className="radar-ring radar-ring-three" />

            <div className="relative z-10 mx-auto max-w-7xl px-8 pb-16 pt-24 text-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-5 py-2 text-xs font-bold tracking-[0.18em] text-sky-300">
                <Sparkles size={15} />
                GELECEĞİN TEKNOLOJİ YILDIZLARI
              </div>

              <h1 className="hero-title mx-auto max-w-4xl text-6xl font-black leading-tight text-white">
                Hayal Et. Tasarla.
                <span className="block text-sky-400">Geleceği İnşa Et.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                DENEYAP Türkiye ile teknoloji üreten neslin bir parçası ol.
                Hazırladığın çalışmayı teslim etmek için aşağıdaki seçeneklerden
                birini seç.
              </p>

              <div className="mx-auto mt-10 flex w-fit items-center gap-3 text-sm text-slate-400">
                <span className="h-px w-12 bg-red-500" />
                TEKNOLOJİ ÜRETEN BİR TÜRKİYE İÇİN
                <span className="h-px w-12 bg-red-500" />
              </div>

              {/* Teslim Seçenekleri */}
              <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-7 text-left">
                <button
                  type="button"
                  onClick={() => navigate("image")}
                  className="submission-card group text-left"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div className="card-icon card-icon-red">
                      <ImagePlus size={34} />
                    </div>
                    <span className="card-number">01 / GÖREV</span>
                  </div>

                  <h2 className="text-3xl font-extrabold text-white">
                    Görsel Teslimi
                  </h2>

                  <p className="mt-4 min-h-20 leading-7 text-slate-400">
                    Fusion 360 veya farklı tasarım araçlarıyla hazırladığın
                    çalışmanı PNG olarak teslim et.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="feature-pill">
                      <FileImage size={15} /> PNG
                    </span>
                    <span className="feature-pill">
                      <Layers3 size={15} /> Maks. 10 MB
                    </span>
                    <span className="feature-pill">
                      <ShieldCheck size={15} /> Önizleme
                    </span>
                  </div>

                  <div className="card-action card-action-red mt-9">
                    Görsel Yükle
                    <ArrowRight
                      size={20}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("text")}
                  className="submission-card group text-left"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div className="card-icon card-icon-blue">
                      <FileText size={34} />
                    </div>
                    <span className="card-number">02 / GÖREV</span>
                  </div>

                  <h2 className="text-3xl font-extrabold text-white">
                    Metin Teslimi
                  </h2>

                  <p className="mt-4 min-h-20 leading-7 text-slate-400">
                    Fikrini, projenin açıklamasını veya çalışmanla ilgili
                    düşüncelerini 140 karakterle paylaş.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="feature-pill">
                      <FileText size={15} /> 140 Karakter
                    </span>
                    <span className="feature-pill">
                      <GraduationCap size={15} /> Ad Soyad
                    </span>
                    <span className="feature-pill">
                      <CheckCircle2 size={15} /> Kayıt
                    </span>
                  </div>

                  <div className="card-action card-action-blue mt-9">
                    Metin Yaz
                    <ArrowRight
                      size={20}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Alt Teknoloji Şeridi */}
          <section className="mx-auto max-w-6xl px-8 pb-16">
            <div className="technology-strip">
              <div className="technology-item">
                <Cpu size={24} />
                <span>TEKNOLOJİ GELİŞTİREN NESİL</span>
              </div>
              <div className="technology-item">
                <Plane size={24} />
                <span>HAVACILIK VE TASARIM</span>
              </div>
              <div className="technology-item">
                <RadioTower size={24} />
                <span>MİLLİ TEKNOLOJİ HAMLESİ</span>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="relative mx-auto max-w-3xl px-8 py-14">
          <div className="form-background-glow" />

          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("home")}
            className="relative mb-7 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white disabled:opacity-50"
          >
            <ArrowLeft size={19} />
            Görev Seçimine Dön
          </button>

          <section className="form-panel relative">
            <div className="mb-9 flex items-center gap-5">
              <div
                className={`card-icon ${
                  page === "image" ? "card-icon-red" : "card-icon-blue"
                }`}
              >
                {page === "image" ? (
                  <FileImage size={31} />
                ) : (
                  <FileText size={31} />
                )}
              </div>

              <div>
                <div className="mb-1 text-xs font-bold tracking-[0.2em] text-sky-400">
                  DENEYAP / TESLİM MODÜLÜ
                </div>
                <h2 className="text-3xl font-extrabold text-white">
                  {page === "image" ? "Görsel Teslimi" : "Metin Teslimi"}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Bilgilerini gir ve çalışmanı sisteme gönder.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label htmlFor="studentName" className="form-label">
                  Öğrenci Ad Soyad
                </label>
                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  maxLength={100}
                  disabled={loading}
                  placeholder="Adınızı ve soyadınızı girin"
                  className="form-input"
                />
              </div>

              {page === "image" ? (
                <div>
                  <label className="form-label">PNG Tasarım Dosyası</label>

                  {!selectedFile ? (
                    <label
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (!loading) setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (!loading) {
                          handleFileSelect(e.dataTransfer.files[0]);
                        }
                      }}
                      className={`upload-zone ${
                        isDragging ? "upload-zone-active" : ""
                      }`}
                    >
                      <UploadCloud size={44} className="text-sky-400" />
                      <span className="mt-4 font-semibold text-white">
                        PNG dosyanı seç veya buraya sürükle
                      </span>
                      <span className="mt-2 text-sm text-slate-400">
                        Maksimum dosya boyutu: 10 MB
                      </span>

                      <input
                        type="file"
                        accept=".png,image/png"
                        disabled={loading}
                        className="hidden"
                        onChange={(e) => {
                          handleFileSelect(e.target.files[0]);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-950/60">
                        {preview && (
                          <img
                            src={preview}
                            alt="PNG tasarım önizlemesi"
                            className="max-h-full max-w-full object-contain"
                          />
                        )}
                      </div>

                      <div className="mt-5 flex items-center gap-3">
                        <FileImage className="text-sky-400" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-white">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm text-slate-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => {
                            setSelectedFile(null);
                            setError("");
                            setSuccess("");
                          }}
                          aria-label="Dosyayı kaldır"
                          className="cursor-pointer text-slate-400 hover:text-red-400 disabled:opacity-50"
                        >
                          <X size={22} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label htmlFor="message" className="form-label mb-0">
                      Metnin
                    </label>
                    <span className="font-mono text-sm text-sky-400">
                      {message.length} / {MAX_TEXT_LENGTH}
                    </span>
                  </div>

                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    maxLength={MAX_TEXT_LENGTH}
                    rows={6}
                    disabled={loading}
                    placeholder="Fikrini veya çalışmanın açıklamasını buraya yaz..."
                    className="form-input resize-none"
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    En fazla 140 karakter yazabilirsin.
                  </p>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-300"
                >
                  <AlertCircle size={19} className="shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-300"
                >
                  <CheckCircle2 size={19} className="shrink-0" />
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`submit-button ${
                  page === "image" ? "submit-button-red" : "submit-button-blue"
                }`}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={21} className="animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {page === "image"
                      ? "Tasarımımı Teslim Et"
                      : "Metnimi Teslim Et"}
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </form>
          </section>
        </main>
      )}

      <footer className="site-footer">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <span>DENEYAP TÜRKİYE • Öğrenci Teslim Portalı</span>
          <span>TEKNOLOJİ ÜRETEN BİR TÜRKİYE İÇİN</span>
        </div>
      </footer>

      <SuccessAnimation
        open={showSuccessAnimation}
        type={completedType}
        onClose={() => {
          setShowSuccessAnimation(false);
          navigate("home");
        }}
      />
    </div>
  );
}

export default App;
