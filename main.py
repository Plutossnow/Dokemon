from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from data.user import User
from fastapi.middleware.cors import CORSMiddleware
from data.model import UserModel
from routers import role

user = User()

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(role.router, prefix="/role")


@app.get("/")
async def root():
    return {"message": "Dokemon 服务端运行中"}


@app.post("/token")
def token(req: UserModel):
    return user.token(req.email, req.password)
