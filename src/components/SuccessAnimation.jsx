import { useEffect, useState } from "react";
import { Check, Rocket, Sparkles, X } from "lucide-react";

export default function SuccessAnimation({ open, onClose, type = "image" }) {
  const [launch, setLaunch] = useState(false);

  useEffect(() => {
    if (!open) {
      setLaunch(false);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setLaunch(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="success-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="success-stars" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <span
            key={index}
            className="success-star"
            style={{
              left: `${(index * 37 + 13) % 100}%`,
              top: `${(index * 29 + 7) % 100}%`,
              animationDelay: `${(index % 7) * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="success-modal">
        <button
          type="button"
          onClick={onClose}
          className="success-close"
          aria-label="Kapat"
        >
          <X size={22} />
        </button>

        <div className="success-rocket-area">
          <div className="success-orbit" />
          <div className="success-orbit success-orbit-second" />

          <div
            className={`success-rocket ${
              launch ? "success-rocket-launch" : ""
            }`}
          >
            <Rocket size={76} strokeWidth={1.5} />
            <div className="success-flame" />
          </div>
        </div>

        <div className="success-check">
          <Check size={34} strokeWidth={3} />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-sky-400">
          <Sparkles size={17} />
          <span className="text-xs font-bold tracking-[0.2em]">
            DENEYAP TÜRKİYE
          </span>
          <Sparkles size={17} />
        </div>

        <h2 id="success-title" className="success-title">
          Görev Başarıyla
          <span> Tamamlandı!</span>
        </h2>

        <p className="mt-4 text-center leading-7 text-slate-300">
          {type === "image"
            ? "Tasarım dosyan başarıyla teslim edildi."
            : "Metnin başarıyla kaydedildi."}
          <br />
          Geleceği tasarlamaya devam et!
        </p>

        <div className="success-confirmation">
          <Check size={17} />
          TESLİM ONAYLANDI
        </div>

        <button type="button" onClick={onClose} className="success-return">
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
