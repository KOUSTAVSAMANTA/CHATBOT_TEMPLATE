from  Bot.BOT import Bot
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import FastAPI,File
# from Bot.ChatGpt.Main import ChatGpt
import requests
fl=["1"]
url = "http://localhost:5005/webhooks/rest/webhook"

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data={}
class Course(BaseModel):
    msg: dict

class Course1(BaseModel):
    msg: str


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/CD")
async def root():
    msg = ""
    options = []
    return {'msg':msg,'options':options,'option':[]}

@app.post("/file_name/")
async def create_file(course: Course1):
    data["NAME"] = course.msg

@app.post("/file/")
async def create_file(file: bytes = File(...)):
    print(data["NAME"])
    with open(f'./DATAXL/{data["NAME"]}','wb') as buffer:
        buffer.write(file)

    return {"msg":f'{data["NAME"]}'}

@app.post("/chatbot")
def create_course(course: Course):
    i = course.msg
    # print(i)
    myobj = {
    "sender":"user1",
    "message":i["msg"]}
    x = requests.post(url, json=myobj)
    print(x.text)
    # print(eval(x.text)[0]["buttons"])

    # if len(x.text)>2:


    vid=""
    try:
        but = eval(x.text)[0]["buttons"]
        options = [{'label':a["title"],"value":a["title"]} for a in but]
        # print(options)

    except Exception as e:
        try:
            _v = eval(x.text)[-1]['attachment']['payload']['elements']
            but = [z["buttons"][0] for z in _v]
            options = [{'label': a["title"], "value": a["title"]} for a in but]
            vid = eval(x.text)[-1]['attachment']['payload']['src']
            # print(len(_v))

        except Exception as e:
            try:
                but = eval(x.text)[-1]["buttons"]
                options = [{'label': a["title"], "value": a["title"]} for a in but]
            except Exception as e:
                options=[]

    print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    print(eval(x.text))
    # try:
    _vid = ""
    _k =eval(x.text)
    for i in range(len(_k)):
        # print( eval(x.text)[i]['attachment']['payload']['src'])
        try:
            _vid = eval(x.text)[i]['attachment']['payload']['src']
        except Exception as e:
            pass
        print(_vid)
    vid = _vid
    # except Exception as e:
    #     _vid = ""
    #     vid = _vid

    if len(eval(x.text))>1:
        _vl=eval(x.text)
        try:
            txt = [t["text"] for t in _vl]
            data = {
                'msg': txt,
                'options': options,
                'hist': [],
                'opt': [[]],
                'vid':vid
            }
        except Exception as e:
            data = {
                'msg': eval(x.text)[0]["text"],
                'options': options,
                'hist': [],
                'opt': [[]],
                'vid':vid
            }
    else:
        data = {
            'msg': eval(x.text)[0]["text"],
            'options': options,
            'hist': [],
            'opt': [[]],
            'vid':vid
        }
    print(data)
    return data


import uvicorn
uvicorn.run(app)


##what is your name?

#koustav

##you can upload the letter
##did you uploaded it?
##options = [yes,no]

#yes

##you can upload the policy letter
##did you uploaded it?
##options = [yes,no]

#yes

##thank you



