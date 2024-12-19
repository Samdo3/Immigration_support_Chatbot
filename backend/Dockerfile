# Python 베이스 이미지 사용 (예: 파이썬 3.10 slim 이미지)
FROM python:3.12-slim

# 작업 디렉토리 생성
WORKDIR /app

# 필요 라이브러리 설치를 위해 requirements.txt 복사
# (미리 프로젝트 루트에 requirements.txt가 있다고 가정)
COPY requirements.txt .

# requirements.txt에 명시된 라이브러리 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 소스 코드 복사
COPY src/ ./src

# Uvicorn을 통해 FastAPI 서버 실행
# ENV 변수를 통해 UVICORN 포트 설정(기본 8000)
ENV PORT=8000

EXPOSE 8000

CMD ["uvicorn", "src.get_response:app", "--host", "0.0.0.0", "--port", "8000"]
