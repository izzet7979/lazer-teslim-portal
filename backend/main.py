
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from datetime import datetime
from PIL import Image, UnidentifiedImageError
from uuid import uuid4
import io
import re

from pydantic import BaseModel, Field
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
from threading import Lock

app = FastAPI(
    title="Lazer Markalama Teslim API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://izzet7979.github.io",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

MAX_FILE_SIZE = 10 * 1024 * 1024


@app.get("/")
def home():
    return {
        "message": "Lazer Markalama API çalışıyor."
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }


@app.post("/api/upload")
async def upload_design(
    student_name: str = Form(...),
    file: UploadFile = File(...)
):
    student_name = " ".join(student_name.strip().split())

    if len(student_name) < 3 or len(student_name) > 100:
        raise HTTPException(
            status_code=400,
            detail="Geçerli bir ad soyad giriniz."
        )

    if not file.filename or not file.filename.lower().endswith(".png"):
        raise HTTPException(
            status_code=400,
            detail="Yalnızca PNG dosyaları kabul edilir."
        )

    if file.content_type != "image/png":
        raise HTTPException(
            status_code=400,
            detail="Dosya türü PNG olmalıdır."
        )

    content = await file.read(MAX_FILE_SIZE + 1)

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Dosya boyutu 10 MB'ı geçemez."
        )

    try:
        with Image.open(io.BytesIO(content)) as image:
            if image.format != "PNG":
                raise ValueError("PNG formatı değil.")

            if image.width > 10000 or image.height > 10000:
                raise ValueError("Görsel boyutları çok büyük.")

            image.verify()

    except (UnidentifiedImageError, ValueError, OSError):
        raise HTTPException(
            status_code=400,
            detail="Geçersiz veya bozuk PNG dosyası."
        )

    safe_name = re.sub(
        r"[^a-zA-Z0-9_-]",
        "_",
        student_name
    ).strip("_")[:60] or "ogrenci"

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = uuid4().hex[:8]

    filename = f"{safe_name}_{timestamp}_{unique_id}.png"
    file_path = UPLOAD_DIR / filename

    file_path.write_bytes(content)

    return {
        "success": True,
        "message": "Tasarım başarıyla teslim edildi.",
        "student_name": student_name,
        "filename": filename
    }



# Metin teslimleri Excel dosyası
EXCEL_PATH = Path(__file__).resolve().parent / "metin_teslimleri.xlsx"

# Aynı anda gelen teslimleri sıraya al
excel_lock = Lock()


class TextSubmission(BaseModel):
    student_name: str = Field(min_length=3, max_length=100)
    text: str = Field(min_length=1, max_length=140)


@app.post("/api/text-submit")
def submit_text(data: TextSubmission):
    student_name = " ".join(data.student_name.split())
    message = data.text.strip()

    if len(student_name) < 3:
        raise HTTPException(
            status_code=400,
            detail="Geçerli bir ad soyad giriniz."
        )

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Metin boş olamaz."
        )

    # Excel formül enjeksiyonuna karşı koruma
    def safe_excel_value(value):
        if value.startswith(("=", "+", "-", "@")):
            return "'" + value
        return value

    with excel_lock:
        if EXCEL_PATH.exists():
            workbook = load_workbook(EXCEL_PATH)
            sheet = workbook.active
        else:
            workbook = Workbook()
            sheet = workbook.active
            sheet.title = "Metin Teslimleri"

            sheet.append([
                "Ad Soyad",
                "Metin",
                "Teslim Tarihi"
            ])

            sheet.column_dimensions["A"].width = 30
            sheet.column_dimensions["B"].width = 65
            sheet.column_dimensions["C"].width = 24

            for cell in sheet[1]:
                cell.font = Font(
                    bold=True,
                    color="FFFFFF"
                )
                cell.fill = PatternFill(
                    "solid",
                    fgColor="2563EB"
                )
                cell.alignment = Alignment(
                    horizontal="center"
                )

        sheet.append([
            safe_excel_value(student_name),
            safe_excel_value(message),
            datetime.now().strftime("%d.%m.%Y %H:%M:%S")
        ])

        try:
            workbook.save(EXCEL_PATH)
        except PermissionError:
            raise HTTPException(
                status_code=409,
                detail="Excel dosyası kullanımda. Lütfen dosyayı kapatıp tekrar deneyin."
            )
        finally:
            workbook.close()

    return {
        "success": True,
        "message": "Metniniz başarıyla Excel dosyasına kaydedildi."
    }

