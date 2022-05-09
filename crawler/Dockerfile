FROM python:3.9

WORKDIR /crawler

COPY ./requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn","main:app","--reload","--port=8081","--host=crawler"]